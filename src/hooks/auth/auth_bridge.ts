import LoginRequest from "@/data/models/auth/request/login_request";
import Auth from "@/data/models/auth/response/auth";
import ApiResponse from "@/data/models/base/api-base-response";
import { AuthService } from "@/data/services/auth/auth_service";

import { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";

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

export const resendEmailVerification = async (): Promise<ApiResponse<null>> => {
  const response = await auth_service
    .resendEmailVerification()
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<null>> | unknown) => {
      console.error("========================");
      console.error(`${TAG_ERROR} RESEND EMAIL VERIFICATION `, error);
      console.error("========================");
      throw error;
    });
  return response;
};

export const cekStatusEmailVerification = async (): Promise<
  ApiResponse<null>
> => {
  const response = await auth_service
    .cekStatusEmailVerification()
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<null>> | unknown) => {
      console.error("========================");
      console.error(`${TAG_ERROR} CEK EMAIL VERIFICATION `, error);
      console.error("========================");
      throw error;
    });
  return response;
};

export const useCekStatusEmailVerificationQuery = (): UseQueryResult<
  ApiResponse<null>,
  unknown
> =>
  useQuery("cekStatusEmailVerification", () => cekStatusEmailVerification(), {
    enabled: false,
  });

export const logout = (): void => {
  auth_service.logout();
};
