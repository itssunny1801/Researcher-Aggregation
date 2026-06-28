# Backend — ORCID Authentication Service

A FastAPI backend that handles ORCID OAuth2 login for the Researcher Aggregation Platform.

## What it does

- Professor clicks **"Login with ORCID"** on the frontend
- Backend redirects them to ORCID's login page
- Professor logs in with their **existing ORCID account**
- ORCID sends them back to the backend with a code
- Backend exchanges the code for user info (name, ORCID iD)
- Backend creates a JWT cookie and redirects to the frontend `/account` page
- Frontend can call `GET /auth/me` to get the logged-in user's data

## API Endpoints

| Method | Endpoint             | Description                                    |
|--------|----------------------|------------------------------------------------|
| GET    | `/`                  | Health check                                   |
| GET    | `/auth/orcid/login`  | Redirects to ORCID login page                  |
| GET    | `/auth/orcid/callback` | ORCID redirects here; exchanges code for JWT |
| GET    | `/auth/me`           | Returns current user (requires JWT cookie)     |
| POST   | `/auth/logout`       | Clears JWT cookie                              |

## Setup

### 1. Get ORCID API Credentials

Your application needs its own API keys (this is NOT about creating a personal ORCID account):

1. Go to [https://orcid.org/developer-tools](https://orcid.org/developer-tools)
2. Sign in with **any** ORCID account
3. Register your application:
   - **Name**: Researcher Aggregation Platform
   - **Redirect URI**: `http://localhost:8000/auth/orcid/callback`
4. Copy the **Client ID** and **Client Secret**

### 2. Configure Environment

```bash
cd backend
cp .env.example .env
```

Edit `.env` and fill in your credentials:
```
ORCID_CLIENT_ID=APP-XXXXXXXXXX
ORCID_CLIENT_SECRET=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### 3. Install & Run

```bash
# Create a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn app.main:app --reload --port 8000
```

### 4. Test

- Open `http://localhost:8000` — should see health check JSON
- Open `http://localhost:8000/auth/orcid/login` — should redirect to ORCID
- Open `http://localhost:8000/docs` — interactive Swagger docs

## How the frontend connects

The frontend just needs to:
1. Link the login button to `http://localhost:8000/auth/orcid/login`
2. After login, call `GET http://localhost:8000/auth/me` (with credentials) to get user data
3. Call `POST http://localhost:8000/auth/logout` to log out
