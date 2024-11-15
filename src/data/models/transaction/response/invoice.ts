type Invoice = {
  id: number;
  consultationId: number;
  ceremonyHistoryId: number;
  memberId: number;
  totalPrice: number;
  paymentUrl: string;
  isCash: boolean;
  status: string;
  createdAt: string;
  paidAt: string | null;
  updatedAt: string;
};

export default Invoice;
