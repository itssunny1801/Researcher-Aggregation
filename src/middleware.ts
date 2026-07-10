import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const PROTECTED_ROUTES = ["/account"];

// Routes that are always public
const PUBLIC_ROUTES = ["/", "/search", "/login", "/researcher"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Check for the access_token cookie (set by the backend after ORCID login)
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    // Redirect unauthenticated users to the login page
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Run middleware on these paths
  matcher: ["/account/:path*"],
};
