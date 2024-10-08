import User from "../../user/response/user";

type Admin = {
  id: number;
  userId: number;
  role: "Super Admin" | "Admin" | "Member";
  createdAt: string;
  updatedAt: string;
  user: User;
};

export default Admin;
