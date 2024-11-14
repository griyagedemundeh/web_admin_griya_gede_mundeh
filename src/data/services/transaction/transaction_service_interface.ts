import ApiResponse from "@/data/models/base/api-base-response";
import InvoiceRequest from "@/data/models/transaction/request/invoice_request";

export interface ITransactionService {
  createInvoice(request: InvoiceRequest): Promise<ApiResponse<Payment>>;
}
