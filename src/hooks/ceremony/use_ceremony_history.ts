import type ApiResponse from "@/data/models/base/api-base-response";
import {
  useGetAllCeremonyHistoryQuery,
  useGetAllCeremonyHistoryOnProgressQuery,
  updateStatusCeremonyHistory as updateStatusCeremonyHistoryBridge,
} from "./ceremony_history_bridge";
import type CeremonyHistory from "@/data/models/ceremony/response/ceremony_history";
import { useEffect } from "react";
import { useCentralStore } from "@/store";
import { showToast, statusMessage } from "@/utils";
import { type UseMutateFunction, useMutation } from "react-query";
import type { AxiosError } from "axios";
import type CeremonyHistoryUpdateStatusRequest from "@/data/models/ceremony/request/ceremony_history_update_request";

interface IUseCeremonyHistory {
  allCeremonyHistory: ApiResponse<CeremonyHistory[]> | undefined;
  isAllCeremonyHistoryLoading: boolean;
  isAllCeremonyHistoryError: boolean;
  updateStatusCeremonyHistory: UseMutateFunction<
    ApiResponse<null>,
    unknown,
    CeremonyHistoryUpdateStatusRequest,
    unknown
  >;
  isLoadingUpdateStatusCeremonyHistory: boolean;
  isUpdateStatusCeremonyHistorySuccess: boolean;
  isUpdateStatusCeremonyHistoryError: boolean;

  allCeremonyHistoryOnProgress: ApiResponse<CeremonyHistory[]> | undefined;
  isAllCeremonyHistoryOnProgressLoading: boolean;
  isAllCeremonyHistoryOnProgressError: boolean;
}

export const useCeremonyHistory = (): IUseCeremonyHistory => {
  const { setIsLoading } = useCentralStore();

  const {
    data: allCeremonyHistory,
    isLoading: isAllCeremonyHistoryLoading,
    isError: isAllCeremonyHistoryError,
    error: errorAllCeremonyHistory,
  } = useGetAllCeremonyHistoryQuery({ page: 1, limit: 1000 });

  const {
    data: allCeremonyHistoryOnProgress,
    isLoading: isAllCeremonyHistoryOnProgressLoading,
    isError: isAllCeremonyHistoryOnProgressError,
    error: errorAllCeremonyHistoryOnProgress,
  } = useGetAllCeremonyHistoryOnProgressQuery({ page: 1, limit: 1000 });

  const {
    mutate: updateStatusCeremonyHistory,
    isLoading: isLoadingUpdateStatusCeremonyHistory,
    isSuccess: isUpdateStatusCeremonyHistorySuccess,
    isError: isUpdateStatusCeremonyHistoryError,
  } = useMutation(updateStatusCeremonyHistoryBridge, {
    onSuccess: async (value) => {
      value.message.forEach((message) => {
        showToast({ status: "success", message: message });
      });

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
    setIsLoading(
      isAllCeremonyHistoryLoading || isAllCeremonyHistoryOnProgressLoading
    );

    if (isAllCeremonyHistoryError) {
      statusMessage({ message: errorAllCeremonyHistory, status: "error" });
    }
    if (isAllCeremonyHistoryOnProgressError) {
      statusMessage({
        message: errorAllCeremonyHistoryOnProgress,
        status: "error",
      });
    }
  }, [
    isAllCeremonyHistoryLoading,
    isAllCeremonyHistoryError,
    isAllCeremonyHistoryOnProgressError,
  ]);

  return {
    allCeremonyHistory,
    isAllCeremonyHistoryError,
    isAllCeremonyHistoryLoading,
    updateStatusCeremonyHistory,
    isLoadingUpdateStatusCeremonyHistory,
    isUpdateStatusCeremonyHistoryError,
    isUpdateStatusCeremonyHistorySuccess,

    allCeremonyHistoryOnProgress,
    isAllCeremonyHistoryOnProgressError,
    isAllCeremonyHistoryOnProgressLoading,
  };
};
