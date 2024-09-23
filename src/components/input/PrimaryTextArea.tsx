import React, { ChangeEventHandler } from "react";

interface PrimaryInputProps {
  name?: string;
  value: string | number;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
  isOptional?: boolean;
}

const PrimaryTextArea = ({
  name,
  onChange,
  value,
  className,
  placeholder,
  isOptional,
}: PrimaryInputProps) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {name} {isOptional && " (Opsional)"}
      </label>
      <div className="mt-2">
        <textarea
          id={name}
          name={name}
          onChange={onChange}
          rows={4}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary1 sm:text-sm sm:leading-6 bg-gray-50"
          placeholder={placeholder}
          defaultValue={value}
        />
      </div>
    </div>
  );
};

export default PrimaryTextArea;
