import { NextRequest, NextResponse } from "next/server";

/*export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  const match = pathname.match(/^\/character\/(\d+)$/);
  if (match) {
    const id = match[1];
    return NextResponse.redirect(new URL(`/?characterId=${id}`, request.url));
  }

  return NextResponse.next();
}*/

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone(); // клонируем, чтобы не мутировать оригинал
  const pathname = url.pathname;

  const match = pathname.match(/^\/character\/(\d+)$/);
  if (match) {
    const id = match[1];

    url.pathname = "/";
    url.searchParams.set("characterId", id); // добавляем новый параметр
    console.log("Original URL:", request.nextUrl.toString());
    console.log("Cloned URL:", pathname.toString());
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
