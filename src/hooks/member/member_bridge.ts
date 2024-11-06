import ApiResponse from "@/data/models/base/api-base-response";
import ListDataRequest from "@/data/models/base/list_data_request";
import MemberRequest from "@/data/models/member/request/member_request";
import Address from "@/data/models/member/response/address";
import Member from "@/data/models/member/response/member";
import MemberAddress from "@/data/models/user/response/address";
import User from "@/data/models/user/response/user";
import { MemberService } from "@/data/services/member/member_service";
import { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";

const authService = new MemberService();
const TAG_ERROR = "Error during :";

export const addMember = async (
  request: MemberRequest
): Promise<ApiResponse<Member>> => {
  const response = await authService
    .addMember(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<Member>> | unknown) => {
      console.error("========================");
      console.error(`${TAG_ERROR} ADD MEMBER `, error);
      console.error("========================");
      throw error;
    });
  return response;
};

export const editMember = async ({
  id,
  request,
}: {
  id: number | string;
  request: MemberRequest;
}): Promise<ApiResponse<User | MemberAddress>> => {
  //NEWW
  // }): Promise<ApiResponse<Member>> => {
  const response = await authService
    .editMember({ id, request })
    .then(async (value) => {
      return value;
    })
    //NEWW
    // .catch((error: AxiosError<ApiResponse<Member>> | unknown) => {
    .catch((error: AxiosError<ApiResponse<User | MemberAddress>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} EDIT Member `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const deleteMember = async ({
  id,
}: {
  id: number | string;
}): Promise<ApiResponse<null>> => {
  const response = await authService
    .deleteMember({ id })
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<null>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} DELETE MEMBER `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const getAllMember = async (
  request: ListDataRequest
): Promise<ApiResponse<Member[]>> => {
  const response = await authService
    .getAllMember(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<Member[]>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} GET ALL MEMBER `, error);
      console.error("====================================");
      throw error;
    });
  return response;
};

//GetDetailMemberQuery
export const getMemberById = async (
  id: number | string
): Promise<ApiResponse<Member>> => {
  const response = await authService
    .getMemberById(id)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<Member>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} GET MEMBER BY ID `, error);
      console.error("====================================");
      throw error;
    });
  return response;
};

export const useGetAllMemberQuery = (
  request: ListDataRequest
): UseQueryResult<ApiResponse<Member[]>, unknown> =>
  useQuery("allMember", () => getAllMember(request));

export const getMemberAddress = async ({
  userId,
}: {
  userId: number | string;
}): Promise<ApiResponse<Address[]>> => {
  const response = await authService
    .getListMemberAddress({ userId })
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<Address[]>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} GET ALL MEMBER ADDRESS `, error);
      console.error("====================================");
      throw error;
    });
  return response;
};

export const useGetMemberAddressQuery = ({
  userId,
}: {
  userId: number | string;
}): UseQueryResult<ApiResponse<Address[]>, unknown> =>
  useQuery(`memberAddress_${userId}`, () => getMemberAddress({ userId }));
