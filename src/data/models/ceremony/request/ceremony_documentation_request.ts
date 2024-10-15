type CeremonyDocumentationRequest = {
  ceremonyServiceId: number | string;
  photo: File | null;
  photoUrl?: string | null | undefined;
};

export default CeremonyDocumentationRequest;
