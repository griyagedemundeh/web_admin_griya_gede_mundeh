import ApiResponse from "@/data/models/base/api-base-response";
import ListDataRequest from "@/data/models/base/list_data_request";
import CeremonyHistoryUpdateStatusRequest from "@/data/models/ceremony/request/ceremony_history_update_request";
import CeremonyHistory from "@/data/models/ceremony/response/ceremony_history";

export interface ICeremonyHistoryService {
  getAllCeremonyHistory(
    request: ListDataRequest
  ): Promise<ApiResponse<CeremonyHistory[]>>;

  getAllCeremonyHistoryOnProgress(
    request: ListDataRequest
  ): Promise<ApiResponse<CeremonyHistory[]>>;

  updateStatusCeremonyHistory(
    request: CeremonyHistoryUpdateStatusRequest
  ): Promise<ApiResponse<null>>;
}
