import ApiResponse from "@/data/models/base/api-base-response";
import Member from "@/data/models/member/response/member";
import { useCentralStore } from "@/store";
import { UseMutateFunction, useMutation } from "react-query";
import { createInvoice as createInvoiceBridge } from "./transaction_bridge";
import { showToast } from "@/utils";
import { AxiosError } from "axios";
import InvoiceRequest from "@/data/models/transaction/request/invoice_request";
import { useState } from "react";

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
  payment: Payment | undefined;
}

export const useTransaction = (): IUseTransaction => {
  const { setIsLoading } = useCentralStore();

  const [payment, setPayment] = useState<Payment>();

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

      setPayment(value.data);
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
    payment,
  };
};
