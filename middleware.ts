import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-development-only";

// Use jose in middleware instead of jsonwebtoken as it's edge-compatible
const getSecretKey = () => new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const { pathname } = request.nextUrl;

  // Paths that don't require authentication
  const isPublicPath = pathname === "/login" || pathname === "/signup" || pathname.startsWith("/api/");
  
  // Static assets and internal next.js files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".") // image files, etc.
  ) {
    return NextResponse.next();
  }

  // If user is logged in and trying to access auth pages, redirect to dashboard
  if (token && (pathname === "/login" || pathname === "/signup")) {
    try {
      await jwtVerify(token, getSecretKey());
      return NextResponse.redirect(new URL("/", request.url));
    } catch (e) {
      // Invalid token, allow access to public path
      const response = NextResponse.next();
      response.cookies.delete("auth-token");
      return response;
    }
  }

  // If user is not logged in and session is required, redirect to login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && !isPublicPath) {
    try {
      await jwtVerify(token, getSecretKey());
      return NextResponse.next();
    } catch (e) {
      // Invalid token
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth-token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
