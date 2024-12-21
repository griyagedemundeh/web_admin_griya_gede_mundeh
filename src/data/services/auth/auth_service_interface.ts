import LoginRequest from "@/data/models/auth/request/login_request";
import Auth from "@/data/models/auth/response/auth";
import ApiResponse from "@/data/models/base/api-base-response";

export interface IAuthService {
  getAccount(): Auth;
  login(request: LoginRequest): Promise<ApiResponse<Auth>>;
  logout(): void;
}
