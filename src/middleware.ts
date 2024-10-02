import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import CookieKey from "./constants/cookie_key";

const locales = ["id", "en"];
const defaultLocale = "id";
const PUBLIC_PATHS = ["/login", "/register", "/forgot-password"];

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

  // Extract the locale from the pathname if it exists
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  const locale = pathnameLocale || getLocale(request);

  // Get the path without the locale prefix
  const pathWithoutLocale = pathnameLocale
    ? pathname.replace(`/${pathnameLocale}`, "")
    : pathname;

  // Check if the user is logged in
  const isLoggedIn =
    request.cookies.get(CookieKey.IS_LOGGED_IN)?.value === "true";

  console.log("====================================");
  console.log("IS LOGGEDIN -->", isLoggedIn);
  console.log("PATH -->", pathname);
  console.log("====================================");

  // Handle root path
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(
        isLoggedIn ? `/${locale}/dashboard` : `/${locale}/login`,
        request.url
      )
    );
  }

  // Check if the current path (without locale) is public
  const isPublicPath = PUBLIC_PATHS.some((path) => pathWithoutLocale === path);

  // Redirect logic
  if (!isLoggedIn && !isPublicPath) {
    // Redirect to login if trying to access protected route while not logged in
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  } else if (isLoggedIn && isPublicPath) {
    // Redirect to dashboard if trying to access public route while logged in
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  // Add locale to URL if it's missing
  if (!pathnameLocale) {
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
