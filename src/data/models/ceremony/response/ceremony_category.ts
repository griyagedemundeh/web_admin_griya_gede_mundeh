type CeremonyCategory = {
  id: number;
  name: string;
  icon?: string;
  description: string;
  isActive?: boolean | number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export default CeremonyCategory;
