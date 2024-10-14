import { UseMutateFunction, useMutation } from "react-query";
import ApiResponse from "@/data/models/base/api-base-response";
import { AxiosError } from "axios";

import {
  addCeremony as addCeremonyBridge,
  // deleteCeremony as deleteCeremonyBridge,
  // editCeremony as editCeremonyBridge,
  useGetAllCeremonyQuery,
} from "./ceremony_bridge";
import { useCentralStore } from "@/store";
import { useEffect } from "react";
import { Ceremony } from "@/data/models/ceremony/response/ceremony";
import CeremonyRequest from "@/data/models/ceremony/request/ceremony_request";
import { statusMessage } from "@/utils";
import { CeremonyInList } from "@/data/models/ceremony/response/ceremony";

interface IUseCeremony {
  addCeremony: UseMutateFunction<
    ApiResponse<Ceremony>,
    unknown,
    CeremonyRequest,
    unknown
  >;
  // editCeremony: UseMutateFunction<
  //   ApiResponse<Ceremony>,
  //   unknown,
  //   {
  //     id: number | string;
  //     request: CeremonyRequest;
  //   },
  //   unknown
  // >;
  // deleteCeremony: UseMutateFunction<
  //   ApiResponse<null>,
  //   unknown,
  //   {
  //     id: number | string;
  //   },
  //   unknown
  // >;
  allCeremony: ApiResponse<CeremonyInList[]> | undefined;
  isLoadingAddCeremony: boolean;
  isAddCeremonySuccess: boolean;
  isAddCeremonyError: boolean;
  // isLoadingEditCeremony: boolean;
  // isEditCeremonySuccess: boolean;
  // isEditCeremonyError: boolean;
  // isLoadingDeleteCeremony: boolean;
  // isDeleteCeremonySuccess: boolean;
  // isDeleteCeremonyError: boolean;
}

export const useCeremony = (): IUseCeremony => {
  const { setIsLoading } = useCentralStore();

  const {
    data: allCeremony,
    isLoading: isAllCeremonyLoading,
    isError: isAllCeremonyError,
    error: errorAllCeremony,
    refetch: refecthAllCeremony,
  } = useGetAllCeremonyQuery({ limit: 100, page: 1 });

  // ADD
  const {
    mutate: addCeremony,
    isLoading: isLoadingAddCeremony,
    isSuccess: isAddCeremonySuccess,
    isError: isAddCeremonyError,
  } = useMutation(addCeremonyBridge, {
    onSuccess: async (value) => {
      statusMessage({ message: value.message, status: "success" });

      setIsLoading(false);
      // window.location.reload();
    },
    onError: async (error: AxiosError<ApiResponse<Ceremony>> | unknown) => {
      setIsLoading(false);
      statusMessage({ message: error, status: "error" });
    },
  });

  // EDIT
  // const {
  //   mutate: editCeremony,
  //   isLoading: isLoadingEditCeremony,
  //   isSuccess: isEditCeremonySuccess,
  //   isError: isEditCeremonyError,
  // } = useMutation(editCeremonyBridge, {
  //   onSuccess: async (value) => {
  //     statusMessage({ message: value.message, status: "success" });

  //     setIsLoading(false);
  //     window.location.reload();
  //   },
  //   onError: async (
  //     error: AxiosError<ApiResponse<Ceremony>> | unknown
  //   ) => {
  //     setIsLoading(false);
  //     statusMessage({ message: error, status: "error" });
  //   },
  // });

  // DELETE
  // const {
  //   mutate: deleteCeremony,
  //   isLoading: isLoadingDeleteCeremony,
  //   isSuccess: isDeleteCeremonySuccess,
  //   isError: isDeleteCeremonyError,
  // } = useMutation(deleteCeremonyBridge, {
  //   onSuccess: async (value) => {
  //     refecthAllCeremony();

  //     statusMessage({ message: value.message, status: "success" });

  //     setIsLoading(false);

  //     window.location.reload();
  //   },
  //   onError: async (error: AxiosError<ApiResponse<null>> | unknown) => {
  //     setIsLoading(false);
  //     statusMessage({ message: error, status: "error" });
  //   },
  // });

  //
  useEffect(() => {
    setIsLoading(isAllCeremonyLoading);

    if (isAllCeremonyError) {
      statusMessage({ message: errorAllCeremony, status: "error" });
    }
  }, [isAllCeremonyLoading, isAllCeremonyError]);

  return {
    addCeremony,
    allCeremony,
    isLoadingAddCeremony,
    isAddCeremonySuccess,
    isAddCeremonyError,
    // editCeremony,
    // isEditCeremonyError,
    // isEditCeremonySuccess,
    // isLoadingEditCeremony,
    // deleteCeremony,
    // isDeleteCeremonyError,
    // isDeleteCeremonySuccess,
    // isLoadingDeleteCeremony,
  };
};
