import ApiResponse from "@/data/models/base/api-base-response";
import ListDataRequest from "@/data/models/base/list_data_request";
import CeremonyDocumentationRequest from "@/data/models/ceremony/request/ceremony_documentation_request";
import CeremonyRequest from "@/data/models/ceremony/request/ceremony_request";
import {
  Ceremony,
  CeremonyInList,
} from "@/data/models/ceremony/response/ceremony";
import CeremonyDocumentation from "@/data/models/ceremony/response/ceremony_documentation";
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
      console.error(`${TAG_ERROR} GET ALL CEREMONY CATEGORY `, error);
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
