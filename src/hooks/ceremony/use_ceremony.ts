import { UseMutateFunction, useMutation } from "react-query";
import ApiResponse from "@/data/models/base/api-base-response";
import { AxiosError } from "axios";
import {
  addCeremony as addCeremonyBridge,
  addCeremonyDocumentation as addCeremonyDocumentationBridge,
  addCeremonyPackages as addCeremonyPackagesBridge,
  deleteCeremony as deleteCeremonyBridge,
  // editCeremony as editCeremonyBridge,
  useGetAllCeremonyQuery,
} from "./ceremony_bridge";
import { useCentralStore } from "@/store";
import { useEffect, useState } from "react";
import CeremonyRequest from "@/data/models/ceremony/request/ceremony_request";
import { statusMessage } from "@/utils";
import CeremonyDocumentationRequest from "@/data/models/ceremony/request/ceremony_documentation_request";
import CeremonyDocumentation from "@/data/models/ceremony/response/ceremony_documentation";
import { CeremonyPackage } from "@/data/models/ceremony/response/ceremony_package";
import { CeremonyPackagesRequest } from "@/data/models/ceremony/request/ceremony_package_request";
import {
  Ceremony,
  CeremonyInList,
} from "@/data/models/ceremony/response/ceremony";

interface IUseCeremony {
  addCeremony: UseMutateFunction<
    ApiResponse<Ceremony>,
    unknown,
    CeremonyRequest,
    unknown
  >;
  allCeremony: ApiResponse<CeremonyInList[]> | undefined;
  isLoadingAddCeremony: boolean;
  isAddCeremonySuccess: boolean;
  isAddCeremonyError: boolean;
  deleteCeremony: UseMutateFunction<
    ApiResponse<null>,
    unknown,
    {
      id: number | string;
    },
    unknown
  >;
  isLoadingDeleteCeremony: boolean;
  isDeleteCeremonySuccess: boolean;
  isDeleteCeremonyError: boolean;
  ceremony: Ceremony | undefined;

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

  // DOCUMENTATION
  addCeremonyDocumentation: UseMutateFunction<
    ApiResponse<CeremonyDocumentation>,
    unknown,
    CeremonyDocumentationRequest,
    unknown
  >;
  isLoadingAddCeremonyDocumentation: boolean;
  isAddCeremonyDocumentationSuccess: boolean;
  isAddCeremonyDocumentationError: boolean;

  // PACKAGE
  addCeremonyPackages: UseMutateFunction<
    ApiResponse<CeremonyPackage[]>,
    unknown,
    CeremonyPackagesRequest,
    unknown
  >;
  isLoadingAddCeremonyPackages: boolean;
  isAddCeremonyPackagesSuccess: boolean;
  isAddCeremonyPackagesError: boolean;

  // isLoadingEditCeremony: boolean;
  // isEditCeremonySuccess: boolean;
  // isEditCeremonyError: boolean;
}

export const useCeremony = (): IUseCeremony => {
  const { setIsLoading } = useCentralStore();

  const [ceremony, setCeremony] = useState<Ceremony>();

  const {
    data: allCeremony,
    isLoading: isAllCeremonyLoading,
    isError: isAllCeremonyError,
    error: errorAllCeremony,
    refetch: refecthAllCeremony,
  } = useGetAllCeremonyQuery({ limit: 100, page: 1 });

  // CEREMONY
  const {
    mutate: addCeremony,
    isLoading: isLoadingAddCeremony,
    isSuccess: isAddCeremonySuccess,
    isError: isAddCeremonyError,
  } = useMutation(addCeremonyBridge, {
    onSuccess: async (value) => {
      setCeremony(value.data);

      statusMessage({ message: value.message, status: "success" });

      setIsLoading(false);
    },
    onError: async (error: AxiosError<ApiResponse<Ceremony>> | unknown) => {
      setIsLoading(false);
      statusMessage({ message: error, status: "error" });
    },
  });

  const {
    mutate: deleteCeremony,
    isLoading: isLoadingDeleteCeremony,
    isSuccess: isDeleteCeremonySuccess,
    isError: isDeleteCeremonyError,
  } = useMutation(deleteCeremonyBridge, {
    onSuccess: async (value) => {
      refecthAllCeremony();

      statusMessage({ message: value.message, status: "success" });

      setIsLoading(false);

      window.location.reload();
    },
    onError: async (error: AxiosError<ApiResponse<null>> | unknown) => {
      setIsLoading(false);
      statusMessage({ message: error, status: "error" });
    },
  });

  // DOCUMENTATION
  const {
    mutate: addCeremonyDocumentation,
    isLoading: isLoadingAddCeremonyDocumentation,
    isSuccess: isAddCeremonyDocumentationSuccess,
    isError: isAddCeremonyDocumentationError,
  } = useMutation(addCeremonyDocumentationBridge, {
    onSuccess: async (value) => {
      statusMessage({ message: value.message, status: "success" });

      setIsLoading(false);
    },
    onError: async (
      error: AxiosError<ApiResponse<CeremonyDocumentation>> | unknown
    ) => {
      setIsLoading(false);
      statusMessage({ message: error, status: "error" });
    },
  });

  // PACKAGES
  const {
    mutate: addCeremonyPackages,
    isLoading: isLoadingAddCeremonyPackages,
    isSuccess: isAddCeremonyPackagesSuccess,
    isError: isAddCeremonyPackagesError,
  } = useMutation(addCeremonyPackagesBridge, {
    onSuccess: async (value) => {
      statusMessage({ message: value.message, status: "success" });
      setIsLoading(false);
      window.location.reload();
    },
    onError: async (
      error: AxiosError<ApiResponse<CeremonyPackage[]>> | unknown
    ) => {
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
    // CEREMONY
    addCeremony,
    allCeremony,
    isLoadingAddCeremony,
    isAddCeremonySuccess,
    isAddCeremonyError,
    ceremony,
    deleteCeremony,
    isDeleteCeremonyError,
    isDeleteCeremonySuccess,
    isLoadingDeleteCeremony,

    // DOCUMENTATION
    addCeremonyDocumentation,
    isAddCeremonyDocumentationError,
    isAddCeremonyDocumentationSuccess,
    isLoadingAddCeremonyDocumentation,

    // PACKAGES
    addCeremonyPackages,
    isAddCeremonyPackagesError,
    isAddCeremonyPackagesSuccess,
    isLoadingAddCeremonyPackages,

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
