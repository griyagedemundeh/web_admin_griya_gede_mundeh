import api from "@/configs/api";
import ApiResponse from "@/data/models/base/api-base-response";
import { AxiosError, AxiosResponse } from "axios";
import ListDataRequest from "@/data/models/base/list_data_request";

import CeremonyCategoryRequest from "@/data/models/ceremony/request/ceremony_category_request";
import CeremonyCategory from "@/data/models/ceremony/response/ceremony_category";
import { ICeremonyCategoryService } from "./ceremony_category_service_interface";

export class CeremonyCategoryService implements ICeremonyCategoryService {
  BASE_CATEGORY_ENDPOINT: string = "/admin/ceremony/category";

  async addCeremonyCategory(
    request: CeremonyCategoryRequest
  ): Promise<ApiResponse<CeremonyCategory>> {
    const uri = `${this.BASE_CATEGORY_ENDPOINT}/create`;

    const data = new FormData();
    data.append("name", request.name);
    data.append("description", request.description);
    data.append("icon", request.icon as File);

    try {
      const response: AxiosResponse<ApiResponse<CeremonyCategory>> =
        await api.post(uri, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

      return response.data;
    } catch (error: AxiosError<ApiResponse<CeremonyCategory>> | any) {
      console.error("====================================");
      console.error(
        "ERROR ADD CEREMONY CATEGORY --> ",
        error.response.data.message
      );
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  async deleteCeremonyCategory({
    id,
  }: {
    id: number | string;
  }): Promise<ApiResponse<null>> {
    const uri = `${this.BASE_CATEGORY_ENDPOINT}/${id}`;

    try {
      const response: AxiosResponse<ApiResponse<null>> = await api.delete(uri);

      return response.data;
    } catch (error: AxiosError<ApiResponse<null>> | any) {
      console.error("====================================");
      console.error(
        "ERROR DELETE CEREMONY CATEGORY --> ",
        error.response.data.message
      );
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  async editCeremonyCategory({
    id,
    request,
  }: {
    id: number | string;
    request: CeremonyCategoryRequest;
  }): Promise<ApiResponse<CeremonyCategory>> {
    const uri = `${this.BASE_CATEGORY_ENDPOINT}/${id}`;

    const data = new FormData();
    data.append("name", request.name);
    data.append("description", request.description);

    if (request.icon) {
      data.append("icon", request.icon as File);
    }

    try {
      const response: AxiosResponse<ApiResponse<CeremonyCategory>> =
        await api.patch(uri, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

      return response.data;
    } catch (error: AxiosError<ApiResponse<CeremonyCategory>> | any) {
      console.error("====================================");
      console.error(
        "ERROR EDIT CEREMONY CATEGORY --> ",
        error.response.data.message
      );
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  async getAllCeremonyCategory(
    request: ListDataRequest
  ): Promise<ApiResponse<CeremonyCategory[]>> {
    const uri = this.BASE_CATEGORY_ENDPOINT;

    try {
      const response: AxiosResponse<ApiResponse<CeremonyCategory[]>> =
        await api.get(uri, {
          params: request,
        });

      return response.data;
    } catch (error: AxiosError<ApiResponse<CeremonyCategory[]>> | any) {
      console.error("====================================");
      console.error(
        "ERROR GET ALL CEREMONY CATEGORY --> ",
        error.response.data.message
      );
      console.error("====================================");
      throw error.response.data.message;
    }
  }
}
