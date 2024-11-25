import type ApiResponse from "@/data/models/base/api-base-response";
import {
  useGetAllCeremonyHistoryQuery,
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
  updateStatusInvoice: UseMutateFunction<
    ApiResponse<null>,
    unknown,
    CeremonyHistoryUpdateStatusRequest,
    unknown
  >;
  isLoadingUpdateStatusInvoice: boolean;
  isUpdateStatusInvoiceSuccess: boolean;
  isUpdateStatusInvoiceError: boolean;
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
    mutate: updateStatusInvoice,
    isLoading: isLoadingUpdateStatusInvoice,
    isSuccess: isUpdateStatusInvoiceSuccess,
    isError: isUpdateStatusInvoiceError,
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
    setIsLoading(isAllCeremonyHistoryLoading);

    if (isAllCeremonyHistoryError) {
      statusMessage({ message: errorAllCeremonyHistory, status: "error" });
    }
  }, [isAllCeremonyHistoryLoading, isAllCeremonyHistoryError]);

  return {
    allCeremonyHistory,
    isAllCeremonyHistoryError,
    isAllCeremonyHistoryLoading,
    updateStatusInvoice,
    isLoadingUpdateStatusInvoice,
    isUpdateStatusInvoiceError,
    isUpdateStatusInvoiceSuccess,
  };
};
