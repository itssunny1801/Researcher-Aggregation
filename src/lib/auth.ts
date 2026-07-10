import { BACKEND_URL } from "./constants";

// ── Types ──
export interface User {
  orcid_id: string;
  name: string;
  given_name?: string;
  family_name?: string;
}

export interface AuthState {
  authenticated: boolean;
  user: User | null;
}

// ── Token Storage (localStorage — works cross-domain) ──
const TOKEN_KEY = "rh_auth_token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

// ── Auth API Calls ──

/**
 * Fetches the currently authenticated user from the backend.
 * Sends the JWT as an Authorization: Bearer header.
 * Returns null if not authenticated.
 */
export async function fetchCurrentUser(): Promise<User | null> {
  const token = getStoredToken();
  if (!token) return null;

  try {
    const res = await fetch(`${BACKEND_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      // Token is invalid/expired — clear it
      clearStoredToken();
      return null;
    }

    const data = await res.json();
    return data as User;
  } catch {
    return null;
  }
}

/**
 * Logs out the current user.
 */
export async function logout(): Promise<void> {
  clearStoredToken();
  // Also call backend to clear any server-side session if applicable
  try {
    const token = getStoredToken();
    await fetch(`${BACKEND_URL}/auth/logout`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  } catch {
    // Ignore errors — token is already cleared
  }
}

/**
 * Returns the URL to redirect the user to for ORCID login.
 */
export function getLoginUrl(): string {
  return `${BACKEND_URL}/auth/orcid/login`;
}
