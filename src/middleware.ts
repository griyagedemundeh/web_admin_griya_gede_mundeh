import { match } from "@formatjs/intl-localematcher";
import { getCookie } from "cookies-next";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import CookieKey from "./constants/cookie_key";

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

export function middleware(request: NextRequest, response: NextResponse) {
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

  // const cookies = request.cookies;
  const isLogin = getCookie(CookieKey.IS_LOGGED_IN, {
    req: request,
    res: response,
  });

  console.log("====================================");
  console.log("DATA ISLOGIN ---->>> ", isLogin === undefined);
  console.log("====================================");

  if (isLogin === undefined) {
    request.nextUrl.pathname = `/${locale}/login`;
    return NextResponse.redirect(request.nextUrl);
  }

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
