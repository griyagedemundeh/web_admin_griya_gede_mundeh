import api from "@/configs/api";
import ApiResponse from "@/data/models/base/api-base-response";
import { AxiosError, AxiosResponse } from "axios";
import ListDataRequest from "@/data/models/base/list_data_request";
import CeremonyRequest from "@/data/models/ceremony/request/ceremony_request";
import {
  Ceremony,
  CeremonyInList,
} from "@/data/models/ceremony/response/ceremony";
import { ICeremonyService } from "./ceremony_service_interface";
import CeremonyDocumentationRequest from "@/data/models/ceremony/request/ceremony_documentation_request";
import CeremonyDocumentation from "@/data/models/ceremony/response/ceremony_documentation";

export class CeremonyService implements ICeremonyService {
  BASE_ENDPOINT: string = "/admin/ceremony";

  async addCeremony(request: CeremonyRequest): Promise<ApiResponse<Ceremony>> {
    const uri = `${this.BASE_ENDPOINT}/create`;

    try {
      const response: AxiosResponse<ApiResponse<Ceremony>> = await api.post(
        uri,
        request
      );

      return response.data;
    } catch (error: AxiosError<ApiResponse<Ceremony>> | any) {
      console.error("====================================");
      console.error("ERROR ADD CEREMONY --> ", error.response.data.message);
      console.error("====================================");
      throw error.response.data.message;
    }
  }
  async getAllCeremony(
    request: ListDataRequest
  ): Promise<ApiResponse<CeremonyInList[]>> {
    const uri = `${this.BASE_ENDPOINT}`;

    try {
      const response: AxiosResponse<ApiResponse<CeremonyInList[]>> =
        await api.get(uri, { params: request });

      return response.data;
    } catch (error: AxiosError<ApiResponse<CeremonyInList[]>> | any) {
      console.error("====================================");
      console.error("ERROR GET ALL CEREMONY --> ", error.response.data.message);
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  // DOCUMENTATION
  async addDocumentation(
    request: CeremonyDocumentationRequest
  ): Promise<ApiResponse<CeremonyDocumentation>> {
    const uri = `${this.BASE_ENDPOINT}/documentation/create`;

    const data = new FormData();
    data.append("ceremonyServiceId", `${request.ceremonyServiceId}`);
    data.append("photo", request.photo as File);

    try {
      const response: AxiosResponse<ApiResponse<CeremonyDocumentation>> =
        await api.post(uri, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

      return response.data;
    } catch (error: AxiosError<ApiResponse<CeremonyDocumentation>> | any) {
      console.error("====================================");
      console.error(
        "ERROR ADD CEREMONY DOCUMENTATION --> ",
        error.response.data.message
      );
      console.error("====================================");
      throw error.response.data.message;
    }
  }
}
