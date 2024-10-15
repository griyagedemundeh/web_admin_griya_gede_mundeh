import Address from "../../user/response/address";
import User from "../../user/response/user";

type Member = {
    id: number;
    userId: number;
    role: "member";
    createdAt: string;
    updateAt: string;
    user: User;
    memberAddress: Address
};

export default Member;