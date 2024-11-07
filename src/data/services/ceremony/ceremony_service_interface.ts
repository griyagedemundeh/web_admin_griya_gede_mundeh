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

  deleteCeremony({ id }: { id: number | string }): Promise<ApiResponse<null>>;

  editCeremony({
    id,
    request,
  }: {
    id: number | string;
    request: CeremonyRequest;
  }): Promise<ApiResponse<Ceremony>>;

  // Documentation
  addDocumentation(
    request: CeremonyDocumentationRequest
  ): Promise<ApiResponse<CeremonyDocumentation>>;
  editDocumentation({
    id,
    request,
  }: {
    id: number | string;
    request: CeremonyDocumentationRequest;
  }): Promise<ApiResponse<CeremonyDocumentation>>;

  // Package
  addPackages(
    request: CeremonyPackagesRequest
  ): Promise<ApiResponse<CeremonyPackage[]>>;
  editPackages(
    request: CeremonyPackagesRequest
  ): Promise<ApiResponse<CeremonyPackage[]>>;
  deletePackage({ id }: { id: number | string }): Promise<ApiResponse<null>>;
  getPackageByCeremonyServiceId({
    ceremonyServiceId,
  }: {
    ceremonyServiceId: number | string;
  }): Promise<ApiResponse<CeremonyPackage[]>>;
}
