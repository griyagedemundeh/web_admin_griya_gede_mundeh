type StatisticRequest = {
  interval: "month" | "week" | "day";
  startDate: Date;
  endDate: Date;
};
export default StatisticRequest;
