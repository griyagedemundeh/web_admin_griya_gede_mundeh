import MemberRequest from "@/data/models/member/request/member_request";
import { IMemberService } from "./member_service_interface";
import ApiResponse from "@/data/models/base/api-base-response";
import Member from "@/data/models/member/response/member";
import { AxiosError, AxiosResponse } from "axios";
import api from "@/configs/api";
import ListDataRequest from "@/data/models/base/list_data_request";
import User from "@/data/models/user/response/user";
import MemberAddress from "@/data/models/user/response/address";
import Address from "@/data/models/member/response/address";
import MemberAddressRequest from "@/data/models/member/request/member_address_request";

export class MemberService implements IMemberService {
  async addMember(request: MemberRequest): Promise<ApiResponse<Member>> {
    const uri = "admin/member/create";
    try {
      const response: AxiosResponse<ApiResponse<Member>> = await api.post(
        uri,
        request
      );
      return response.data;
    } catch (error: AxiosError<ApiResponse<Member>> | any) {
      console.error("==================================");
      console.error("Error ADD MEMBER -->", error.response.data.message);
      console.error("==================================");
      throw error.response.data.message;
    }
  }

  async deleteMember({
    id,
  }: {
    id: number | string;
  }): Promise<ApiResponse<null>> {
    const uri = `/admin/member/${id}`;

    try {
      const response: AxiosResponse<ApiResponse<null>> = await api.delete(uri);

      return response.data;
    } catch (error: AxiosError<ApiResponse<null>> | any) {
      console.error("====================================");
      console.error("ERROR DELETE Member --> ", error.response.data.message);
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  async editMember({
    id,
    request,
  }: {
    id: number | string;
    request: MemberRequest;
  }): Promise<ApiResponse<User | MemberAddress>> {
    const uri = `/admin/member/${id}`;

    try {
      const response: AxiosResponse<ApiResponse<User | MemberAddress>> =
        await api.patch(uri, request);

      return response.data;
    } catch (error: AxiosError<ApiResponse<User | MemberAddress>> | any) {
      console.error("====================================");
      console.error("ERROR EDIT MEMBER --> ", error.response.data.message);
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  async getAllMember(request: ListDataRequest): Promise<ApiResponse<Member[]>> {
    const uri = "/admin/member/";
    try {
      const response: AxiosResponse<ApiResponse<Member[]>> = await api.get(
        uri,
        {
          params: request,
        }
      );

      return response.data;
    } catch (error: AxiosError<ApiResponse<Member[]>> | any) {
      console.error("==================================");
      console.error("Error GET LIST MEMBER -->", error.response.data.message);
      console.error("==================================");
      throw error.response.data.message;
    }
  }

  //getMemberbyId
  async getMemberById(id: number | string): Promise<ApiResponse<Member>> {
    const uri = `/admin/member/${id}`;
    try {
      const response: AxiosResponse<ApiResponse<Member>> = await api.get(uri);
      return response.data;
    } catch (error: AxiosError<ApiResponse<Member>> | any) {
      console.error("==================================");
      console.error("Error GET MEMBER BY ID -->", error.response.data.message);
      console.error("==================================");
      throw error.response.data.message;
    }
  }

  async getListMemberAddress({
    userId,
  }: {
    userId: number | string;
  }): Promise<ApiResponse<Address[]>> {
    const uri = `/admin/member/address/${userId}`;
    try {
      const response: AxiosResponse<ApiResponse<Address[]>> = await api.get(
        uri
      );

      return response.data;
    } catch (error: AxiosError<ApiResponse<Address[]>> | any) {
      console.error("==================================");
      console.error(
        "Error GET MEMBER ADDRESS BY USERID -->",
        error.response.data.message
      );
      console.error("==================================");
      throw error.response.data.message;
    }
  }

  async createMemberAddress(
    request: MemberAddressRequest
  ): Promise<ApiResponse<MemberAddress>> {
    const uri = `admin/member/address/create/${request.userId}`;
    try {
      const response: AxiosResponse<ApiResponse<MemberAddress>> =
        await api.post(uri, request);
      return response.data;
    } catch (error: AxiosError<ApiResponse<MemberAddress>> | any) {
      console.error("==================================");
      console.error(
        "Error ADD MEMBER ADDRESS -->",
        error.response.data.message
      );
      console.error("==================================");
      throw error.response.data.message;
    }
  }

  async resendEmailVerification({
    id,
    request,
  }: {
    id: number;
    request: MemberRequest;
  }): Promise<ApiResponse<null>> {
    const uri = `admin/member/resend-verification/${id}`;
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
