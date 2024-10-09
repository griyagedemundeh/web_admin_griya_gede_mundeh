import AdminRequest from "@/data/models/admin/request/admin_request";
import Admin from "@/data/models/admin/response/admin";
import ApiResponse from "@/data/models/base/api-base-response";
import ListDataRequest from "@/data/models/base/list_data_request";
import User from "@/data/models/user/response/user";
import { AdminService } from "@/data/services/admin/admin_service";

import { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";

const authService = new AdminService();
const TAG_ERROR = "Error during :";

export const addAdmin = async (
  request: AdminRequest
): Promise<ApiResponse<Admin>> => {
  const response = await authService
    .addAdmin(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<Admin>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} ADD ADMIN `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const editAdmin = async ({
  id,
  request,
}: {
  id: number | string;
  request: AdminRequest;
}): Promise<ApiResponse<User>> => {
  const response = await authService
    .editAdmin({ id, request })
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<User>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} EDIT ADMIN `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const deleteAdmin = async ({
  id,
}: {
  id: number | string;
}): Promise<ApiResponse<null>> => {
  const response = await authService
    .deleteAdmin({ id })
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<null>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} DELETE ADMIN `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

// GET DATA
export const getAllAdmin = async (
  request: ListDataRequest
): Promise<ApiResponse<Admin[]>> => {
  const response = await authService
    .getAllAdmin(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<Admin[]>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} GET ALL ADMIN `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const useGetAllAdminQuery = (
  request: ListDataRequest
): UseQueryResult<ApiResponse<Admin[]>, unknown> =>
  useQuery("allAdmin", () => getAllAdmin(request));
