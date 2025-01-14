type Statistic = {
  interval: Date;
  total_success_orders: number;
  total_pending_orders: number;
  total_cancel_orders: number;
};

type TransactionStatistic = {
  statistics: Statistic[];
  total: number;
};

export default TransactionStatistic;
