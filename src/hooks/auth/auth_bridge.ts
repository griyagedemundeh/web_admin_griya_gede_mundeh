import LoginRequest from "@/data/models/auth/request/login_request";
import Auth from "@/data/models/auth/response/auth";
import ApiResponse from "@/data/models/base/api-base-response";
import { AuthService } from "@/data/services/auth/auth_service";

import { AxiosError } from "axios";

const auth_service = new AuthService();
const TAG_ERROR = "Error during :";

export const login = async (
  request: LoginRequest
): Promise<ApiResponse<Auth>> => {
  const response = await auth_service
    .login(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<Auth>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} LOGIN`, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const logout = (): void => {
  auth_service.logout();
};
