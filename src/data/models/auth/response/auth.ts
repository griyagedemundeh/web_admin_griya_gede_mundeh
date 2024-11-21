type Auth = {
  id: number;
  fullName: string;
  avatarUrl: string;
  email: string;
  phoneNumber: string;
  token: string;
  role: "superAdmin" | "admin";
};

export default Auth;
