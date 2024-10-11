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

export class CeremonyService implements ICeremonyService {
  BASE_ENDPOINT: string = "/ceremony";

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
}
