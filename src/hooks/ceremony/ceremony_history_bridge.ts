import type ApiResponse from "@/data/models/base/api-base-response";
import type ListDataRequest from "@/data/models/base/list_data_request";
import CeremonyHistoryUpdateStatusRequest from "@/data/models/ceremony/request/ceremony_history_update_request";
import type CeremonyHistory from "@/data/models/ceremony/response/ceremony_history";
import CeremonyHistoryService from "@/data/services/ceremony/ceremony_history_service";
import type { AxiosError } from "axios";
import { useQuery, type UseQueryResult } from "react-query";

const ceremonyService = new CeremonyHistoryService();
const TAG_ERROR = "Error during :";

// UPDATE STATUS
export const updateStatusCeremonyHistory = async (
  request: CeremonyHistoryUpdateStatusRequest
): Promise<ApiResponse<null>> => {
  const response = await ceremonyService
    .updateStatusCeremonyHistory(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<null>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} UPDATE STATUS CEREMONY HISTORY `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

// GET DATA

export const getAllCeremonyHistory = async (
  request: ListDataRequest
): Promise<ApiResponse<CeremonyHistory[]>> => {
  const response = await ceremonyService
    .getAllCeremonyHistory(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<CeremonyHistory[]>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} GET ALL CEREMONY HISTORY `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const useGetAllCeremonyHistoryQuery = (
  request: ListDataRequest
): UseQueryResult<ApiResponse<CeremonyHistory[]>, unknown> =>
  useQuery("allCeremonyHistory", () => getAllCeremonyHistory(request));
