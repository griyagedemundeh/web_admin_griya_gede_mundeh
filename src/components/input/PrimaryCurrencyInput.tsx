import React from "react";
import CurrencyInput, {
  CurrencyInputOnChangeValues,
} from "react-currency-input-field";

interface IPrimaryCurrencyInputProps {
  value: string;
  setValue: (value: string) => void;
  label: string;
  prefix?: string;
  placeholder?: string;
  className?: string;
}

const PrimaryCurrencyInput = ({
  label,
  setValue,
  value,
  placeholder,
  prefix,
  className,
}: IPrimaryCurrencyInputProps) => {
  return (
    <div className={className}>
      <label
        htmlFor="price"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <CurrencyInput
        id={label}
        name={label}
        placeholder={placeholder ?? ""}
        defaultValue={parseInt(value !== "" ? value : "0", 10)}
        prefix={prefix ?? "Rp"}
        className="block w-full mt-2 rounded-md border-0 py-1.5 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary1 sm:text-sm sm:leading-6 placeholder:text-xs bg-gray-50"
        decimalsLimit={2}
        onValueChange={(
          value: string | undefined, // Handle string | undefined type
          name?: string,
          values?: CurrencyInputOnChangeValues
        ) => {
          if (value !== undefined) {
            setValue(value); // Only call setValue when value is not undefined
          }
        }}
      />
    </div>
  );
};

export default PrimaryCurrencyInput;
