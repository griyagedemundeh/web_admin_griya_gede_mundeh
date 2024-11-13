type InvoiceRequest = {
  memberId: number | string;
  memberAddressId: number | string | undefined;
  adminId: number | string;
  ceremonyDate: Date;
  consultationId?: string | number | null;
  ceremonyServiceId: string | number;
  ceremonyPackageId?: string | number | null;
  description: string;
  note: string;
  totalPrice: string;
  isCash: boolean;
  additionalTitle?: string;
};
