import ApiResponse from "@/data/models/base/api-base-response";
import StatisticRequest from "@/data/models/statistic/request/statistic_request";
import TransactionStatistic from "@/data/models/statistic/response/transaction_statistic_response";
import { StatisticService } from "@/data/services/statistic/statistic_service";
import { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";

const statisticService = new StatisticService();
const TAG_ERROR = "Error during :";

export const getTransactionStatistic = async (
  request: StatisticRequest
): Promise<ApiResponse<TransactionStatistic[]>> => {
  const response = await statisticService
    .getTransactionStatistic(request)
    .then(async (value) => {
      return value;
    })
    .catch(
      (error: AxiosError<ApiResponse<TransactionStatistic[]>> | unknown) => {
        console.error("========================");
        console.error(`${TAG_ERROR} GET ALL TransactionStatistic `, error);
        console.error("========================");
        throw error;
      }
    );
  return response;
};

export const useGetTransactionStatisticQuery = (
  request: StatisticRequest
): UseQueryResult<ApiResponse<TransactionStatistic[]>, unknown> =>
  useQuery("transactionStatistic", () => getTransactionStatistic(request));
