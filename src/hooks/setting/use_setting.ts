import type ApiResponse from "@/data/models/base/api-base-response";
import {
  updateProfileGriya as updateProfileGriyaBridge,
  useGetProfileGriyaQuery,
  useGetProfileAdminQuery,
} from "./setting_bridge";
import { useEffect } from "react";
import { useCentralStore } from "@/store";
import { showToast, statusMessage } from "@/utils";
import { type UseMutateFunction, useMutation } from "react-query";
import type { AxiosError } from "axios";
import ProfileGriya from "@/data/models/setting/response/profile_griya";
import ProfileGriyaRequest from "@/data/models/setting/request/profile_griya_request";
import { useAuth } from "../auth/use_auth";
import ProfileAdmin from "@/data/models/setting/response/profile_admin";

interface IUseSetting {
  profileGriya: ApiResponse<ProfileGriya> | undefined;
  isProfileGriyaLoading: boolean;
  isProfileGriyaError: boolean;
  updateProfileGriya: UseMutateFunction<
    ApiResponse<ProfileGriya>,
    unknown,
    ProfileGriyaRequest,
    unknown
  >;
  isLoadingUpdateProfileGriya: boolean;
  isUpdateProfileGriyaSuccess: boolean;
  isUpdateProfileGriyaError: boolean;

  // ADMIN
  profileAdmin: ApiResponse<ProfileAdmin> | undefined;
  isProfileAdminLoading: boolean;
  isProfileAdminError: boolean;
}

export const useSetting = (): IUseSetting => {
  const { setIsLoading } = useCentralStore();
  const { account } = useAuth();

  const {
    data: profileGriya,
    isLoading: isProfileGriyaLoading,
    isError: isProfileGriyaError,
    error: errorProfileGriya,
  } = useGetProfileGriyaQuery();

  const {
    data: profileAdmin,
    isLoading: isProfileAdminLoading,
    isError: isProfileAdminError,
    error: errorProfileAdmin,
  } = useGetProfileAdminQuery({ id: account?.id ?? 0 });

  const {
    mutate: updateProfileGriya,
    isLoading: isLoadingUpdateProfileGriya,
    isSuccess: isUpdateProfileGriyaSuccess,
    isError: isUpdateProfileGriyaError,
  } = useMutation(updateProfileGriyaBridge, {
    onSuccess: async (value) => {
      if (typeof value.message === "string") {
        showToast({ status: "success", message: value.message });
      } else {
        value.message.forEach((message) => {
          showToast({ status: "success", message: message });
        });
      }

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

  useEffect(() => {
    setIsLoading(isProfileGriyaLoading || isProfileAdminLoading);

    if (isProfileGriyaError) {
      statusMessage({ message: errorProfileGriya, status: "error" });
    }

    if (isProfileAdminError) {
      statusMessage({ message: errorProfileAdmin, status: "error" });
    }
  }, [isProfileGriyaLoading, isProfileGriyaError, isProfileAdminError]);

  return {
    profileGriya,
    isProfileGriyaError,
    isProfileGriyaLoading,
    updateProfileGriya,
    isLoadingUpdateProfileGriya,
    isUpdateProfileGriyaError,
    isUpdateProfileGriyaSuccess,

    // ADMIN
    profileAdmin,
    isProfileAdminError,
    isProfileAdminLoading,
  };
};
