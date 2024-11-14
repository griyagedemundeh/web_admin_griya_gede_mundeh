type InvoiceRequest = {
  memberId: number | string;
  memberAddressId: number | string | undefined;
  adminId: number | string;
  ceremonyDate: Date;
  consultationId?: string | number | null;
  ceremonyServiceId: string | number;
  ceremonyServicePackageId?: string | number | null;
  description: string;
  note: string;
  totalPrice: string;
  isCash: boolean;
  title?: string;
};

export default InvoiceRequest;
