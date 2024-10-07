import { UseMutateFunction, useMutation } from "react-query";
import ApiResponse from "@/data/models/base/api-base-response";
import { showToast } from "@/utils";
import Routes from "@/constants/routes";
import { AxiosError } from "axios";
import Admin from "@/data/models/admin/response/admin";
import AddAdminRequest from "@/data/models/admin/request/add_admin_request";
import { addAdmin as addAdminBridge } from "./admin_bridge";
import { useCentralStore } from "@/store";

interface IUseAdmin {
  addAdmin: UseMutateFunction<
    ApiResponse<Admin>,
    unknown,
    AddAdminRequest,
    unknown
  >;
  isLoadingAddAdmin: boolean;
  isAddAdminSuccess: boolean;
  isAddAdminError: boolean;
}

export const useAdmin = (): IUseAdmin => {
  const { setIsLoading } = useCentralStore();

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

  return {
    addAdmin,
    isLoadingAddAdmin,
    isAddAdminSuccess,
    isAddAdminError,
  };
};
