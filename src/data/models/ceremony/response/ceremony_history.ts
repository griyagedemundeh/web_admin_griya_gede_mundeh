export type CeremonyCategory = {
  id: number;
  name: string;
  icon: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CeremonyService = {
  ceremonyCategoryId: number;
  title: string;
  id: number;
  ceremonyCategory: CeremonyCategory;
};

export type CeremonyPackage = {
  ceremonyServiceId: number;
  name: string;
  id: number;
  ceremonyService: CeremonyService;
};

export type User = {
  fullName: string;
  id: number;
};

export type CeremonyAdmin = {
  userId: number;
  id: number;
  user: User;
};

export type CeremonyMember = {
  userId: number;
  id: number;
  user: User;
};

type CeremonyHistory = {
  id: number;
  adminId: number;
  memberId: number;
  memberAddressId: number;
  consultationId: number | null;
  ceremonyServicePackageId: number;
  title: string;
  packageName: string;
  description: string;
  note: string;
  ceremonyAddress: string;
  ceremonyAddressNote: string;
  ceremonyDate: string;
  status: "onProgress" | "onGoing" | "completed" | "cancel";
  createdAt: string;
  updatedAt: string;
  ceremonyAdmin: CeremonyAdmin;
  ceremonyMember: CeremonyMember;
  ceremonyPackage: CeremonyPackage;
};

export default CeremonyHistory;
