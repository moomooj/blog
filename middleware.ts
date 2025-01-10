import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";
import { object } from "zod";

interface Routes {
  public: { [key: string]: boolean };
  preventLoginUser: { [key: string]: boolean };
}

const Urls: Routes = {
  public: {
    "/": true,
  },
  preventLoginUser: {
    "/login": true,
    "/create-account": true,
  },
};

export async function middleware(request: NextRequest) {
  if (Urls.public[request.nextUrl.pathname]) {
    return;
  }
  const session = await getSession();
  const prevent = Urls.preventLoginUser[request.nextUrl.pathname];

  if (!session.id) {
    if (!prevent) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (prevent) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
