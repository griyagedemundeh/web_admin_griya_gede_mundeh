import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  UseMutateFunction,
  useMutation,
} from "react-query";
import {
  login as loginBridge,
  logout,
  resendEmailVerification as resendEmailVerificationBridge,
  useCekStatusEmailVerificationQuery,
} from "./auth_bridge";
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
  resendEmailVerification: UseMutateFunction<
    ApiResponse<null>,
    unknown,
    void,
    unknown
  >;
  isLoadingResendEmailVerification: boolean;
  isResendEmailVerificationSuccess: boolean;
  isResendEmailVerificationError: boolean;
  account: Auth | undefined;
  logout: () => void;

  statusEmailVerification: ApiResponse<null> | undefined;
  isCekStatusEmailVerificationSuccess: boolean;
  isCekStatusEmailVerificationLoading: boolean;
  refetchCekStatusEmailVerification: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<ApiResponse<null>, unknown>>;
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
          window.location.href =
            value.data.emailVerified === 1
              ? Routes.dashboard
              : Routes.emailVerification;
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

  // RESEND EMAIL VERIFICATION
  const {
    mutate: resendEmailVerification,
    isLoading: isLoadingResendEmailVerification,
    isSuccess: isResendEmailVerificationSuccess,
    isError: isResendEmailVerificationError,
  } = useMutation(resendEmailVerificationBridge, {
    onSuccess: async (value) => {
      value.message.forEach((message) => {
        showToast({ status: "success", message: message });
      });
    },
    onError: async (error: AxiosError<ApiResponse<null>> | unknown) => {
      if (error instanceof Array) {
        error.forEach((message) => {
          showToast({ status: "error", message: `${message}` });
        });
        return;
      }
      showToast({ status: "error", message: `${error}` });
    },
  });

  const {
    data: statusEmailVerification,
    isSuccess: isCekStatusEmailVerificationSuccess,
    refetch: refetchCekStatusEmailVerification,
    error: errorCekStatusEmailVerification,
    isError: isErrorCekStatusEmailVerification,
    isLoading: isCekStatusEmailVerificationLoading,
  } = useCekStatusEmailVerificationQuery();

  useEffect(() => {
    const authService = new AuthService();
    setAccount(authService.getAccount());
  }, []); // No dependencies

  useEffect(() => {
    if (isErrorCekStatusEmailVerification) {
      (errorCekStatusEmailVerification as any).forEach((message: any) => {
        showToast({ status: "error", message: `${message}` });
      });
    }
  }, [isErrorCekStatusEmailVerification]);

  return {
    account,
    login,
    isLoadingLogin,
    logout,
    isLoadingResendEmailVerification,
    isResendEmailVerificationError,
    isResendEmailVerificationSuccess,
    resendEmailVerification,
    // cek status email verification
    refetchCekStatusEmailVerification,
    isCekStatusEmailVerificationSuccess,
    statusEmailVerification,
    isCekStatusEmailVerificationLoading,
  };
};
