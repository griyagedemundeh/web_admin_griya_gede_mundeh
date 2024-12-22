import ApiResponse from "@/data/models/base/api-base-response";
import ProfileGriyaRequest from "@/data/models/setting/request/profile_griya_request";
import ProfileGriya from "@/data/models/setting/response/profile_griya";

export interface ISettingService {
  getProfileGriya(): Promise<ApiResponse<ProfileGriya>>;
  updateProfileGriya(
    request: ProfileGriyaRequest
  ): Promise<ApiResponse<ProfileGriya>>;
}
