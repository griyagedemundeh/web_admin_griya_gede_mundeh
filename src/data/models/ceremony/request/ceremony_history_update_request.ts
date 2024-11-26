type CeremonyHistoryUpdateStatusRequest = {
  id: string | number;
  status: "onProgress" | "onGoing" | "completed" | "cancel";
};

export default CeremonyHistoryUpdateStatusRequest;
