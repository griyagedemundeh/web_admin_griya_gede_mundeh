import ApiResponse from "@/data/models/base/api-base-response";
import ListDataRequest from "@/data/models/base/list_data_request";
import CeremonyDocumentationRequest from "@/data/models/ceremony/request/ceremony_documentation_request";

import CeremonyRequest from "@/data/models/ceremony/request/ceremony_request";
import {
  Ceremony,
  CeremonyInList,
} from "@/data/models/ceremony/response/ceremony";
import CeremonyDocumentation from "@/data/models/ceremony/response/ceremony_documentation";

export interface ICeremonyService {
  // Ceremony
  addCeremony(request: CeremonyRequest): Promise<ApiResponse<Ceremony>>;

  getAllCeremony(
    request: ListDataRequest
  ): Promise<ApiResponse<CeremonyInList[]>>;

  // documentation
  addDocumentation(
    request: CeremonyDocumentationRequest
  ): Promise<ApiResponse<CeremonyDocumentation>>;
}
