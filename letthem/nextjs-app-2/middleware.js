import { NextResponse } from "next/server";

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/register")) {
    if (request.cookies.has("visited") == false) {
      const response = NextResponse.next();
      response.cookies.set({
        name: "visited",
        value: "true",
        maxAge: 3600,
      });
      return response;
    }
    return NextResponse.next();
  }
}
