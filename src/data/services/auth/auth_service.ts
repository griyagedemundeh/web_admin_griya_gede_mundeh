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

  logout(): void {
    try {
      this.clearToken();
    } catch (error) {
      console.error("Logout Error", error);
      throw error;
    }
  }

  private clearToken(): void {
    setCookie("access_token", "");

    setCookie("isLoggedin", false);

    LocalStorage.remove(StorageKey.ACCOUNT);

    window.location.reload();
  }

  private setToken({
    access_token,
    admin_role,
  }: {
    access_token: string;
    admin_role: string;
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
  }
}
