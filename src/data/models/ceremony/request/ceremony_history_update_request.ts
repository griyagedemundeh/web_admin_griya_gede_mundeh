type CeremonyHistoryUpdateStatusRequest = {
  id: string;
  status: "onProgress" | "onGoing" | "completed" | "cancel";
};

export default CeremonyHistoryUpdateStatusRequest;
