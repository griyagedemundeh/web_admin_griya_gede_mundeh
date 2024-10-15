import CeremonyCategory from "./ceremony_category";

export type Ceremony = {
  id: number | string;
  ceremonyCategoryId: number | string;
  title: string;
  description: string;
};

// // Ceremony Category
// type CeremonyCategory = {
//   name: string;
// };

// Ceremony Package
type CeremonyPackage = {
  name?: string;
  description?: string;
  price?: number;
  isActive?: number | boolean;
};

// Ceremony Documentation
type CeremonyDocumentation = {
  id: number | string;
  photo: string;
  createdAt?: string;
  updatedAt?: string;
};

// Ceremony
export type CeremonyInList = {
  id: number;
  title: string;
  description: string;
  isActive: number | boolean;
  ceremonyCategory: CeremonyCategory;
  ceremonyPackages?: CeremonyPackage[] | undefined;
  ceremonyDocumentation?: CeremonyDocumentation[] | undefined;
};
