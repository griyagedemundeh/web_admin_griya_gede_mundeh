export type TypeToastStatus = "success" | "error" | "warn" | "info";
export type Interval = {
  name: string;
  value: string;
};

export const intervals = [
  { name: "Bulan", value: "month" } as Interval,
  { name: "Minggu", value: "week" } as Interval,
  { name: "Hari", value: "day" } as Interval,
];
