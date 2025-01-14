import ApiResponse from "@/data/models/base/api-base-response";
import { AxiosError, AxiosResponse } from "axios";
import api from "@/configs/api";
import { IStatisticService } from "./statistic_service_interface";
import StatisticRequest from "@/data/models/statistic/request/statistic_request";
import TransactionStatistic from "@/data/models/statistic/response/transaction_statistic_response";

export class StatisticService implements IStatisticService {
  private readonly uri = "admin/invoice/statistic";
  async getTransactionStatistic(
    request: StatisticRequest
  ): Promise<ApiResponse<TransactionStatistic[]>> {
    try {
      const response: AxiosResponse<ApiResponse<TransactionStatistic[]>> =
        await api.get(this.uri, { params: request });
      return response.data;
    } catch (error: AxiosError<ApiResponse<TransactionStatistic[]>> | any) {
      console.error("==================================");
      console.error(
        "Error GET ALL TransactionStatistic -->",
        error.response.data.message
      );
      console.error("==================================");
      throw error.response.data.message;
    }
  }
}
