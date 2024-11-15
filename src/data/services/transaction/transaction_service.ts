import ApiResponse from "@/data/models/base/api-base-response";
import { AxiosError, AxiosResponse } from "axios";
import api from "@/configs/api";
import { ITransactionService } from "./transaction_service_interface";
import InvoiceRequest from "@/data/models/transaction/request/invoice_request";
import ListDataRequest from "@/data/models/base/list_data_request";
import Invoice from "@/data/models/transaction/response/invoice";

export class TransactionService implements ITransactionService {
  private readonly uri = "admin/invoice";

  async createInvoice(request: InvoiceRequest): Promise<ApiResponse<Payment>> {
    try {
      const response: AxiosResponse<ApiResponse<Payment>> = await api.post(
        this.uri,
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

  async getAllInvoice(
    request: ListDataRequest
  ): Promise<ApiResponse<Invoice[]>> {
    try {
      const response: AxiosResponse<ApiResponse<Invoice[]>> = await api.get(
        this.uri,
        { params: request }
      );
      return response.data;
    } catch (error: AxiosError<ApiResponse<Payment>> | any) {
      console.error("==================================");
      console.error("Error GET ALL INVOICE -->", error.response.data.message);
      console.error("==================================");
      throw error.response.data.message;
    }
  }
}
