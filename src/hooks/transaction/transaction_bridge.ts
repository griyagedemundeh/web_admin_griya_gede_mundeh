import ApiResponse from "@/data/models/base/api-base-response";
import InvoiceRequest from "@/data/models/transaction/request/invoice_request";

import { TransactionService } from "@/data/services/transaction/transaction_service";
import { AxiosError } from "axios";

const authService = new TransactionService();
const TAG_ERROR = "Error during :";

export const createInvoice = async (
  request: InvoiceRequest
): Promise<ApiResponse<Payment>> => {
  const response = await authService
    .createInvoice(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<Payment>> | unknown) => {
      console.error("========================");
      console.error(`${TAG_ERROR} CREATE INVOICE `, error);
      console.error("========================");
      throw error;
    });
  return response;
};
