import ApiResponse from "@/data/models/base/api-base-response";
import ListDataRequest from "@/data/models/base/list_data_request";
import CeremonyHistory from "@/data/models/ceremony/response/ceremony_history";
import { ICeremonyHistoryService } from "./ceremony_history_service_interface";
import api from "@/configs/api";
import type { AxiosError, AxiosResponse } from "axios";
import CeremonyHistoryUpdateStatusRequest from "@/data/models/ceremony/request/ceremony_history_update_request";

class CeremonyHistoryService implements ICeremonyHistoryService {
  BASE_CATEGORY_ENDPOINT: string = "/admin/ceremony/history";

  async getAllCeremonyHistory(
    request: ListDataRequest
  ): Promise<ApiResponse<CeremonyHistory[]>> {
    const uri = `${this.BASE_CATEGORY_ENDPOINT}`;

    try {
      const response: AxiosResponse<ApiResponse<CeremonyHistory[]>> =
        await api.get(uri, { params: request });

      return response.data;
    } catch (error: AxiosError<ApiResponse<CeremonyHistory[]>> | any) {
      console.error("====================================");
      console.error(
        "ERROR GET ALL CEREMONY HISTORY --> ",
        error.response.data.message
      );
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  async updateStatusCeremonyHistory(
    request: CeremonyHistoryUpdateStatusRequest
  ): Promise<ApiResponse<null>> {
    const uri = `${this.BASE_CATEGORY_ENDPOINT}/${request.id}`;

    try {
      const response: AxiosResponse<ApiResponse<null>> = await api.patch(
        uri,
        request
      );

      return response.data;
    } catch (error: AxiosError<ApiResponse<null>> | any) {
      console.error("====================================");
      console.error(
        "ERROR UPDATE STATUS CEREMONY HISTORY --> ",
        error.response.data.message
      );
      console.error("====================================");
      throw error.response.data.message;
    }
  }
}

export default CeremonyHistoryService;
