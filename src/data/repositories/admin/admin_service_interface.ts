import RegisterAdminRequest from "@/data/models/admin/request/add_admin_request";
import Admin from "@/data/models/admin/response/admin";

import ApiResponse from "@/data/models/base/api-base-response";

export interface IAdminService {
  addAdmin(request: RegisterAdminRequest): Promise<ApiResponse<Admin>>;
}
