import ApiResponse from "@/data/models/base/api-base-response";
import { useCentralStore } from "@/store";
import { useGetTransactionStatisticQuery } from "./statistic_bridge";
import { statusMessage } from "@/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import StatisticRequest from "@/data/models/statistic/request/statistic_request";
import TransactionStatistic from "@/data/models/statistic/response/transaction_statistic_response";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

interface IUseStatistic {
  // transaction
  filterTransaction: StatisticRequest;
  setFilterTransaction: Dispatch<SetStateAction<StatisticRequest>>;
  transactionStatistic: ApiResponse<TransactionStatistic> | undefined;
  isLoadingGetTransactionStatistic: boolean;
  refetchTransactionStatistic: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<ApiResponse<TransactionStatistic>, unknown>>;
}

export const useStatistic = (): IUseStatistic => {
  const { setIsLoading } = useCentralStore();

  const todayDate = new Date();
  const oneMonthPastDate = todayDate.setMonth(todayDate.getMonth() - 1);

  const [filterTransaction, setFilterTransaction] = useState<StatisticRequest>({
    interval: "week",
    startDate: new Date(oneMonthPastDate),
    endDate: new Date(),
  });

  const {
    data: transactionStatistic,
    isLoading: isLoadingGetTransactionStatistic,
    isError: isErrorGetTransactionStatistic,
    error: errorGetTransactionStatistic,
    refetch: refetchTransactionStatistic,
  } = useGetTransactionStatisticQuery(filterTransaction);

  useEffect(() => {
    setIsLoading(isLoadingGetTransactionStatistic);

    if (isErrorGetTransactionStatistic) {
      statusMessage({ message: errorGetTransactionStatistic, status: "error" });
    }
  }, [isLoadingGetTransactionStatistic, isErrorGetTransactionStatistic]);

  return {
    // transaction
    filterTransaction,
    setFilterTransaction,
    transactionStatistic,
    isLoadingGetTransactionStatistic,
    refetchTransactionStatistic,
  };
};
