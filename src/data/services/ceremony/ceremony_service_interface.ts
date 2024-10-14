import ApiResponse from "@/data/models/base/api-base-response";
import ListDataRequest from "@/data/models/base/list_data_request";
import CeremonyCategoryRequest from "@/data/models/ceremony/request/ceremony_category_request";
import CeremonyRequest from "@/data/models/ceremony/request/ceremony_request";
import {
  Ceremony,
  CeremonyInList,
} from "@/data/models/ceremony/response/ceremony";
import CeremonyCategory from "@/data/models/ceremony/response/ceremony_category";

export interface ICeremonyService {
  // Ceremony
  addCeremony(request: CeremonyRequest): Promise<ApiResponse<Ceremony>>;

  getAllCeremony(
    request: ListDataRequest
  ): Promise<ApiResponse<CeremonyInList[]>>;
}
