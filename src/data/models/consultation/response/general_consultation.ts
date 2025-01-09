type GeneralConsultation = {
  id: number;
  createdAt: string;
  consultationId: number;
  userId: number;
  userName: string;
  userPhoto?: string;
  isRead: boolean;
  updatedAt: string;
};

export default GeneralConsultation;
