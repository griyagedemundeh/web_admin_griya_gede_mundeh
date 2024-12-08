type Message = {
  ceremonyPackageId?: number;
  ceremonyServiceId?: number;
  consultationId: number;
  createdAt: string;
  id: number;
  invoiceId: string | null;
  isAdmin: boolean;
  message: string;
  messageType: "default" | "invoice";
  totalPrice?: string;
  ceremonyDate?: string;
  address?: string;
  paymentUrl?: string;
  title?: string;
  userId: number;
};

export default Message;
