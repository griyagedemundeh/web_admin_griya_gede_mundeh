import { Field, Label, Switch } from "@headlessui/react";
import React, { ReactElement } from "react";

interface SwitchInputProps {
  value: boolean;
  label: ReactElement;
  onChange: (value: boolean) => void;
  className?: string;
}

const SwitchInput = ({
  label,
  onChange,
  value,
  className,
}: SwitchInputProps) => {
  return (
    <div className={className + " whitespace-nowrap text-sm text-gray-500"}>
      <Field className="flex items-center rounded-full">
        <Switch
          onChange={onChange}
          checked={value}
          className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary1 focus:ring-offset-2 data-[checked]:bg-primary1"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
          />
        </Switch>
        <Label as="span" className="ml-3 text-sm">
          {label}
        </Label>
      </Field>
    </div>
  );
};

export default SwitchInput;
