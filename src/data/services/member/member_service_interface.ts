import ApiResponse from "@/data/models/base/api-base-response";
import ListDataRequest from "@/data/models/base/list_data_request";
import MemberAddressRequest from "@/data/models/member/request/member_address_request";
import MemberRequest from "@/data/models/member/request/member_request";
import Address from "@/data/models/member/response/address";
import Member from "@/data/models/member/response/member";
import MemberAddress from "@/data/models/user/response/address";
import User from "@/data/models/user/response/user";

export interface IMemberService {
  addMember(request: MemberRequest): Promise<ApiResponse<Member>>;
  deleteMember({ id }: { id: number | string }): Promise<ApiResponse<null>>;

  editMember({
    id,
    request,
  }: {
    id: number | string;
    request: MemberRequest;
  }): Promise<ApiResponse<User | MemberAddress>>;

  getAllMember(request: ListDataRequest): Promise<ApiResponse<Member[]>>;

  getListMemberAddress({
    userId,
  }: {
    userId: number | string;
  }): Promise<ApiResponse<Address[]>>;

  createMemberAddress(
    request: MemberAddressRequest
  ): Promise<ApiResponse<MemberAddress>>;

  resendEmailVerification({
    id,
    request,
  }: {
    id: number;
    request: MemberRequest;
  }): Promise<ApiResponse<null>>;
}
