type ProfileGriyaRequest = {
  name: string;
  email: string;
  phoneNumber: string;
  logo?: File | null;
  logoUrl?: string;
  address: string;
  about: string;
  vision: string;
  mission: string;
};

export default ProfileGriyaRequest;
