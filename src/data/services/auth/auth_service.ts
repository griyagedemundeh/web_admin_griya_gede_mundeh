import { IAuthService } from "./auth_service_interface";
import api from "@/configs/api";
import { appBaseUrl } from "@/configs/config";
import CookieKey from "@/constants/cookie_key";
import StorageKey from "@/constants/storage_key";
import LoginRequest from "@/data/models/auth/request/login_request";
import RegisterAdminRequest from "@/data/models/admin/request/admin_request";
import Auth from "@/data/models/auth/response/auth";
import ApiResponse from "@/data/models/base/api-base-response";
import LocalStorage from "@/data/storage/local_storage";
import { AxiosError, AxiosResponse } from "axios";
import { setCookie } from "cookies-next";

export class AuthService implements IAuthService {
  registerAdmin(request: RegisterAdminRequest): Promise<ApiResponse<Auth>> {
    throw new Error("Method not implemented.");
  }
  getAccount(): Auth {
    try {
      const account = LocalStorage.get<Auth>(StorageKey.ACCOUNT) as Auth;

      return account;
    } catch (error) {
      console.error("====================================");
      console.error("ERROR GET ACCOUNT --> ", error);
      console.error("====================================");
      throw error;
    }
  }

  async login(request: LoginRequest) {
    const uri = "/auth/sign-in";

    try {
      const response: AxiosResponse<ApiResponse<Auth>> = await api.post(
        uri,
        request
      );

      this.setToken({
        access_token: response.data.data.token,
        admin_role: response.data.data.role,
        emailVerified: response.data.data.emailVerified,
      });
      LocalStorage.set(StorageKey.ACCOUNT, response.data.data);

      return response.data;
    } catch (error: AxiosError<ApiResponse<Auth>> | any) {
      console.error("====================================");
      console.error("ERROR LOGIN --> ", error.response.data.message);
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  async resendEmailVerification(): Promise<ApiResponse<null>> {
    const uri = `auth/resend-verification`;
    try {
      const response: AxiosResponse<ApiResponse<null>> = await api.post(uri);
      return response.data;
    } catch (error: AxiosError<ApiResponse<null>> | any) {
      console.error("==================================");
      console.error(
        "Error RESEND EMAIL VERIFICATION -->",
        error.response.data.message
      );
      console.error("==================================");
      throw error.response.data.message;
    }
  }

  async cekStatusEmailVerification(): Promise<ApiResponse<null>> {
    const uri = `auth/cek-status-email-verification`;
    try {
      const response: AxiosResponse<ApiResponse<null>> = await api.get(uri);
      return response.data;
    } catch (error: AxiosError<ApiResponse<null>> | any) {
      console.error("==================================");
      console.error(
        "Error CEK EMAIL VERIFICATION -->",
        error.response.data.message
      );
      console.error("==================================");
      throw error.response.data.message;
    }
  }

  logout(): void {
    try {
      this.clearToken();
    } catch (error) {
      console.error("Logout Error", error);
      throw error;
    }
  }

  private clearToken(): void {
    const cookieOptions = {
      domain: appBaseUrl(),
      expires: new Date(0), // Set expiration date in the past to clear
    };

    setCookie(CookieKey.ACCESS_TOKEN, "", cookieOptions);
    setCookie(CookieKey.IS_LOGGED_IN, "", cookieOptions);
    setCookie(CookieKey.EMAIL_VERIFIED, "", cookieOptions);
    LocalStorage.remove(StorageKey.ACCOUNT);

    window.location.reload();
  }

  private setToken({
    access_token,
    admin_role,
    emailVerified,
  }: {
    access_token: string;
    admin_role: string;
    emailVerified: 0 | 1;
  }) {
    setCookie(CookieKey.ACCESS_TOKEN, access_token, {
      domain: appBaseUrl(),
    });

    setCookie(CookieKey.IS_LOGGED_IN, true, {
      domain: appBaseUrl(),
    });

    setCookie(CookieKey.ADMIN_ROLE, admin_role, {
      domain: appBaseUrl(),
    });
    setCookie(CookieKey.EMAIL_VERIFIED, emailVerified, {
      domain: appBaseUrl(),
    });
  }
}
