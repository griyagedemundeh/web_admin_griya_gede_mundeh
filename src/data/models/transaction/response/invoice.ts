// Define the User type
type User = {
  fullName: string;
  id: number;
};

// Define the InvoiceMember type
type InvoiceMember = {
  userId: number;
  id: number;
  user: User;
};

// Define the CeremonyAdmin type
type CeremonyAdmin = {
  userId: number;
  id: number;
  user: User;
};

// Define the CeremonyService type
type CeremonyService = {
  title: string;
  id: number;
};

// Define the CeremonyPackage type
type CeremonyPackage = {
  name: string;
  id: number;
};

// Define the InvoiceCeremonyHistory type
type InvoiceCeremonyHistory = {
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
  status: string;
  createdAt: string;
  updatedAt: string;
  ceremonyPackage: CeremonyPackage;
  ceremonyService: CeremonyService;
  ceremonyAdmin: CeremonyAdmin;
};

// Define the main Invoice type
type Invoice = {
  id: string;
  consultationId: number | null;
  ceremonyHistoryId: number;
  memberId: number;
  totalPrice: number;
  paymentUrl: string | null;
  paymentToken: string | null;
  paymentMethod: string | null;
  isCash: boolean;
  status: string;
  createdAt: string;
  paidAt: string | null;
  updatedAt: string;
  invoiceMember: InvoiceMember;
  invoiceCeremonyHistory: InvoiceCeremonyHistory;
};

export default Invoice;
