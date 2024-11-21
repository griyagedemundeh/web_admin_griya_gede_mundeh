type InvoiceRequest = {
  memberId: number;
  memberAddressId: number | null;
  adminId: number;
  ceremonyDate: string | Date;
  consultationId?: number | null;
  ceremonyServiceId: number;
  ceremonyServicePackageId?: number | null;
  description: string;
  note: string;
  totalPrice: string;
  isCash: boolean;
  title?: string;
};

export default InvoiceRequest;
