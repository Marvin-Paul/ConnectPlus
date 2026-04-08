import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-development-only";
const getSecretKey = () => new TextEncoder().encode(JWT_SECRET);

/**
 * Proxy function (previously middleware) handling authentication and routing boundaries.
 */
export async function proxy(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const { pathname } = request.nextUrl;

  // Paths that don't require authentication
  const isPublicPath = pathname === "/" || pathname === "/login" || pathname === "/signup" || pathname.startsWith("/api/");
  
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
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth-token");
      return response;
    }
  }

  return NextResponse.next();
}

// Export as default as well to ensure Next.js can resolve it correctly
export default proxy;

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
