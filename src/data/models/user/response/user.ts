type User = {
  id: number;
  avatarUrl: string | null;
  fullName: string;
  email: string;
  phoneNumber: string;
  isActive: number;
  createdAt?: string;
  updatedAt?: string;
  role?: string | null;
};

export default User;
