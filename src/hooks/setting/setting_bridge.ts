import type ApiResponse from "@/data/models/base/api-base-response";
import ProfileGriyaRequest from "@/data/models/setting/request/profile_griya_request";
import ProfileAdmin from "@/data/models/setting/response/profile_admin";
import ProfileGriya from "@/data/models/setting/response/profile_griya";
import { SettingService } from "@/data/services/setting/setting_service";
import type { AxiosError } from "axios";
import { useQuery, type UseQueryResult } from "react-query";

const settingService = new SettingService();
const TAG_ERROR = "Error during :";

// UPDATE
export const updateProfileGriya = async (
  request: ProfileGriyaRequest
): Promise<ApiResponse<ProfileGriya>> => {
  const response = await settingService
    .updateProfileGriya(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<ProfileGriya>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} UPDATE PROFILE GRIYA `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

// GET DATA
export const getProfileGriya = async (): Promise<ApiResponse<ProfileGriya>> => {
  const response = await settingService
    .getProfileGriya()
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<ProfileGriya>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} GET PROFILE GRIYA `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const useGetProfileGriyaQuery = (): UseQueryResult<
  ApiResponse<ProfileGriya>,
  unknown
> => useQuery("allProfileGriya", () => getProfileGriya());

// GET DATA ADMIN
export const getProfileAdmin = async ({
  id,
}: {
  id: number;
}): Promise<ApiResponse<ProfileAdmin>> => {
  const response = await settingService
    .getProfileAdmin({ id })
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<ProfileAdmin>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} GET PROFILE ADMIN `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const useGetProfileAdminQuery = ({
  id,
}: {
  id: number;
}): UseQueryResult<ApiResponse<ProfileAdmin>, unknown> =>
  useQuery("allProfileAdmin", () => getProfileAdmin({ id }));
