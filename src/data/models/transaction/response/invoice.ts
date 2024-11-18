type Invoice = {
  id: number;
  consultationId: number;
  ceremonyHistoryId: number;
  memberId: number;
  totalPrice: number;
  paymentUrl: string;
  isCash: boolean;
  status: "success" | "pending" | "canceled";
  createdAt: string;
  paidAt: string | null;
  updatedAt: string;
};

export default Invoice;
