import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminLoggedIn = request.cookies.get("sarkar_admin_auth")?.value === "true";
  const isUserLoggedIn  = request.cookies.get("sarkar_user_auth")?.value  === "true";

  // Protect /admin and /admin/* — must be admin-authenticated
  if ((pathname === "/admin" || pathname.startsWith("/admin/")) && !isAdminLoggedIn) {
    const url = new URL("/admin-login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // Already admin-logged-in → skip /admin-login
  if (pathname === "/admin-login" && isAdminLoggedIn) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Already user-logged-in → skip /login or /signup
  if ((pathname === "/login" || pathname === "/signup") && isUserLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/admin-login",
    "/login",
    "/signup",
    "/forgot-password",
    "/verify-mobile",
  ],
};
