import ApiResponse from "@/data/models/base/api-base-response";
import ListDataRequest from "@/data/models/base/list_data_request";
import CeremonyCategoryRequest from "@/data/models/ceremony/request/ceremony_category_request";
import CeremonyCategory from "@/data/models/ceremony/response/ceremony_category";

export interface ICeremonyCategoryService {
  // Ceremony Category
  addCeremonyCategory(
    request: CeremonyCategoryRequest
  ): Promise<ApiResponse<CeremonyCategory>>;

  deleteCeremonyCategory({
    id,
  }: {
    id: number | string;
  }): Promise<ApiResponse<null>>;

  editCeremonyCategory({
    id,
    request,
  }: {
    id: number | string;
    request: CeremonyCategoryRequest;
  }): Promise<ApiResponse<CeremonyCategory>>;

  getAllCeremonyCategory(
    request: ListDataRequest
  ): Promise<ApiResponse<CeremonyCategory[]>>;
}
