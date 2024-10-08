import RegisterAdminRequest from "@/data/models/admin/request/add_admin_request";
import Admin from "@/data/models/admin/response/admin";

import ApiResponse from "@/data/models/base/api-base-response";
import ListDataRequest from "@/data/models/base/list_data_request";

export interface IAdminService {
  addAdmin(request: RegisterAdminRequest): Promise<ApiResponse<Admin>>;
  deleteAdmin({ id }: { id: number | string }): Promise<ApiResponse<null>>;
  getAllAdmin(request: ListDataRequest): Promise<ApiResponse<Admin[]>>;
}
