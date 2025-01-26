import { CookieValueTypes, getCookie } from "cookies-next";
import { NextPageContext } from "next";

export type AppBaseUrl =
  | "localhost"
  | "dash.meyadnya.com"
  | "dash.meyadnya.com";
export type AppEnv = "local" | "development" | "production";

export const newConfig = {
  env: process.env.NEXT_PUBLIC_NODE_ENV || "production",
  mock: process.env.NEXT_PUBLIC_MOCK_STATUS ?? "true",
  port: process.env.NEXT_PUBLIC_PORT || 3000,
  token: userToken(),
};

export const isProduction = newConfig.env !== "development";

export function gettingCookie(name: string, ctx?: NextPageContext) {
  const cookie: CookieValueTypes | undefined = getCookie(name, {
    req: ctx?.req,
    res: ctx?.res,
  });
  return cookie;
}

export function appBaseUrl(): AppBaseUrl {
  const env: AppEnv = newConfig.env as AppEnv;
  switch (env) {
    case "local":
      return "localhost";
    case "development":
      return "dash.meyadnya.com";
    default:
    case "production":
      return "dash.meyadnya.com";
  }
}

function userToken() {
  const cookie = gettingCookie("access_token");
  if (cookie) {
    const jwt: string = cookie as string;
    return jwt;
  } else {
    return null;
  }
}
