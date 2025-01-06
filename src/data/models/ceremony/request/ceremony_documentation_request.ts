type CeremonyDocumentationRequest = {
  ceremonyServiceId: number | string;
  photo?: File | string | null | undefined;
  photoUrl?: string | null | undefined;
};

export default CeremonyDocumentationRequest;
