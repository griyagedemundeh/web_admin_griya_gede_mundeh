import ApiResponse from "@/data/models/base/api-base-response";
import ListDataRequest from "@/data/models/base/list_data_request";
import CeremonyCategoryRequest from "@/data/models/ceremony/request/ceremony_category_request";
import CeremonyCategory from "@/data/models/ceremony/response/ceremony_category";
import { CeremonyCategoryService } from "@/data/services/ceremony/ceremony_category_service";
import { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";

const ceremonyService = new CeremonyCategoryService();
const TAG_ERROR = "Error during :";

// CATEGORY
export const addCeremonyCategory = async (
  request: CeremonyCategoryRequest
): Promise<ApiResponse<CeremonyCategory>> => {
  const response = await ceremonyService
    .addCeremonyCategory(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<CeremonyCategory>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} ADD CEREMONY CATEGORY `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const editCeremonyCategory = async ({
  id,
  request,
}: {
  id: number | string;
  request: CeremonyCategoryRequest;
}): Promise<ApiResponse<CeremonyCategory>> => {
  const response = await ceremonyService
    .editCeremonyCategory({ id, request })
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<CeremonyCategory>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} EDIT CEREMONY CATEGORY `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const deleteCeremonyCategory = async ({
  id,
}: {
  id: number | string;
}): Promise<ApiResponse<null>> => {
  const response = await ceremonyService
    .deleteCeremonyCategory({ id })
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<null>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} DELETE CEREMONY CATEGORY `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

// GET DATA
export const getAllCeremonyCategory = async (
  request: ListDataRequest
): Promise<ApiResponse<CeremonyCategory[]>> => {
  const response = await ceremonyService
    .getAllCeremonyCategory(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<CeremonyCategory[]>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} GET ALL CEREMONY CATEGORY `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const useGetAllCeremonyCategoryQuery = (
  request: ListDataRequest
): UseQueryResult<ApiResponse<CeremonyCategory[]>, unknown> =>
  useQuery("allCeremonyCategory", () => getAllCeremonyCategory(request));
