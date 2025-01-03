import ApiResponse from "@/data/models/base/api-base-response";
import ListDataRequest from "@/data/models/base/list_data_request";
import InvoiceRequest from "@/data/models/transaction/request/invoice_request";
import UpdateInvoiceStatusRequest from "@/data/models/transaction/request/update_invoice_status_request";
import Invoice from "@/data/models/transaction/response/invoice";

import { TransactionService } from "@/data/services/transaction/transaction_service";
import { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";

const authService = new TransactionService();
const TAG_ERROR = "Error during :";

export const createInvoice = async (
  request: InvoiceRequest
): Promise<ApiResponse<Invoice>> => {
  const response = await authService
    .createInvoice(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<Invoice>> | unknown) => {
      console.error("========================");
      console.error(`${TAG_ERROR} CREATE INVOICE `, error);
      console.error("========================");
      throw error;
    });
  return response;
};

export const updateStatusInvoice = async (
  request: UpdateInvoiceStatusRequest
): Promise<ApiResponse<Invoice>> => {
  const response = await authService
    .updateInvoiceStatus(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<Invoice>> | unknown) => {
      console.error("========================");
      console.error(`${TAG_ERROR} UPDATE INVOICE `, error);
      console.error("========================");
      throw error;
    });
  return response;
};

export const getAllInvoice = async (
  request: ListDataRequest
): Promise<ApiResponse<Invoice[]>> => {
  const response = await authService
    .getAllInvoice(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<Invoice[]>> | unknown) => {
      console.error("========================");
      console.error(`${TAG_ERROR} GET ALL INVOICE `, error);
      console.error("========================");
      throw error;
    });
  return response;
};

export const useGetAllInvoiceQuery = (
  request: ListDataRequest
): UseQueryResult<ApiResponse<Invoice[]>, unknown> =>
  useQuery("allInvoice", () => getAllInvoice(request));

export const getDetailInvoice = async ({
  id,
}: {
  id: string;
}): Promise<ApiResponse<Invoice>> => {
  const response = await authService
    .getDetailInvoice({ id })
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<Invoice>> | unknown) => {
      console.error("========================");
      console.error(`${TAG_ERROR} GET Detail INVOICE `, error);
      console.error("========================");
      throw error;
    });
  return response;
};

export const useGetDetailInvoiceQuery = ({
  id,
}: {
  id: string;
}): UseQueryResult<ApiResponse<Invoice>, unknown> =>
  useQuery("detailInvoice", () => getDetailInvoice({ id }));
