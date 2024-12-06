// Define the CeremonyCategory type
export type CeremonyCategory = {
  id: number;
  name: string;
  icon: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

// Define the CeremonyService type
export type CeremonyService = {
  ceremonyCategoryId: number;
  title: string;
  id: number;
  ceremonyCategory: CeremonyCategory;
};

// Define the CeremonyPackage type
export type CeremonyPackage = {
  name: string;
  id: number;
  ceremonyServiceId: number;
};

// Define the User type
export type User = {
  fullName: string;
  id: number;
};

// Define the CeremonyAdmin type
export type CeremonyAdmin = {
  userId: number;
  id: number;
  user: User;
};

// Define the CeremonyMember type
export type CeremonyMember = {
  userId: number;
  id: number;
  user: User;
};

// Define the CeremonyHistory type
export type CeremonyHistory = {
  id: number;
  adminId: number;
  memberId: number;
  memberAddressId: number;
  consultationId: number | null;
  ceremonyServiceId: number;
  ceremonyServicePackageId: number;
  title: string;
  packageName: string;
  description: string;
  note: string;
  ceremonyAddress: string;
  ceremonyAddressNote: string | null;
  ceremonyDate: string;
  status: "onProgress" | "onGoing" | "completed" | "cancel";
  createdAt: string;
  updatedAt: string;
  ceremonyPackage: CeremonyPackage;
  ceremonyAdmin: CeremonyAdmin;
  ceremonyMember: CeremonyMember;
  ceremonyService: CeremonyService;
};

export default CeremonyHistory;
