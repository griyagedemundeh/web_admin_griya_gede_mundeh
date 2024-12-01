type MessageRequest = {
  ceremonyPackageId?: number;
  ceremonyServiceId?: number;
  consultationId: number;
  createdAt: string;
  invoiceId?: string | null;
  isAdmin: boolean;
  message: string;
  messageType: "default" | "invoice";
  userId: number;
};

export default MessageRequest;
