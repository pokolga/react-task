import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  const match = pathname.match(/^\/character\/(\d+)$/);
  if (match) {
    const id = match[1];
    return NextResponse.redirect(new URL(`/?characterId=${id}`, request.url));
  }

  return NextResponse.next();
}
