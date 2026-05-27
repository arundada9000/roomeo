import { NextResponse, type NextRequest } from "next/server";

const adminRoutes = ["/admin"];
const landlordRoutes = ["/landlord"];
const authRoutes = ["/login", "/signup"];

function getSessionCookie(request: NextRequest): string | undefined {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookieHeader.split(";").map((c) => c.trim());

  // better-auth uses: better-auth.session_token (dev) or __Secure-better-auth.session_token (prod)
  const sessionPatterns = [
    "better-auth.session_token",
    "__Secure-better-auth.session_token",
    "better-auth.session_data",
    "__Secure-better-auth.session_data",
  ];

  for (const pattern of sessionPatterns) {
    const found = cookies.find((c) => c.startsWith(pattern + "="));
    if (found) {
      return found.split("=")[1];
    }
  }

  return undefined;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isLandlordRoute = landlordRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  const hasSession = !!getSessionCookie(request);

  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!hasSession && (isAdminRoute || isLandlordRoute)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/landlord", "/landlord/:path*", "/login", "/signup"],
};
