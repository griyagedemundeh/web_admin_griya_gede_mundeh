import { UseMutateFunction, useMutation } from "react-query";
import ApiResponse from "@/data/models/base/api-base-response";
import { showToast } from "@/utils";
import { AxiosError } from "axios";
import Admin from "@/data/models/admin/response/admin";
import AdminRequest from "@/data/models/admin/request/admin_request";
import {
  addAdmin as addAdminBridge,
  deleteAdmin as deleteAdminBridge,
  editAdmin as editAdminBridge,
  resendEmailVerification as resendEmailVerificationBridge,
  useGetAllAdminQuery,
} from "./admin_bridge";
import { useCentralStore } from "@/store";
import { useEffect } from "react";
import User from "@/data/models/user/response/user";

interface IUseAdmin {
  addAdmin: UseMutateFunction<
    ApiResponse<Admin>,
    unknown,
    AdminRequest,
    unknown
  >;
  editAdmin: UseMutateFunction<
    ApiResponse<User>,
    unknown,
    {
      id: number | string;
      request: AdminRequest;
    },
    unknown
  >;
  deleteAdmin: UseMutateFunction<
    ApiResponse<null>,
    unknown,
    {
      id: number | string;
    },
    unknown
  >;
  allAdmin: ApiResponse<Admin[]> | undefined;
  isLoadingAddAdmin: boolean;
  isAddAdminSuccess: boolean;
  isAddAdminError: boolean;
  isLoadingEditAdmin: boolean;
  isEditAdminSuccess: boolean;
  isEditAdminError: boolean;
  isLoadingDeleteAdmin: boolean;
  isDeleteAdminSuccess: boolean;
  isDeleteAdminError: boolean;

  // Resend Email Verificattion
  resendEmailVerification: UseMutateFunction<
    ApiResponse<null>,
    unknown,
    {
      id: number;
      request: AdminRequest;
    },
    unknown
  >;
  isLoadingResendEmailVerification: boolean;
  isResendEmailVerificationSuccess: boolean;
  isResendEmailVerificationError: boolean;
}

export const useAdmin = (): IUseAdmin => {
  const { setIsLoading } = useCentralStore();

  const {
    data: allAdmin,
    isLoading: isAllAdminLoading,
    isError: isAllAdminError,
    error: errorAllAdmin,
    refetch: refecthAllAdmin,
  } = useGetAllAdminQuery({ limit: 100, page: 1 });

  // ADD
  const {
    mutate: addAdmin,
    isLoading: isLoadingAddAdmin,
    isSuccess: isAddAdminSuccess,
    isError: isAddAdminError,
  } = useMutation(addAdminBridge, {
    onSuccess: async (value) => {
      value.message.forEach((message) => {
        showToast({ status: "success", message: message });
      });

      setIsLoading(false);
      window.location.reload();
    },
    onError: async (error: AxiosError<ApiResponse<Admin>> | unknown) => {
      setIsLoading(false);
      if (error instanceof Array) {
        error.forEach((message) => {
          showToast({ status: "error", message: `${message}` });
        });
        return;
      }
      showToast({ status: "error", message: `${error}` });
    },
  });

  // EDIT
  const {
    mutate: editAdmin,
    isLoading: isLoadingEditAdmin,
    isSuccess: isEditAdminSuccess,
    isError: isEditAdminError,
  } = useMutation(editAdminBridge, {
    onSuccess: async (value) => {
      value.message.forEach((message) => {
        showToast({ status: "success", message: message });
      });

      setIsLoading(false);
      window.location.reload();
    },
    onError: async (error: AxiosError<ApiResponse<Admin>> | unknown) => {
      setIsLoading(false);
      if (error instanceof Array) {
        error.forEach((message) => {
          showToast({ status: "error", message: `${message}` });
        });
        return;
      }
      showToast({ status: "error", message: `${error}` });
    },
  });

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

      setIsLoading(false);
    },
    onError: async (error: AxiosError<ApiResponse<null>> | unknown) => {
      setIsLoading(false);
      if (error instanceof Array) {
        error.forEach((message) => {
          showToast({ status: "error", message: `${message}` });
        });
        return;
      }
      showToast({ status: "error", message: `${error}` });
    },
  });

  // DELETE
  const {
    mutate: deleteAdmin,
    isLoading: isLoadingDeleteAdmin,
    isSuccess: isDeleteAdminSuccess,
    isError: isDeleteAdminError,
  } = useMutation(deleteAdminBridge, {
    onSuccess: async (value) => {
      refecthAllAdmin();

      if (value instanceof Array) {
        value.forEach((message) => {
          showToast({ status: "success", message: `${message}` });
        });
        return;
      }
      showToast({ status: "success", message: `${value.message}` });

      setIsLoading(false);

      window.location.reload();
    },
    onError: async (error: AxiosError<ApiResponse<null>> | unknown) => {
      setIsLoading(false);
      if (error instanceof Array) {
        error.forEach((message) => {
          showToast({ status: "error", message: `${message}` });
        });
        return;
      }
      showToast({ status: "error", message: `${error}` });
    },
  });

  //
  useEffect(() => {
    setIsLoading(isAllAdminLoading);

    if (isAllAdminError) {
      (errorAllAdmin as any).forEach((message: any) => {
        showToast({ status: "error", message: `${message}` });
      });
    }
    if (isAllAdminError) {
      (errorAllAdmin as any).forEach((message: any) => {
        showToast({ status: "error", message: `${message}` });
      });
    }
  }, [isAllAdminLoading, isAllAdminError]);

  return {
    addAdmin,
    allAdmin,
    isLoadingAddAdmin,
    isAddAdminSuccess,
    isAddAdminError,
    editAdmin,
    isEditAdminError,
    isEditAdminSuccess,
    isLoadingEditAdmin,
    deleteAdmin,
    isDeleteAdminError,
    isDeleteAdminSuccess,
    isLoadingDeleteAdmin,
    // resend email
    resendEmailVerification,
    isLoadingResendEmailVerification,
    isResendEmailVerificationError,
    isResendEmailVerificationSuccess,
  };
};
