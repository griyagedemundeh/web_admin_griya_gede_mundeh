import type ApiResponse from "@/data/models/base/api-base-response";
import {
  updateProfileGriya as updateProfileGriyaBridge,
  useGetProfileGriyaQuery,
  updateProfileAdmin as updateProfileAdminBridge,
  useGetProfileAdminQuery,
} from "./setting_bridge";
import { useEffect, useState } from "react";
import { useCentralStore } from "@/store";
import { showToast, statusMessage } from "@/utils";
import { type UseMutateFunction, useMutation } from "react-query";
import type { AxiosError } from "axios";
import ProfileGriya from "@/data/models/setting/response/profile_griya";
import ProfileGriyaRequest from "@/data/models/setting/request/profile_griya_request";
import { useAuth } from "../auth/use_auth";
import ProfileAdmin from "@/data/models/setting/response/profile_admin";
import ProfileAdminRequest from "@/data/models/setting/request/profila_admin_request";

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

  updateProfileAdmin: UseMutateFunction<
    ApiResponse<ProfileAdmin>,
    unknown,
    ProfileAdminRequest,
    unknown
  >;
  isLoadingUpdateProfileAdmin: boolean;
  isUpdateProfileAdminSuccess: boolean;
  isUpdateProfileAdminError: boolean;

  id: number;
}

export const useSetting = (): IUseSetting => {
  const { setIsLoading } = useCentralStore();
  const { account } = useAuth();
  const [id, setId] = useState<number>(account?.id!);

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
    refetch: refetchProfileAdmin,
  } = useGetProfileAdminQuery({ id });

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

  const {
    mutate: updateProfileAdmin,
    isLoading: isLoadingUpdateProfileAdmin,
    isSuccess: isUpdateProfileAdminSuccess,
    isError: isUpdateProfileAdminError,
  } = useMutation(updateProfileAdminBridge, {
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
    setIsLoading(isProfileGriyaLoading);
    setIsLoading(isProfileAdminLoading);
    setId(account?.id!);

    if (isProfileGriyaError) {
      statusMessage({ message: errorProfileGriya, status: "error" });
    }

    if (isProfileAdminError) {
      statusMessage({ message: errorProfileAdmin, status: "error" });
    }

    if (id) {
      refetchProfileAdmin();
    }
  }, [
    account,
    isProfileGriyaLoading,
    isProfileAdminLoading,
    isProfileGriyaError,
    isProfileAdminError,
  ]);

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
    updateProfileAdmin,
    isLoadingUpdateProfileAdmin,
    isUpdateProfileAdminError,
    isUpdateProfileAdminSuccess,
    id,
  };
};
