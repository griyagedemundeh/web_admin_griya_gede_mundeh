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
  title?: string;
  totalPrice?: string;
  ceremonyDate?: string | Date;
  addressId?: string;
  address?: string;
};

export default MessageRequest;
