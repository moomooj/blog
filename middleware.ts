/*import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  public: { [key: string]: boolean };
  preventLoginUser: { [key: string]: boolean };
}

const Urls = {
  public: new Set(["/"]),
  preventLoginUser: new Set(["/login", "/create-account"]),
};

const DynamicUrls = {
  public: /^\/articles\/[^\/]+$/,
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (Urls.public.has(pathname)) {
    return;
  }

  if (DynamicUrls.public.test(pathname)) {
    return;
  }

  const session = await getSession();

  if (!session.id && !Urls.preventLoginUser.has(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (session.id && Urls.preventLoginUser.has(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};*/

export async function middleware() {
  return;
}
