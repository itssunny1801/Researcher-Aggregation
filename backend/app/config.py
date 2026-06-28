import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    """Application settings loaded from environment variables."""

    ORCID_CLIENT_ID: str = os.getenv("ORCID_CLIENT_ID", "")
    ORCID_CLIENT_SECRET: str = os.getenv("ORCID_CLIENT_SECRET", "")
    ORCID_REDIRECT_URI: str = os.getenv(
        "ORCID_REDIRECT_URI", "http://localhost:8000/auth/orcid/callback"
    )

    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")

    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "change-me-to-a-random-secret")
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRY_HOURS: int = 24

    ORCID_ENVIRONMENT: str = os.getenv("ORCID_ENVIRONMENT", "production")

    @property
    def orcid_base_url(self) -> str:
        if self.ORCID_ENVIRONMENT == "sandbox":
            return "https://sandbox.orcid.org"
        return "https://orcid.org"

    @property
    def orcid_api_url(self) -> str:
        if self.ORCID_ENVIRONMENT == "sandbox":
            return "https://pub.sandbox.orcid.org"
        return "https://pub.orcid.org"

    @property
    def orcid_authorize_url(self) -> str:
        return f"{self.orcid_base_url}/oauth/authorize"

    @property
    def orcid_token_url(self) -> str:
        return f"{self.orcid_base_url}/oauth/token"

    @property
    def orcid_userinfo_url(self) -> str:
        return f"{self.orcid_base_url}/oauth/userinfo"


settings = Settings()
