import ApiResponse from "@/data/models/base/api-base-response";
import Member from "@/data/models/member/response/member";
import { useCentralStore } from "@/store";
import { UseMutateFunction, useMutation } from "react-query";
import {
  createInvoice as createInvoiceBridge,
  useGetAllInvoiceQuery,
} from "./transaction_bridge";
import { showToast, statusMessage } from "@/utils";
import { AxiosError } from "axios";
import InvoiceRequest from "@/data/models/transaction/request/invoice_request";
import { useEffect, useState } from "react";
import ListDataRequest from "@/data/models/base/list_data_request";
import Invoice from "@/data/models/transaction/response/invoice";

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

  // Invoice
  invoices: ApiResponse<Invoice[]> | undefined;
  isLoadingGetAllInvoice: boolean;
}

export const useTransaction = (): IUseTransaction => {
  const { setIsLoading } = useCentralStore();

  const [payment, setPayment] = useState<Payment>();

  const [filter, setFilter] = useState<ListDataRequest>({
    page: 1,
    limit: 1000,
  });

  const {
    data: invoices,
    isLoading: isLoadingGetAllInvoice,
    isError: isErrorGetAllInvoice,
    error: errorGetAllInvoice,
  } = useGetAllInvoiceQuery(filter);

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

  useEffect(() => {
    setIsLoading(isLoadingGetAllInvoice);

    if (isErrorGetAllInvoice) {
      statusMessage({ message: errorGetAllInvoice, status: "error" });
    }
  }, [isLoadingGetAllInvoice, isErrorGetAllInvoice]);

  return {
    createInvoice,
    isCreateInvoiceError,
    isCreateInvoiceSuccess,
    isLoadingCreateInvoice,
    payment,

    // Invoice
    invoices,
    isLoadingGetAllInvoice,
  };
};
