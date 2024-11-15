type InvoiceRequest = {
  memberId: number;
  memberAddressId: number | null;
  adminId: number;
  ceremonyDate: Date;
  consultationId?: number | null;
  ceremonyServiceId: string | number;
  ceremonyServicePackageId?: number | null;
  description: string;
  note: string;
  totalPrice: string;
  isCash: boolean;
  title?: string;
};

export default InvoiceRequest;
