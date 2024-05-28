import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const session = await getToken({ req: req });

  // if (req.nextUrl.pathname.startsWith("/write")) {
  //   if (session == null) {
  //     return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  //   }
  // }

  if (req.nextUrl.pathname.startsWith("/list")) {
    console.log(req.headers.get("sec-ch-ua-platform"));
    console.log(new Date());
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith("/register")) {
    if (req.cookies.has('visited') == false) {
      const res = NextResponse.next();
      res.cookies.set({
        name: "visited",
        value: "true",
        maxAge: 60 * 60,
        httpOnly: true,
      });
      return res;
    }
    return NextResponse.next();
  }
}
