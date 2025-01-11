type MemberRequest = {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  passwordConfirm: string;
  emailVerified: 0 | 1;
};
export default MemberRequest;
