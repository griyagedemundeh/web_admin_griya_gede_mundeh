import ApiResponse from "@/data/models/base/api-base-response";
import ListDataRequest from "@/data/models/base/list_data_request";
import CeremonyDocumentationRequest from "@/data/models/ceremony/request/ceremony_documentation_request";
import { CeremonyPackagesRequest } from "@/data/models/ceremony/request/ceremony_package_request";
import CeremonyRequest from "@/data/models/ceremony/request/ceremony_request";
import {
  Ceremony,
  CeremonyInList,
} from "@/data/models/ceremony/response/ceremony";
import CeremonyDocumentation from "@/data/models/ceremony/response/ceremony_documentation";
import { CeremonyPackage } from "@/data/models/ceremony/response/ceremony_package";
import { CeremonyService } from "@/data/services/ceremony/ceremony_service";
import { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";

const ceremonyService = new CeremonyService();
const TAG_ERROR = "Error during :";

export const addCeremony = async (
  request: CeremonyRequest
): Promise<ApiResponse<Ceremony>> => {
  const response = await ceremonyService
    .addCeremony(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<Ceremony>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} ADD CEREMONY `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const getAllCeremony = async (
  request: ListDataRequest
): Promise<ApiResponse<CeremonyInList[]>> => {
  const response = await ceremonyService
    .getAllCeremony(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<CeremonyInList[]>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} GET ALL CEREMONY`, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const deleteCeremony = async ({
  id,
}: {
  id: number | string;
}): Promise<ApiResponse<null>> => {
  const response = await ceremonyService
    .deleteCeremony({ id: id })
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<null>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} DELETE CEREMONY `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const editCeremony = async ({
  id,
  request,
}: {
  id: number | string;
  request: CeremonyRequest;
}): Promise<ApiResponse<Ceremony>> => {
  const response = await ceremonyService
    .editCeremony({ id, request })
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<Ceremony>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} EDIT CEREMONY `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const useGetAllCeremonyQuery = (
  request: ListDataRequest
): UseQueryResult<ApiResponse<CeremonyInList[]>, unknown> =>
  useQuery("allCeremony", () => getAllCeremony(request));

// DOCUMENTATION
export const addCeremonyDocumentation = async (
  request: CeremonyDocumentationRequest
): Promise<ApiResponse<CeremonyDocumentation>> => {
  const response = await ceremonyService
    .addDocumentation(request)
    .then(async (value) => {
      return value;
    })
    .catch(
      (error: AxiosError<ApiResponse<CeremonyDocumentation>> | unknown) => {
        console.error("====================================");
        console.error(`${TAG_ERROR} ADD CEREMONY DOCUMENTATION `, error);
        console.error("====================================");
        throw error;
      }
    );

  return response;
};
export const editDocumentation = async ({
  id,
  request,
}: {
  id: number | string;
  request: CeremonyDocumentationRequest;
}): Promise<ApiResponse<CeremonyDocumentation>> => {
  const response = await ceremonyService
    .editDocumentation({ id, request })
    .then(async (value) => {
      return value;
    })
    .catch(
      (error: AxiosError<ApiResponse<CeremonyDocumentation>> | unknown) => {
        console.error("====================================");
        console.error(`${TAG_ERROR} EDIT CEREMONY DOCUMENTATION `, error);
        console.error("====================================");
        throw error;
      }
    );

  return response;
};

// PACKAGE
export const addCeremonyPackages = async (
  request: CeremonyPackagesRequest
): Promise<ApiResponse<CeremonyPackage[]>> => {
  const response = await ceremonyService
    .addPackages(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<CeremonyPackage[]>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} ADD CEREMONY PACKAGE `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const editCeremonyPackages = async (
  request: CeremonyPackagesRequest
): Promise<ApiResponse<CeremonyPackage[]>> => {
  const response = await ceremonyService
    .editPackages(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<CeremonyPackage[]>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} EDIT CEREMONY PACKAGE `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const deleteCeremonyPackage = async ({
  id,
}: {
  id: number | string;
}): Promise<ApiResponse<null>> => {
  const response = await ceremonyService
    .deletePackage({ id: id })
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<null>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} DELETE PACKAGE `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const getPackageByCeremonyServiceId = async ({
  ceremonyServiceId,
}: {
  ceremonyServiceId: number | string;
}): Promise<ApiResponse<CeremonyPackage[]>> => {
  const response = await ceremonyService
    .getPackageByCeremonyServiceId({ ceremonyServiceId: ceremonyServiceId })
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<CeremonyPackage[]>> | unknown) => {
      console.error("====================================");
      console.error(
        `${TAG_ERROR} GET ALL CEREMONY PACAKAGE BY CEREMONY PACKAGE ID`,
        error
      );
      console.error("====================================");
      throw error;
    });

  return response;
};

export const useGetCeremonyPackageByCeremonyServiceIdQuery = ({
  ceremonyServiceId,
}: {
  ceremonyServiceId: number | string;
}): UseQueryResult<ApiResponse<CeremonyPackage[]>, unknown> =>
  useQuery(
    `ceremonyPackage_${ceremonyServiceId}`,
    () =>
      getPackageByCeremonyServiceId({ ceremonyServiceId: ceremonyServiceId }),
    { enabled: false }
  );
