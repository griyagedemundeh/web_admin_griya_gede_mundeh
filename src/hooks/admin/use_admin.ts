import { UseMutateFunction, useMutation } from "react-query";
import ApiResponse from "@/data/models/base/api-base-response";
import { showToast } from "@/utils";
import { AxiosError } from "axios";
import Admin from "@/data/models/admin/response/admin";
import AddAdminRequest from "@/data/models/admin/request/add_admin_request";
import {
  addAdmin as addAdminBridge,
  useGetAllAdminQuery,
} from "./admin_bridge";
import { useCentralStore } from "@/store";
import { useEffect } from "react";

interface IUseAdmin {
  addAdmin: UseMutateFunction<
    ApiResponse<Admin>,
    unknown,
    AddAdminRequest,
    unknown
  >;
  allAdmin: ApiResponse<Admin[]> | undefined;
  isLoadingAddAdmin: boolean;
  isAddAdminSuccess: boolean;
  isAddAdminError: boolean;
}

export const useAdmin = (): IUseAdmin => {
  const { setIsLoading } = useCentralStore();

  const {
    data: allAdmin,
    isLoading: isAllAdminLoading,
    isError: isAllAdminError,
    error: errorAllAdmin,
  } = useGetAllAdminQuery({ limit: 5, page: 1 });

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

  useEffect(() => {
    setIsLoading(isLoadingAddAdmin);
    setIsLoading(isAllAdminLoading);

    if (isAddAdminError) {
      (errorAllAdmin as any).forEach((message: any) => {
        showToast({ status: "error", message: `${message}` });
      });
    }
  }, [isLoadingAddAdmin, isAllAdminLoading, isAllAdminError]);

  return {
    addAdmin,
    allAdmin,
    isLoadingAddAdmin,
    isAddAdminSuccess,
    isAddAdminError,
  };
};
