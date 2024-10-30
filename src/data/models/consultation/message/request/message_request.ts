type MessageRequest = {
  ceremonyPackageId?: number;
  ceremonyServiceId?: number;
  consultationId: number;
  createdAt: string;
  invoiceId?: number | null;
  isAdmin: boolean;
  message: string;
  messageType: "default" | "invoice";
  userId: number;
};

export default MessageRequest;
