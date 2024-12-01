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
  userId: number;
};

export default Message;
