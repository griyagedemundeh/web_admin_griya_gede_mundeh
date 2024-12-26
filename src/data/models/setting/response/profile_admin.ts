type User = {
  id: number;
  avatarUrl: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type ProfileAdmin = {
  id: number;
  userId: number;
  role: string;
  createdAt: string;
  updatedAt: string;
  user: User;
};

export default ProfileAdmin;
