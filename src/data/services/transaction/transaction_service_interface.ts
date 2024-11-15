import ApiResponse from "@/data/models/base/api-base-response";
import ListDataRequest from "@/data/models/base/list_data_request";
import InvoiceRequest from "@/data/models/transaction/request/invoice_request";
import Invoice from "@/data/models/transaction/response/invoice";

export interface ITransactionService {
  createInvoice(request: InvoiceRequest): Promise<ApiResponse<Payment>>;
  getAllInvoice(request: ListDataRequest): Promise<ApiResponse<Invoice[]>>;
}
