type User = {
  fullName: string;
  id: number;
};

type InvoiceMember = {
  userId: number;
  id: number;
  user: User;
};

type CeremonyService = {
  title: string;
  id: number;
};

type CeremonyPackage = {
  name: string;
  ceremonyServiceId: number;
  id: number;
  ceremonyService: CeremonyService;
};

type CeremonyAdmin = {
  userId: number;
  id: number;
  user: User;
};

type InvoiceCeremonyHistory = {
  adminId: number;
  ceremonyServicePackageId: number;
  id: number;
  ceremonyPackage: CeremonyPackage;
  ceremonyAdmin: CeremonyAdmin;
};

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
  paidAt: string;
  updatedAt: string;
  invoiceMember: InvoiceMember;
  invoiceCeremonyHistory: InvoiceCeremonyHistory;
};

export default Invoice;
