export type CeremonyPackage = {
  id: number | string;
  name: string;
  description: string;
  price: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
