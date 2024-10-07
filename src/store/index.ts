import { create } from "zustand";

interface ICentralStore {
  // Value
  isLoading: boolean;

  // Setter
  setIsLoading: (value: boolean) => void;
}

export const useCentralStore = create<ICentralStore>((set) => ({
  isLoading: false,
  setIsLoading: (value: boolean) => {
    set(() => ({ isLoading: value }));
  },
}));
