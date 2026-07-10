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

// ── Auth API Calls ──

/**
 * Fetches the currently authenticated user from the backend.
 * Returns null if not authenticated.
 */
export async function fetchCurrentUser(): Promise<User | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/me`, {
      credentials: "include", // send cookies
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data as User;
  } catch {
    return null;
  }
}

/**
 * Logs out the current user by calling the backend.
 */
export async function logout(): Promise<void> {
  try {
    await fetch(`${BACKEND_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // Ignore errors — just redirect
  }
}

/**
 * Returns the URL to redirect the user to for ORCID login.
 */
export function getLoginUrl(): string {
  return `${BACKEND_URL}/auth/orcid/login`;
}
