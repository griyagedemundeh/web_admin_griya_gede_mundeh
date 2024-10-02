import LoginRequest from "@/data/models/auth/request/login_request";
import RegisterAdminRequest from "@/data/models/auth/request/register_admin_request";
import Auth from "@/data/models/auth/response/auth";

import ApiResponse from "@/data/models/base/api-base-response";

export interface IAuthService {
  getAccount(): Auth;
  registerAdmin(request: RegisterAdminRequest): Promise<ApiResponse<Auth>>;
  login(request: LoginRequest): Promise<ApiResponse<Auth>>;
}
