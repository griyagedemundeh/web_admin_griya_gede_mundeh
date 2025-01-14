import ApiResponse from "@/data/models/base/api-base-response";
import StatisticRequest from "@/data/models/statistic/request/statistic_request";
import TransactionStatistic from "@/data/models/statistic/response/transaction_statistic_response";

export interface IStatisticService {
  getTransactionStatistic(
    request: StatisticRequest
  ): Promise<ApiResponse<TransactionStatistic[]>>;
}
