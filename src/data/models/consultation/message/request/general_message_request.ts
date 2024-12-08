type GeneralMessageRequest = {
  createdAt: string;
  consultationId: number;
  userId: number;
  message: string;
  isAdmin: boolean;
};

export default GeneralMessageRequest;
