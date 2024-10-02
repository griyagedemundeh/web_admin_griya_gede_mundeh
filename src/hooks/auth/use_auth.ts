import { UseMutateFunction, useMutation } from "react-query";
import { login as loginBridge } from "./auth_bridge";
import ApiResponse from "@/data/models/base/api-base-response";
import Auth from "@/data/models/auth/response/auth";
import LoginRequest from "@/data/models/auth/request/login_request";
import { showToast } from "@/utils";
import { useRouter } from "next/navigation";
import Routes from "@/constants/routes";
import { AxiosError } from "axios";

interface IUseAuth {
  login: UseMutateFunction<ApiResponse<Auth>, unknown, LoginRequest, unknown>;
  isLoadingLogin: boolean;
}

export const useAuth = (): IUseAuth => {
  const router = useRouter();

  const { mutate: login, isLoading: isLoadingLogin } = useMutation(
    loginBridge,
    {
      onSuccess: async (value) => {
        console.log("====================================");
        console.log("DATA ---> ", value);
        console.log("====================================");

        value.message.forEach((message) => {
          showToast({ status: "success", message: message });
        });

        router.replace(Routes.dashboard);
      },
      onError: async (error: AxiosError<ApiResponse<Auth>>) => {
        console.error("====================================");
        console.error("ERROR LOGIN -> ", error);
        console.error("====================================");
        showToast({ status: "error", message: error.message });
      },
    }
  );

  return {
    login,
    isLoadingLogin,
  };
};
