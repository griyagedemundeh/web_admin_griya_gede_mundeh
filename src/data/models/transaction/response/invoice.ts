type Invoice = {
  id: string;
  consultationId: string | null;
  ceremonyHistoryId: number;
  memberId: number;
  totalPrice: number;
  paymentUrl: string;
  paymentToken: string;
  paymentMethod: string;
  isCash: boolean;
  status: "success" | "pending" | "canceled";
  createdAt: string;
  paidAt: string | null;
  updatedAt: string;
};

export default Invoice;
