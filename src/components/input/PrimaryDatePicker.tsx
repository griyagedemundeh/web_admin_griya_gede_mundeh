import { CalendarDateRangeIcon } from "@heroicons/react/20/solid";
import React from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

interface IPrimaryDatePickerProps {
  value: Date[];
  setValue: (value: DateObject[]) => void;
  label?: string;
  className?: string;
}

const PrimaryDatePicker = ({
  label,
  setValue,
  value,
  className,
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
        className=" rounded-lg flex flex-row items-center justify-between shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        style={{ padding: 6, paddingLeft: 10 }}
      >
        <CalendarDateRangeIcon height={16} width={16} color="gray" />
        <DatePicker
          format="MM/DD/YYYY HH:mm"
          range
          placeholder={`${new Date()}`}
          value={[new Date(), new Date()]}
          onChange={(e) => {
            setValue(e);
          }}
          containerStyle={{
            padding: 0,
            marginLeft: 4,
            borderRadius: 10,
            border: 0,
          }}
          style={{
            accentColor: "orange",
            color: "gray",
            caretColor: "orange",
            border: 0,
            width: className?.includes("w-full") ? 400 : "auto",
          }}
          plugins={[
            <TimePicker key={1} position="bottom" />,
            <DatePanel key={2} markFocused color="red" />,
          ]}
        />
      </div>
    </div>
  );
};

export default PrimaryDatePicker;
