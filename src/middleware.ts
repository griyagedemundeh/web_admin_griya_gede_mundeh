import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import CookieKey from "./constants/cookie_key";

const locales = ["id", "en"];
const defaultLocale = "id";

// Get the preferred locale from the request
function getLocale(request: NextRequest) {
  const acceptLang = request.headers.get("Accept-Language");
  if (!acceptLang) return defaultLocale;
  const headers = { "accept-language": acceptLang };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass locale processing for assets
  if (pathname.startsWith("/assets/")) {
    return NextResponse.next();
  }

  // Determine if the path already includes a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  const locale = getLocale(request);

  // Check if the user is logged in by reading the cookie
  const cookies = request.headers.get("cookie");
  const isLoggedin = cookies?.includes(`${CookieKey.IS_LOGGED_IN}=true`);

  // If the user is already logged in and is accessing the login page, redirect to dashboard
  if (!pathnameHasLocale && isLoggedin) {
    if (pathname === "/" || pathname === "/home" || pathname === "/dashboard") {
      return NextResponse.redirect(
        new URL(`/${locale}/dashboard`, request.url)
      );
    }

    // If there is no locale in the pathname, add the preferred locale and proceed
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // if (!pathnameHasLocale && !isLoggedin) {
  //   request.nextUrl.pathname = `/${locale}/login`;
  //   return NextResponse.redirect(request.nextUrl);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next).*)", // Skip all internal paths like _next
    "/dashboard/:path*", // Match any dashboard-related paths
    "/", // Match the root URL
  ],
};
