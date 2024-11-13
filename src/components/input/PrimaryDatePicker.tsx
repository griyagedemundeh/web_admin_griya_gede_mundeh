import { CalendarDateRangeIcon } from "@heroicons/react/20/solid";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IPrimaryDatePickerProps {
  // value: Date[];
  // setValue: (value: DateObject[]) => void;
  value: Date;
  setValue: (value: Date) => void;
  label?: string;
  className?: string;
  error?: string;
}

const PrimaryDatePicker = ({
  label,
  setValue,
  value,
  className,
  error,
}: IPrimaryDatePickerProps) => {
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
          selected={value}
          onChange={(date) => setValue(date as Date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          className="border-none self-start p-0 ml-2 w-96"
        />
      </div>
      {error && <p className="text-red text-xs mt-2">{error}</p>}
    </div>
  );
};

export default PrimaryDatePicker;
