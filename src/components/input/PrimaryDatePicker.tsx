import React from "react";
import Datepicker from "react-tailwindcss-datepicker";

export interface IDatePickerValue {
  startDate: null;
  endDate: null;
}

interface IPrimaryDatePickerProps {
  value: IDatePickerValue;
  setValue: (value: IDatePickerValue) => void;
  label?: string;
}

const PrimaryDatePicker = ({
  label,
  setValue,
  value,
}: IPrimaryDatePickerProps) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor="price"
          className="block text-sm font-medium leading-6 text-gray-900 mb-2"
        >
          {label}
        </label>
      )}

      <Datepicker
        value={value}
        onChange={(newValue: any) => setValue({ ...newValue })}
        primaryColor="yellow"
        dateLooking="forward"
        displayFormat="DD-MM-YYYY"
      />
    </div>
  );
};

export default PrimaryDatePicker;
