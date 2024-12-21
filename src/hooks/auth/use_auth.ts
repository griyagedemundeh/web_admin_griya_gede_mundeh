import { UseMutateFunction, useMutation } from "react-query";
import { login as loginBridge, logout } from "./auth_bridge";
import ApiResponse from "@/data/models/base/api-base-response";
import Auth from "@/data/models/auth/response/auth";
import LoginRequest from "@/data/models/auth/request/login_request";
import { showToast } from "@/utils";
import Routes from "@/constants/routes";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { AuthService } from "@/data/services/auth/auth_service";

interface IUseAuth {
  login: UseMutateFunction<ApiResponse<Auth>, unknown, LoginRequest, unknown>;
  isLoadingLogin: boolean;
  account: Auth | undefined;
  logout: () => void;
}

export const useAuth = (): IUseAuth => {
  const [account, setAccount] = useState<Auth>();

  const { mutate: login, isLoading: isLoadingLogin } = useMutation(
    loginBridge,
    {
      onSuccess: async (value) => {
        value.message.forEach((message) => {
          showToast({ status: "success", message: message });
        });

        setTimeout(() => {
          window.location.href = Routes.dashboard;
        }, 2000);
      },
      onError: async (error: AxiosError<ApiResponse<Auth>> | unknown) => {
        if (error instanceof Array) {
          error.forEach((message) => {
            showToast({ status: "error", message: `${message}` });
          });
          return;
        }
        showToast({ status: "error", message: `${error}` });
      },
    }
  );

  useEffect(() => {
    const authService = new AuthService();
    setAccount(authService.getAccount());
  }, []); // No dependencies

  return {
    account,
    login,
    isLoadingLogin,
    logout,
  };
};
