import { CalendarDateRangeIcon } from "@heroicons/react/20/solid";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IPrimaryRangeDatePickerProps {
  startDate: Date;
  endDate?: Date;
  onChange: (value: [Date | null, Date | null]) => void;
  label?: string;
  className?: string;
  error?: string;
}

const PrimaryRangeDatePicker = ({
  label,
  onChange,
  endDate,
  startDate,
  className,
  error,
}: IPrimaryRangeDatePickerProps) => {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor="price"
          className="block text-sm font-medium leading-6 text-gray-900 mb-2"
        >
          {label}
        </label>
      )}

      <div
        className=" rounded-lg flex flex-row items-center justify-start shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        style={{ padding: 10, paddingLeft: 10 }}
      >
        <CalendarDateRangeIcon height={16} width={16} color="gray" />

        <DatePicker
          dateFormat="d MMMM yyyy"
          className="border-none self-start p-0 ml-2 w-56"
          swapRange
          selected={startDate}
          onChange={(dates) => onChange(dates)}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          selectsDisabledDaysInRange
        />
      </div>
      {error && <p className="text-red text-xs mt-2">{error}</p>}
    </div>
  );
};

export default PrimaryRangeDatePicker;
