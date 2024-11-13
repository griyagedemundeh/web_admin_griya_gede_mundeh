type InvoiceRequest = {
  memberId: number | string;
  memberAddressId: number | string;
  adminId: number | string;
  ceremonyDate: Date;
  consultationId?: string;
  ceremonyServiceId: string;
  description: string;
  note: string;
  totalPrice: string;
  isCash: boolean;
  additionalTitle?: string;
};
