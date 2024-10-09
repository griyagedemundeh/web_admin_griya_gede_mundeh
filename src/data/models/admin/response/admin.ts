import User from "../../user/response/user";

type Admin = {
  id: number;
  userId: number;
  role: "superAdmin" | "admin" | "member";
  createdAt: string;
  updatedAt: string;
  user: User;
};

export default Admin;
