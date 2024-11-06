type Address = {
  id: number;
  memberId: number;
  address: string;
  addressAlias: string | null;
  addressNote: string | null;
  isMain: boolean;
  createdAt: string;
  updatedAt: string;
};

export default Address;
