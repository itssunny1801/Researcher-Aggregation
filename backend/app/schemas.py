from pydantic import BaseModel
from typing import Optional


class UserResponse(BaseModel):
    """Response model for the /auth/me endpoint."""
    orcid_id: str
    name: str
    given_name: Optional[str] = None
    family_name: Optional[str] = None


class OrcidTokenResponse(BaseModel):
    """Data received from ORCID after exchanging the authorization code."""
    access_token: str
    token_type: str
    refresh_token: Optional[str] = None
    expires_in: int
    scope: str
    name: str
    orcid: str
