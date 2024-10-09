import AdminRequest from "@/data/models/admin/request/admin_request";
import Admin from "@/data/models/admin/response/admin";
import ApiResponse from "@/data/models/base/api-base-response";
import ListDataRequest from "@/data/models/base/list_data_request";
import User from "@/data/models/user/response/user";

export interface IAdminService {
  addAdmin(request: AdminRequest): Promise<ApiResponse<Admin>>;

  deleteAdmin({ id }: { id: number | string }): Promise<ApiResponse<null>>;

  editAdmin({
    id,
    request,
  }: {
    id: number | string;
    request: AdminRequest;
  }): Promise<ApiResponse<User>>;

  getAllAdmin(request: ListDataRequest): Promise<ApiResponse<Admin[]>>;
}
