import type ApiResponse from "@/data/models/base/api-base-response";
import {
  useGetAllCeremonyHistoryQuery,
  useGetAllCeremonyHistoryOnProgressQuery,
  updateStatusCeremonyHistory as updateStatusCeremonyHistoryBridge,
} from "./ceremony_history_bridge";
import type CeremonyHistory from "@/data/models/ceremony/response/ceremony_history";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCentralStore } from "@/store";
import { showToast, statusMessage } from "@/utils";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  type UseMutateFunction,
  useMutation,
} from "react-query";
import type { AxiosError } from "axios";
import type CeremonyHistoryUpdateStatusRequest from "@/data/models/ceremony/request/ceremony_history_update_request";
import ListDataRequest from "@/data/models/base/list_data_request";

interface IUseCeremonyHistory {
  allCeremonyHistory: ApiResponse<CeremonyHistory[]> | undefined;
  refetchAllCeremonyHistory: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<ApiResponse<CeremonyHistory[]>, unknown>>;

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

  filter: ListDataRequest;
  setFilter: Dispatch<SetStateAction<ListDataRequest>>;
}

export const useCeremonyHistory = (): IUseCeremonyHistory => {
  const { setIsLoading } = useCentralStore();

  const [filter, setFilter] = useState<ListDataRequest>({
    page: 1,
    limit: 10,
    search: "",
  });

  const {
    data: allCeremonyHistory,
    isLoading: isAllCeremonyHistoryLoading,
    isError: isAllCeremonyHistoryError,
    error: errorAllCeremonyHistory,
    refetch: refetchAllCeremonyHistory,
  } = useGetAllCeremonyHistoryQuery(filter);

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
    setIsLoading(isAllCeremonyHistoryLoading);

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
    refetchAllCeremonyHistory,
    isAllCeremonyHistoryError,
    isAllCeremonyHistoryLoading,
    updateStatusCeremonyHistory,
    isLoadingUpdateStatusCeremonyHistory,
    isUpdateStatusCeremonyHistoryError,
    isUpdateStatusCeremonyHistorySuccess,

    allCeremonyHistoryOnProgress,
    isAllCeremonyHistoryOnProgressError,
    isAllCeremonyHistoryOnProgressLoading,

    filter,
    setFilter,
  };
};
