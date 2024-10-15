export type CeremonyPackage = {
  id: number | string;
  name: string;
  description: string;
  price: number;
  ceremonyServiceId: number | string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
