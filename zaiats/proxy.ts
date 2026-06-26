import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "./constants";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const langSegment = pathname.split("/")[1];
  const hasLang = SUPPORTED_LANGUAGES.includes(langSegment);

  if (
    pathname.startsWith("/images/") ||
    pathname.startsWith("/fonts/") ||
    pathname.includes(".") 
  ) {
    return NextResponse.next();
  }

  if (hasLang) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-language", langSegment);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const targetLang =
    cookieLocale && SUPPORTED_LANGUAGES.includes(cookieLocale)
      ? cookieLocale
      : DEFAULT_LANGUAGE;

  const url = request.nextUrl.clone();
  url.pathname = `/${targetLang}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
