import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

let locales = ["id", "en"];
let defaultLocale = "id";

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  const acceptLang = request.headers.get("Accept-Language");
  if (!acceptLang) return defaultLocale;
  const headers = { "accept-language": acceptLang };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathname.startsWith("/assets/")) {
    return NextResponse.next(); // Bypass locale processing
  }

  if (pathnameHasLocale) return;
  // Redirect if there is no locale
  const locale = getLocale(request);

  const cookies = request.cookies;
  const isLogin = cookies.get("isLogin");

  // if (isLogin === undefined) {
  //   request.nextUrl.pathname = `/${locale}/login`;
  //   request.cookies.set("isLogin", "true");
  //   return NextResponse.redirect(request.nextUrl);
  // }

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
