import api from "@/configs/api";
import AdminRequest from "@/data/models/admin/request/admin_request";
import ApiResponse from "@/data/models/base/api-base-response";
import { AxiosError, AxiosResponse } from "axios";
import { IAdminService } from "./admin_service_interface";
import Admin from "@/data/models/admin/response/admin";
import ListDataRequest from "@/data/models/base/list_data_request";
import User from "@/data/models/user/response/user";

export class AdminService implements IAdminService {
  async addAdmin(request: AdminRequest): Promise<ApiResponse<Admin>> {
    const uri = "/super-admin/admin/create";

    try {
      const response: AxiosResponse<ApiResponse<Admin>> = await api.post(
        uri,
        request
      );

      return response.data;
    } catch (error: AxiosError<ApiResponse<Admin>> | any) {
      console.error("====================================");
      console.error("ERROR ADD ADMIN --> ", error.response.data.message);
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  async deleteAdmin({
    id,
  }: {
    id: number | string;
  }): Promise<ApiResponse<null>> {
    const uri = `/super-admin/admin/${id}`;

    try {
      const response: AxiosResponse<ApiResponse<null>> = await api.delete(uri);

      return response.data;
    } catch (error: AxiosError<ApiResponse<null>> | any) {
      console.error("====================================");
      console.error("ERROR DELETE ADMIN --> ", error.response.data.message);
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  async editAdmin({
    id,
    request,
  }: {
    id: number | string;
    request: AdminRequest;
  }): Promise<ApiResponse<User>> {
    const uri = `/super-admin/admin/${id}`;

    try {
      const response: AxiosResponse<ApiResponse<User>> = await api.patch(
        uri,
        request
      );

      return response.data;
    } catch (error: AxiosError<ApiResponse<User>> | any) {
      console.error("====================================");
      console.error("ERROR EDIT ADMIN --> ", error.response.data.message);
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  async getAllAdmin(request: ListDataRequest): Promise<ApiResponse<Admin[]>> {
    const uri = "/super-admin/admin";

    try {
      const response: AxiosResponse<ApiResponse<Admin[]>> = await api.get(uri, {
        params: request,
      });

      return response.data;
    } catch (error: AxiosError<ApiResponse<Admin[]>> | any) {
      console.error("====================================");
      console.error("ERROR ADD ADMIN --> ", error.response.data.message);
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  async resendEmailVerification({
    id,
    request,
  }: {
    id: number;
    request: AdminRequest;
  }): Promise<ApiResponse<null>> {
    const uri = `/super-admin/admin/resend-verification/${id}`;
    try {
      const response: AxiosResponse<ApiResponse<null>> = await api.post(
        uri,
        request
      );
      return response.data;
    } catch (error: AxiosError<ApiResponse<null>> | any) {
      console.error("==================================");
      console.error(
        "Error RESEND EMAIL VERIFICATION -->",
        error.response.data.message
      );
      console.error("==================================");
      throw error.response.data.message;
    }
  }
}
