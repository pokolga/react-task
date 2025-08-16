import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  const match = pathname.match(/^\/character\/(\d+)$/);
  if (match) {
    const id = match[1];

    url.pathname = "/";
    url.searchParams.set("characterId", id);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
