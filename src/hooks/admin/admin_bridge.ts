import AddAdminRequest from "@/data/models/admin/request/add_admin_request";
import Admin from "@/data/models/admin/response/admin";
import ApiResponse from "@/data/models/base/api-base-response";
import { AdminService } from "@/data/repositories/admin/admin_service";
import { AxiosError } from "axios";

const auth_service = new AdminService();
const TAG_ERROR = "Error during :";

export const addAdmin = async (
  request: AddAdminRequest
): Promise<ApiResponse<Admin>> => {
  const response = await auth_service
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
