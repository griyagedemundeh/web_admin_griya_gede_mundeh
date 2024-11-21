declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options?: {
          embedId?: string;
          onSuccess?: (result: T) => void;
          onPending?: (result: T) => void;
          onError?: (result: T) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

export {};
