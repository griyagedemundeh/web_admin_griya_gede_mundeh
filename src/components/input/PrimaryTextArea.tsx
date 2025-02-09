import React, { ChangeEventHandler } from "react";

interface PrimaryInputProps {
  label?: string;
  value: string | number;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
  isOptional?: boolean;
  error?: string;
  rows?: number;
  disabled?: boolean;
}

const PrimaryTextArea = ({
  label,
  onChange,
  value,
  className,
  placeholder,
  isOptional,
  error,
  rows,
  disabled,
}: PrimaryInputProps) => {
  return (
    <div className={className}>
      {label ? (
        <label
          htmlFor={label}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label} {isOptional && " (Opsional)"}
        </label>
      ) : null}
      <div className="mt-2">
        <textarea
          id={label}
          name={label}
          onChange={onChange}
          disabled={disabled}
          rows={rows ?? 4}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary1 sm:text-sm sm:leading-6 bg-gray-50 disabled:bg-gray-100"
          placeholder={placeholder}
          value={value}
        />
      </div>
      {error && <p className="text-red text-xs mt-2">{error}</p>}
    </div>
  );
};

export default PrimaryTextArea;
