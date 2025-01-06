import ApiResponse from "@/data/models/base/api-base-response";
import ProfileGriyaRequest from "@/data/models/setting/request/profile_griya_request";
import ProfileGriya from "@/data/models/setting/response/profile_griya";
import { ISettingService } from "./setting_service_interface";
import type { AxiosError, AxiosResponse } from "axios";
import api from "@/configs/api";
import ProfileAdmin from "@/data/models/setting/response/profile_admin";
import ProfileAdminRequest from "@/data/models/setting/request/profila_admin_request";

export class SettingService implements ISettingService {
  private readonly uri = "griya-profile";
  private readonly uriAdmin = "admin";

  async getProfileGriya(): Promise<ApiResponse<ProfileGriya>> {
    try {
      const response: AxiosResponse<ApiResponse<ProfileGriya>> = await api.get(
        this.uri
      );
      return response.data;
    } catch (error: AxiosError<ApiResponse<ProfileGriya>> | any) {
      console.error("==================================");
      console.error("Error PROFILE GRIYA -->", error.response.data.message);
      console.error("==================================");
      throw error.response.data.message;
    }
  }
  async updateProfileGriya(
    request: ProfileGriyaRequest
  ): Promise<ApiResponse<ProfileGriya>> {
    const data = new FormData();
    data.append("name", request.name);
    data.append("about", request.about);
    data.append("address", request.address);
    data.append("email", request.email);
    data.append("mission", request.mission);
    data.append("vision", request.vision);
    data.append("phoneNumber", request.phoneNumber);

    if (request.logo) {
      data.append("logo", request.logo as File);
    }

    try {
      const response: AxiosResponse<ApiResponse<ProfileGriya>> =
        await api.patch(`${this.uri}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      return response.data;
    } catch (error: AxiosError<ApiResponse<ProfileGriya>> | any) {
      console.error("==================================");
      console.error(
        "Error UPDATE PROFILE GRIYA -->",
        error.response.data.message
      );
      console.error("==================================");
      throw error.response.data.message;
    }
  }

  async getProfileAdmin({
    id,
  }: {
    id: number;
  }): Promise<ApiResponse<ProfileAdmin>> {
    try {
      const response: AxiosResponse<ApiResponse<ProfileAdmin>> = await api.get(
        `${this.uriAdmin}/${id}`
      );
      return response.data;
    } catch (error: AxiosError<ApiResponse<ProfileAdmin>> | any) {
      console.error("==================================");
      console.error("Error PROFILE ADMIN -->", error.response.data.message);
      console.error("==================================");
      throw error.response.data.message;
    }
  }

  async updateProfileAdmin(
    request: ProfileAdminRequest
  ): Promise<ApiResponse<ProfileAdmin>> {
    try {
      const response: AxiosResponse<ApiResponse<ProfileAdmin>> =
        await api.patch(`${this.uriAdmin}/${request.id}`, request);
      return response.data;
    } catch (error: AxiosError<ApiResponse<ProfileAdmin>> | any) {
      console.error("==================================");
      console.error(
        "Error UPDATE PROFILE ADMIN -->",
        error.response.data.message
      );
      console.error("==================================");
      throw error.response.data.message;
    }
  }
}
