type AdminRequest = {
  userId: number;
  fullName: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
  email: string;
  emailVerified?: 0 | 1;
};

export default AdminRequest;
