import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import CookieKey from "./constants/cookie_key";

const locales = ["id", "en"];
const defaultLocale = "id";
const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/email-verification",
];

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

  // Check if the user is email verified
  const emailVerified =
    request.cookies.get(CookieKey.EMAIL_VERIFIED)?.value === "1";

  // Handle root path
  if (pathname === "/") {
    let redirectPath;

    if (isLoggedIn) {
      redirectPath = emailVerified
        ? `/${locale}/dashboard`
        : `/${locale}/email-verification`;
    } else {
      redirectPath = `/${locale}/login`;
    }

    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // Check if the current path (without locale) is public
  const isPublicPath = PUBLIC_PATHS.some((path) => pathWithoutLocale === path);

  // Restrict access based on email verification status
  if (isLoggedIn && !emailVerified && !isPublicPath) {
    // Redirect unverified users to the email verification page
    return NextResponse.redirect(
      new URL(`/${locale}/email-verification`, request.url)
    );
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!isLoggedIn && !isPublicPath) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  // Redirect verified users trying to access public paths to the dashboard
  if (isLoggedIn && isPublicPath && emailVerified) {
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
