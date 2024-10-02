import { IAuthService } from "./auth_service_interface";
import api from "@/configs/api";
import { appBaseUrl } from "@/configs/config";
import CookieKey from "@/constants/cookie_key";
import StorageKey from "@/constants/storage_key";
import LoginRequest from "@/data/models/auth/request/login_request";
import RegisterAdminRequest from "@/data/models/auth/request/register_admin_request";
import Auth from "@/data/models/auth/response/auth";
import ApiResponse from "@/data/models/base/api-base-response";
import LocalStorage from "@/data/storage/local_storage";
import { AxiosResponse } from "axios";
import { setCookie } from "cookies-next";

export class AuthService implements IAuthService {
  async registerAdmin(
    request: RegisterAdminRequest
  ): Promise<ApiResponse<Auth>> {
    const uri = "/super-admin/admin/create";

    try {
      const response: AxiosResponse<ApiResponse<Auth>> = await api.post(
        uri,
        request
      );

      this.setToken({ access_token: response.data.data.token });
      LocalStorage.set(StorageKey.ACCOUNT, response.data);

      return response.data;
    } catch (error) {
      console.error("====================================");
      console.error("ERROR REGISTER ADMIN --> ", error);
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

      this.setToken({ access_token: response.data.data.token });
      LocalStorage.set(StorageKey.ACCOUNT, response.data.data);

      return response.data;
    } catch (error) {
      console.error("====================================");
      console.error("ERROR LOGIN --> ", error);
      console.error("====================================");
      throw error;
    }
  }

  private setToken({ access_token }: { access_token: string }) {
    setCookie(CookieKey.ACCESS_TOKEN, access_token, {
      domain: appBaseUrl(),
    });

    setCookie(CookieKey.IS_LOGGED_IN, true, {
      domain: appBaseUrl(),
    });
  }
}
