import { UseMutateFunction, useMutation } from "react-query";
import ApiResponse from "@/data/models/base/api-base-response";
import { AxiosError } from "axios";

import {
  addCeremonyCategory as addCeremonyCategoryBridge,
  deleteCeremonyCategory as deleteCeremonyCategoryBridge,
  editCeremonyCategory as editCeremonyCategoryBridge,
  useGetAllCeremonyCategoryQuery,
} from "./ceremony_bridge";
import { useCentralStore } from "@/store";
import { useEffect } from "react";
import CeremonyCategory from "@/data/models/ceremony/response/ceremony_category_response";
import CeremonyCategoryRequest from "@/data/models/ceremony/request/ceremony_category_request";
import { statusMessage } from "@/utils";

interface IUseCeremony {
  addCeremonyCategory: UseMutateFunction<
    ApiResponse<CeremonyCategory>,
    unknown,
    CeremonyCategoryRequest,
    unknown
  >;
  editCeremonyCategory: UseMutateFunction<
    ApiResponse<CeremonyCategory>,
    unknown,
    {
      id: number | string;
      request: CeremonyCategoryRequest;
    },
    unknown
  >;
  deleteCeremonyCategory: UseMutateFunction<
    ApiResponse<null>,
    unknown,
    {
      id: number | string;
    },
    unknown
  >;
  allCeremonyCategory: ApiResponse<CeremonyCategory[]> | undefined;
  isLoadingAddCeremonyCategory: boolean;
  isAddCeremonyCategorySuccess: boolean;
  isAddCeremonyCategoryError: boolean;
  isLoadingEditCeremonyCategory: boolean;
  isEditCeremonyCategorySuccess: boolean;
  isEditCeremonyCategoryError: boolean;
  isLoadingDeleteCeremonyCategory: boolean;
  isDeleteCeremonyCategorySuccess: boolean;
  isDeleteCeremonyCategoryError: boolean;
}

export const useCeremony = (): IUseCeremony => {
  const { setIsLoading } = useCentralStore();

  const {
    data: allCeremonyCategory,
    isLoading: isAllCeremonyCategoryLoading,
    isError: isAllCeremonyCategoryError,
    error: errorAllCeremonyCategory,
    refetch: refecthAllCeremonyCategory,
  } = useGetAllCeremonyCategoryQuery({ limit: 100, page: 1 });

  // ADD
  const {
    mutate: addCeremonyCategory,
    isLoading: isLoadingAddCeremonyCategory,
    isSuccess: isAddCeremonyCategorySuccess,
    isError: isAddCeremonyCategoryError,
  } = useMutation(addCeremonyCategoryBridge, {
    onSuccess: async (value) => {
      statusMessage({ message: value.message, status: "success" });

      setIsLoading(false);
      window.location.reload();
    },
    onError: async (
      error: AxiosError<ApiResponse<CeremonyCategory>> | unknown
    ) => {
      setIsLoading(false);
      statusMessage({ message: error, status: "error" });
    },
  });

  // EDIT
  const {
    mutate: editCeremonyCategory,
    isLoading: isLoadingEditCeremonyCategory,
    isSuccess: isEditCeremonyCategorySuccess,
    isError: isEditCeremonyCategoryError,
  } = useMutation(editCeremonyCategoryBridge, {
    onSuccess: async (value) => {
      statusMessage({ message: value.message, status: "success" });

      setIsLoading(false);
      window.location.reload();
    },
    onError: async (
      error: AxiosError<ApiResponse<CeremonyCategory>> | unknown
    ) => {
      setIsLoading(false);
      statusMessage({ message: error, status: "error" });
    },
  });

  // DELETE
  const {
    mutate: deleteCeremonyCategory,
    isLoading: isLoadingDeleteCeremonyCategory,
    isSuccess: isDeleteCeremonyCategorySuccess,
    isError: isDeleteCeremonyCategoryError,
  } = useMutation(deleteCeremonyCategoryBridge, {
    onSuccess: async (value) => {
      refecthAllCeremonyCategory();

      statusMessage({ message: value.message, status: "success" });

      setIsLoading(false);

      window.location.reload();
    },
    onError: async (error: AxiosError<ApiResponse<null>> | unknown) => {
      setIsLoading(false);
      statusMessage({ message: error, status: "error" });
    },
  });

  //
  useEffect(() => {
    setIsLoading(isAllCeremonyCategoryLoading);

    if (isAllCeremonyCategoryError) {
      statusMessage({ message: errorAllCeremonyCategory, status: "error" });
    }
  }, [isAllCeremonyCategoryLoading, isAllCeremonyCategoryError]);

  return {
    addCeremonyCategory,
    allCeremonyCategory,
    isLoadingAddCeremonyCategory,
    isAddCeremonyCategorySuccess,
    isAddCeremonyCategoryError,
    editCeremonyCategory,
    isEditCeremonyCategoryError,
    isEditCeremonyCategorySuccess,
    isLoadingEditCeremonyCategory,
    deleteCeremonyCategory,
    isDeleteCeremonyCategoryError,
    isDeleteCeremonyCategorySuccess,
    isLoadingDeleteCeremonyCategory,
  };
};
