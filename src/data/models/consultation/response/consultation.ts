type Consultation = {
  id: number;
  createdAt: string;
  consultationId: number;
  ceremonyServiceId?: number | undefined;
  ceremonyPackageId?: number | undefined;
  userId: number;
  ceremonyName?: string | null;
  userName: string;
  userPhoto: string;
  status: string;
};

export default Consultation;