import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

const preventLoginUserRoutes = new Set(["/login", "/create-account"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await getSession();
  const isAuthenticated = Boolean(session?.id);

  // Prevent login user
  if (isAuthenticated && preventLoginUserRoutes.has(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
