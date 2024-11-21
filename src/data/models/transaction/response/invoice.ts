export type InvoiceCeremonyHistory = {
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
  ceremonyAddressNote: string | null;
  ceremonyDate: string; // ISO date string
  status: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

type Invoice = {
  id: string; // UUID
  consultationId: number | null;
  ceremonyHistoryId: number;
  memberId: number;
  totalPrice: number;
  paymentUrl: string;
  paymentToken: string;
  paymentMethod: string | null;
  isCash: boolean;
  status: string;
  createdAt: string; // ISO date string
  paidAt: string | null; // ISO date string or null
  updatedAt: string; // ISO date string
  invoiceCeremonyHistory: InvoiceCeremonyHistory;
};

export default Invoice;
