import { ChangeEventHandler, HTMLInputTypeAttribute, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface PrimaryInputProps {
  name?: string;
  label?: string;
  value: string | number;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  trailing?: any;
  isOptional?: boolean;
  error?: string;
}

export default function PrimaryInput({
  name,
  label,
  value,
  type,
  placeholder,
  onChange,
  className,
  trailing,
  isOptional,
  error,
}: PrimaryInputProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className={className}>
      {label ? (
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
          {isOptional && " (Opsional)"}
        </label>
      ) : null}
      <div className={name ? "mt-2 relative " : "relative"}>
        <input
          id={name ?? ""}
          name={name ?? ""}
          type={isVisible ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary1 sm:text-sm sm:leading-6 bg-gray-50 placeholder:text-xs"
        />

        {trailing}

        {type === "password" ? (
          <div
            className="absolute top-2 right-2 hover:cursor-pointer"
            onClick={() => {
              setIsVisible(!isVisible);
            }}
          >
            {isVisible ? (
              <EyeSlashIcon aria-hidden="true" className="h-5 w-5" />
            ) : (
              <EyeIcon aria-hidden="true" className="h-5 w-5" />
            )}
          </div>
        ) : null}
      </div>
      {error && <p className="text-red text-xs mt-2">{error}</p>}
    </div>
  );
}
