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
import { intervals } from "@/types";
import { DateValueType } from "react-tailwindcss-datepicker";

interface IUseStatistic {
  // transaction
  orderStatFilter: string;
  setOrderStatFilter: Dispatch<SetStateAction<string>>;
  orderStatDate: DateValueType;
  setOrderStatDate: Dispatch<SetStateAction<DateValueType>>;
  transactionStatistic: ApiResponse<TransactionStatistic> | undefined;
  isLoadingGetTransactionStatistic: boolean;
  refetchTransactionStatistic: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<ApiResponse<TransactionStatistic>, unknown>>;
}

export const useStatistic = (): IUseStatistic => {
  const { setIsLoading } = useCentralStore();

  const [orderStatFilter, setOrderStatFilter] = useState(intervals[1].value);
  const todayDate = new Date();
  const oneMonthPastDate = todayDate.setMonth(todayDate.getMonth() - 1);

  const [orderStatDate, setOrderStatDate] = useState<DateValueType>({
    startDate: new Date(oneMonthPastDate),
    endDate: new Date(),
  });

  const {
    data: transactionStatistic,
    isLoading: isLoadingGetTransactionStatistic,
    isError: isErrorGetTransactionStatistic,
    error: errorGetTransactionStatistic,
    refetch: refetchTransactionStatistic,
  } = useGetTransactionStatisticQuery({
    interval: orderStatFilter as any,
    startDate: orderStatDate?.startDate!,
    endDate: orderStatDate?.endDate!,
  });

  useEffect(() => {
    setIsLoading(isLoadingGetTransactionStatistic);

    if (isErrorGetTransactionStatistic) {
      statusMessage({ message: errorGetTransactionStatistic, status: "error" });
    }
  }, [isLoadingGetTransactionStatistic, isErrorGetTransactionStatistic]);

  return {
    // transaction
    orderStatDate,
    orderStatFilter,
    setOrderStatDate,
    setOrderStatFilter,
    transactionStatistic,
    isLoadingGetTransactionStatistic,
    refetchTransactionStatistic,
  };
};
