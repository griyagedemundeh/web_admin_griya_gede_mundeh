import ApiResponse from "@/data/models/base/api-base-response";
import Member from "@/data/models/member/response/member";
import { useCentralStore } from "@/store";
import { UseMutateFunction, useMutation } from "react-query";
import { createInvoice as createInvoiceBridge } from "./transaction_bridge";
import { showToast } from "@/utils";
import { AxiosError } from "axios";
import InvoiceRequest from "@/data/models/transaction/request/invoice_request";

interface IUseTransaction {
  createInvoice: UseMutateFunction<
    ApiResponse<Payment>,
    unknown,
    InvoiceRequest,
    unknown
  >;
  isLoadingCreateInvoice: boolean;
  isCreateInvoiceSuccess: boolean;
  isCreateInvoiceError: boolean;
}

export const useTransaction = (): IUseTransaction => {
  const { setIsLoading } = useCentralStore();

  const {
    mutate: createInvoice,
    isLoading: isLoadingCreateInvoice,
    isSuccess: isCreateInvoiceSuccess,
    isError: isCreateInvoiceError,
  } = useMutation(createInvoiceBridge, {
    onSuccess: async (value) => {
      value.message.forEach((message) => {
        showToast({ status: "success", message: message });
      });

      setIsLoading(false);

      console.log("====================================");
      console.log("DATA PAYMENT ---->> ", value);
      console.log("====================================");
    },
    onError: async (error: AxiosError<ApiResponse<Member>> | unknown) => {
      setIsLoading(false);
      if (error instanceof Array) {
        error.forEach((message) => {
          showToast({ status: "error", message: `${message}` });
        });
        return;
      }
      showToast({ status: "error", message: `${error}` });
    },
  });

  return {
    createInvoice,
    isCreateInvoiceError,
    isCreateInvoiceSuccess,
    isLoadingCreateInvoice,
  };
};
