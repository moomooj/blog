/*
import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";


interface Routes {
  [key: string]: boolean | null;
}

const publicOnlyUrls: Routes = {
  "/": null,
  "/articles": null,
  "/about": null,
  "/the-team": null,
  "/auth": true,
  "/login": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];

  if (exists === null) return;

  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
*/
