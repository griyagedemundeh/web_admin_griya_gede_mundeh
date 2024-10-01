import { IAuthService } from "./auth_service_interface";
import api from "@/configs/api";
import LoginRequest from "@/data/models/auth/request/login_request";
import RegisterAdminRequest from "@/data/models/auth/request/register_admin_request";
import Auth from "@/data/models/auth/response/auth";
import ApiResponse from "@/data/models/base/api-base-response";

export class AuthService implements IAuthService {
  async registerAdmin(
    request: RegisterAdminRequest
  ): Promise<ApiResponse<Auth>> {
    const uri = "/super-admin/admin/create";

    try {
      const response = await api.post(uri, request);
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
      const response = await api.post(uri, request);
      return response.data;
    } catch (error) {
      console.error("====================================");
      console.error("ERROR LOGIN --> ", error);
      console.error("====================================");
      throw error;
    }
  }
}
