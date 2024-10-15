import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React from "react";

interface DropdownFilterProps {
  items: DropdownFilterItemProps[];
  label: string;
  placeholder?: string;
  selectedItem: DropdownFilterItemProps | undefined;
  setSelectedItem: (value: DropdownFilterItemProps | undefined) => void;
  className?: string;
  isOptional?: boolean;
}

const DropdownInput = ({
  items,
  label,
  selectedItem,
  setSelectedItem,
  placeholder,
  className,
  isOptional,
}: DropdownFilterProps) => {
  return (
    <div className={className + " relative"}>
      <p className="text-sm font-medium leading-6 text-gray-900">
        {label} {isOptional && " (Opsional)"}
      </p>
      <Menu as="div" className="relative inline-block text-left mt-2 w-full">
        <div>
          <MenuButton
            className={
              selectedItem
                ? "text-gray-900 inline-flex w-full justify-between gap-x-1.5 rounded-md bg-gray-50 px-3 py-2 text-sm shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                : "text-gray-400 inline-flex w-full justify-between gap-x-1.5 rounded-md bg-gray-50 px-3 py-2 text-xs shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            }
          >
            {selectedItem?.title ?? placeholder}
            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 h-5 w-5 text-gray-400"
            />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-50 mt-2 origin-top-right rounded-md bg-gray-50 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in h-32 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-200 scrollbar-track-white w-full"
        >
          <div className="py-1">
            {items.map((item) => {
              return (
                <MenuItem key={item.id}>
                  <div
                    onClick={() => {
                      setSelectedItem(item);
                    }}
                    className="inline-block w-full text-start rounded-sm px-4 py-2 transition duration-200 ease-linear transform text-sm text-gray-700 data-[focus]:font-bold data-[focus]:bg-yellow-50 data-[focus]:border-l-primary1 data-[focus]:border-l-4 data-[focus]:text-gray-900 hover:cursor-pointer"
                  >
                    {item.title}
                  </div>
                </MenuItem>
              );
            })}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default DropdownInput;
