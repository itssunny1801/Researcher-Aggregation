from urllib.parse import urlencode
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
import httpx

from app.config import settings
from app.auth_utils import create_jwt_token, get_current_user
from app.schemas import UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])


# ---------------------------------------------------------------------------
# 1) LOGIN — redirect user to ORCID's authorize page
# ---------------------------------------------------------------------------
@router.get("/orcid/login")
async def orcid_login():
    """
    Redirects the user's browser to ORCID's OAuth2 authorization page.
    The user logs in with their existing ORCID account there.
    """
    params = {
        "client_id": settings.ORCID_CLIENT_ID,
        "response_type": "code",
        "scope": "/authenticate openid",
        "redirect_uri": settings.ORCID_REDIRECT_URI,
    }
    authorize_url = f"{settings.orcid_authorize_url}?{urlencode(params)}"
    return RedirectResponse(url=authorize_url)


# ---------------------------------------------------------------------------
# 2) CALLBACK — ORCID redirects here with ?code=...
# ---------------------------------------------------------------------------
@router.get("/orcid/callback")
async def orcid_callback(code: str = None, error: str = None):
    """
    ORCID redirects the user here after they approve/deny.
    We exchange the authorization code for an access token,
    fetch user info, create a JWT, and redirect to the frontend.
    """
    # Handle denial or missing code
    if error or not code:
        error_msg = error or "No authorization code received"
        return RedirectResponse(
            url=f"{settings.FRONTEND_URL}?auth_error={error_msg}"
        )

    # --- Step A: Exchange the code for an access token ---
    async with httpx.AsyncClient() as client:
        token_response = await client.post(
            settings.orcid_token_url,
            data={
                "client_id": settings.ORCID_CLIENT_ID,
                "client_secret": settings.ORCID_CLIENT_SECRET,
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": settings.ORCID_REDIRECT_URI,
            },
            headers={"Accept": "application/json"},
        )

    if token_response.status_code != 200:
        return RedirectResponse(
            url=f"{settings.FRONTEND_URL}?auth_error=token_exchange_failed"
        )

    token_data = token_response.json()

    # ORCID returns the orcid iD and name directly in the token response
    orcid_id = token_data.get("orcid", "")
    name = token_data.get("name", "")

    # --- Step B (optional): Fetch richer profile from /userinfo ---
    access_token = token_data.get("access_token", "")
    given_name = None
    family_name = None

    if access_token:
        async with httpx.AsyncClient() as client:
            userinfo_response = await client.get(
                settings.orcid_userinfo_url,
                headers={
                    "Authorization": f"Bearer {access_token}",
                    "Accept": "application/json",
                },
            )
            if userinfo_response.status_code == 200:
                userinfo = userinfo_response.json()
                given_name = userinfo.get("given_name", None)
                family_name = userinfo.get("family_name", None)
                # Build a better name if available
                if given_name and family_name:
                    name = f"{given_name} {family_name}"

    # --- Step C: Create a JWT and set it as an HTTP-only cookie ---
    jwt_token = create_jwt_token(orcid_id=orcid_id, name=name)

    # Redirect to the frontend /account page
    response = RedirectResponse(
        url=f"{settings.FRONTEND_URL}/account", status_code=302
    )
    response.set_cookie(
        key="access_token",
        value=jwt_token,
        httponly=True,
        secure=False,       # Set True in production with HTTPS
        samesite="lax",
        max_age=settings.JWT_EXPIRY_HOURS * 3600,
        path="/",
    )
    return response


# ---------------------------------------------------------------------------
# 3) ME — return the currently authenticated user's data
# ---------------------------------------------------------------------------
@router.get("/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    """
    Returns the authenticated user's profile data from the JWT.
    Requires a valid access_token cookie.
    """
    return UserResponse(
        orcid_id=current_user.get("sub", ""),
        name=current_user.get("name", ""),
        given_name=current_user.get("given_name"),
        family_name=current_user.get("family_name"),
    )


# ---------------------------------------------------------------------------
# 4) LOGOUT — clear the JWT cookie
# ---------------------------------------------------------------------------
@router.post("/logout")
async def logout():
    """Clears the access_token cookie, effectively logging the user out."""
    response = RedirectResponse(
        url=settings.FRONTEND_URL, status_code=302
    )
    response.delete_cookie(key="access_token", path="/")
    return response
