import axios, { AxiosError, AxiosResponse } from "axios";
import { getCookie, setCookie } from "cookies-next";
import { appBaseUrl } from "./config";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_MAIN_URL,
});

api.defaults.timeout = 60000;
api.defaults.timeoutErrorMessage = "Timeout, please try again!";

api.interceptors.request.use(
  async function (config) {
    let access_token = getCookie("access_token");

    config.headers.Authorization = `Bearer ${access_token}`;
    config.headers["Access-Control-Allow-Credentials"] = true;
    config.withCredentials = true;

    return config;
  },
  function (error) {
    console.error("ERROR API --> ", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest) {
      let access_token = getCookie("access_token");

      //landing
      if (
        window.location.pathname.endsWith("/") ||
        window.location.pathname.endsWith("/en") ||
        window.location.pathname.endsWith("/id")
      ) {
        return;
      }

      //auth
      if (window.location.pathname.includes("/login")) {
        return;
      }

      if (
        (typeof access_token !== "string" || access_token === "") &&
        originalRequest
      ) {
        try {
          //   const accessToken = await tokenHanlder4.refresh({ access_token: "" });

          setCookie("isLoggedin", true, { maxAge: 900, domain: appBaseUrl() });
          setCookie("access_token", access_token, {
            domain: appBaseUrl(),
            maxAge: 900,
          });

          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          // originalRequest.headers['ngrok-skip-browser-warning'] = 'true';
          originalRequest.withCredentials = true;
          return api(originalRequest);

          // Do something before request is sent
        } catch {
          window.location.href = "/login";
          setCookie("isLoggedin", false, { domain: appBaseUrl() });
        }
      } else {
        let access_token = getCookie("access_token");

        try {
          //   const responseValidate = await validate({ access_token });
          //   if (responseValidate) {
          //     let token: CookieValueTypes | string = "";
          //     if (typeof responseValidate === "string") {
          //       token = responseValidate;
          //     } else {
          //       token = access_token;
          //     }
          //     setCookie("isLoggedin", true, {
          //       maxAge: 900,
          //       domain: appBaseUrl(),
          //     });
          //     setCookie("access_token", token, {
          //       domain: appBaseUrl(),
          //       maxAge: 900,
          //     });
          //     originalRequest.headers.Authorization = `Bearer ${token}`;
          //     // originalRequest.headers['ngrok-skip-browser-warning'] = 'true';
          //     originalRequest.withCredentials = true;
          //     return api(originalRequest);
          //   } else {
          //     window.location.href = "/login";
          //     await loginAPI.logout({ isMobile: false });
          //     setCookie("access_token", "", { maxAge: 0, domain: appBaseUrl() });
          //     setCookie("isLoggedin", false, { maxAge: 0, domain: appBaseUrl() });
          //   }
        } catch (error) {}
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
