type Message = {
  ceremonyPackageId?: number;
  ceremonyServiceId?: number;
  consultationId: number;
  createdAt: string;
  id: number;
  invoiceId: number | null;
  isAdmin: boolean;
  message: string;
  messageType: "default" | "invoice";
  userId: number;
};

export default Message;
