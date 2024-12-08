import Invoice from "@/data/models/transaction/response/invoice";
import { create } from "zustand";

interface ICentralStore {
  // Value
  isLoading: boolean;
  invoice: Invoice | undefined;

  // Setter
  setIsLoading: (value: boolean) => void;
  setInvoice: (invoice: Invoice | undefined) => void;
}

export const useCentralStore = create<ICentralStore>((set) => ({
  // Value
  isLoading: false,
  invoice: undefined,

  // Set Value
  setIsLoading: (value: boolean) => {
    set(() => ({ isLoading: value }));
  },
  setInvoice: (value: Invoice | undefined) => {
    set(() => ({ invoice: value }));
  },
}));
