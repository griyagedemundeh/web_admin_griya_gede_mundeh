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

export interface ICeremonyService {
  // Ceremony
  addCeremony(request: CeremonyRequest): Promise<ApiResponse<Ceremony>>;

  getAllCeremony(
    request: ListDataRequest
  ): Promise<ApiResponse<CeremonyInList[]>>;

  // Documentation
  addDocumentation(
    request: CeremonyDocumentationRequest
  ): Promise<ApiResponse<CeremonyDocumentation>>;

  // Package
  addPackages(
    request: CeremonyPackagesRequest
  ): Promise<ApiResponse<CeremonyPackage[]>>;
}
