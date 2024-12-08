type GeneralMessage = {
  id: number;
  createdAt: Date;
  consultationId: number;
  userId: number;
  message: string;
  isAdmin: boolean;
};

export default GeneralMessage;
