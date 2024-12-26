type ProfileAdminRequest = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  oldPassword: string;
  password: string;
  passwordConfirm: string;
};

export default ProfileAdminRequest;
