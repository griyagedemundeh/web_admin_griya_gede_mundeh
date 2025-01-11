type Auth = {
  id: number;
  fullName: string;
  avatarUrl: string;
  email: string;
  phoneNumber: string;
  token: string;
  role: "superAdmin" | "admin";
  emailVerified: 0 | 1;
};

export default Auth;
