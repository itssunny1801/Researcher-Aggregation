from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers.auth import router as auth_router

app = FastAPI(
    title="Researcher Platform — Auth Service",
    description="ORCID OAuth2 authentication backend",
    version="1.0.0",
)

# ── CORS — allow the Next.js frontend to make requests ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,          # needed for cookies
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Register routers ──
app.include_router(auth_router)


# ── Health check ──
@app.get("/", tags=["Health"])
async def health_check():
    return {
        "status": "ok",
        "service": "researcher-auth-backend",
        "orcid_environment": settings.ORCID_ENVIRONMENT,
    }
