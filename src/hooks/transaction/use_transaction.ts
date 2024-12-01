import ApiResponse from "@/data/models/base/api-base-response";
import Member from "@/data/models/member/response/member";
import { useCentralStore } from "@/store";
import { UseMutateFunction, useMutation } from "react-query";
import {
  createInvoice as createInvoiceBridge,
  updateStatusInvoice as updateInvoiceBridge,
  useGetAllInvoiceQuery,
  useGetDetailInvoiceQuery,
} from "./transaction_bridge";
import { showToast, statusMessage } from "@/utils";
import { AxiosError } from "axios";
import InvoiceRequest from "@/data/models/transaction/request/invoice_request";
import { useEffect, useState } from "react";
import ListDataRequest from "@/data/models/base/list_data_request";
import Invoice from "@/data/models/transaction/response/invoice";
import UpdateInvoiceStatusRequest from "@/data/models/transaction/request/update_invoice_status_request";

interface IUseTransaction {
  createInvoice: UseMutateFunction<
    ApiResponse<Invoice>,
    unknown,
    InvoiceRequest,
    unknown
  >;
  isLoadingCreateInvoice: boolean;
  isCreateInvoiceSuccess: boolean;
  isCreateInvoiceError: boolean;
  payment: Invoice | undefined;

  // Invoice
  invoices: ApiResponse<Invoice[]> | undefined;
  isLoadingGetAllInvoice: boolean;

  // Detail Invoice
  invoice: ApiResponse<Invoice> | undefined;
  isLoadingGetDetailInvoice: boolean;
  isErrorGetDetailInvoice: boolean;

  // Update Status
  updateStatusInvoice: UseMutateFunction<
    ApiResponse<Invoice>,
    unknown,
    UpdateInvoiceStatusRequest,
    unknown
  >;
  isLoadingUpdateStatusInvoice: boolean;
  isUpdateStatusInvoiceSuccess: boolean;
  isUpdateStatusInvoiceError: boolean;
}

export const useTransaction = (): IUseTransaction => {
  const { setIsLoading } = useCentralStore();

  const [payment, setPayment] = useState<Invoice>();

  const [idInvoice, setIdInvoice] = useState<string>("");

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
    data: invoice,
    isLoading: isLoadingGetDetailInvoice,
    isError: isErrorGetDetailInvoice,
  } = useGetDetailInvoiceQuery({ id: idInvoice });

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

  const {
    mutate: updateStatusInvoice,
    isLoading: isLoadingUpdateStatusInvoice,
    isSuccess: isUpdateStatusInvoiceSuccess,
    isError: isUpdateStatusInvoiceError,
  } = useMutation(updateInvoiceBridge, {
    onSuccess: async (value) => {
      value.message.forEach((message) => {
        showToast({ status: "success", message: message });
      });

      setIsLoading(false);
      window.location.reload();
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

    // Detail Invoice
    invoice,

    isErrorGetDetailInvoice,
    isLoadingGetDetailInvoice,

    // Update Status Invoice
    updateStatusInvoice,
    isLoadingUpdateStatusInvoice,
    isUpdateStatusInvoiceError,
    isUpdateStatusInvoiceSuccess,
  };
};
