import ApiResponse from "@/data/models/base/api-base-response";
import { AxiosError, AxiosResponse } from "axios";
import api from "@/configs/api";
import { ITransactionService } from "./transaction_service_interface";
import InvoiceRequest from "@/data/models/transaction/request/invoice_request";

export class TransactionService implements ITransactionService {
  async createInvoice(request: InvoiceRequest): Promise<ApiResponse<Payment>> {
    const uri = "admin/invoice";
    try {
      const response: AxiosResponse<ApiResponse<Payment>> = await api.post(
        uri,
        request
      );
      return response.data;
    } catch (error: AxiosError<ApiResponse<Payment>> | any) {
      console.error("==================================");
      console.error("Error CREATE INVOICE -->", error.response.data.message);
      console.error("==================================");
      throw error.response.data.message;
    }
  }
}
