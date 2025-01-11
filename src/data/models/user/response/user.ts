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
  address: string;
  emailVerified?: 0 | 1;
};

export default User;
