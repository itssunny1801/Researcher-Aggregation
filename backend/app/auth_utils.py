from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from fastapi import Request, HTTPException, status
from app.config import settings


def create_jwt_token(orcid_id: str, name: str, given_name: str = None, family_name: str = None) -> str:
    """Create a signed JWT containing the user's ORCID iD and name."""
    payload = {
        "sub": orcid_id,
        "name": name,
        "given_name": given_name,
        "family_name": family_name,
        "iat": datetime.now(timezone.utc),
        "exp": datetime.now(timezone.utc)
        + timedelta(hours=settings.JWT_EXPIRY_HOURS),
    }
    return jwt.encode(
        payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM
    )


def verify_jwt_token(token: str) -> dict:
    """Decode and verify a JWT token. Returns the payload dict."""
    try:
        payload = jwt.decode(
            token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM]
        )
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )


def get_current_user(request: Request) -> dict:
    """FastAPI dependency — extracts JWT from Authorization header or cookie."""
    # First try Authorization: Bearer <token> header (used for cross-domain)
    auth_header = request.headers.get("Authorization", "")
    if auth_header.startswith("Bearer "):
        token = auth_header[7:]
        return verify_jwt_token(token)
    
    # Fall back to cookie (for same-domain deployments)
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
    return verify_jwt_token(token)
