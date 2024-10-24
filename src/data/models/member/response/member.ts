import MemberAddress from "../../user/response/address";
import Address from "../../user/response/address";
import User from "../../user/response/user";

type Member = {
  id: number;
  userId: number;
  role: "member";
  createdAt: string;
  updateAt: string;
  user: User;
  memberAddress: MemberAddress[];
};

export default Member;
