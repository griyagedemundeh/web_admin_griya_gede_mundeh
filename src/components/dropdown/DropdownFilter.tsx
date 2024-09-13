"use client";

import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { ForwardRefExoticComponent } from "react";

interface DropdownFilterProps {
  items: DropdownFilterItemProps[];
  icon: ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  selectedItem: DropdownFilterItemProps | undefined;
  setSelectedItem: (value: DropdownFilterItemProps | undefined) => void;
}

const DropdownFilter = ({
  items,
  icon: Icon,
  label,
  selectedItem,
  setSelectedItem,
}: DropdownFilterProps) => {
  //   const [selectedItem, setSelectedItem] = useState<DropdownFilterItemProps>();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 items-center">
          {<Icon height={16} width={16} color="gray" />}
          <p className="text-xs text-gray-500">
            {selectedItem?.title ?? label}
          </p>
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in p-2"
      >
        <div className="py-1">
          {items.map((item) => {
            return (
              <MenuItem key={item.id}>
                <button
                  onClick={() => {
                    setSelectedItem(item);
                  }}
                  className="inline-block w-full text-start rounded-sm px-4 py-2 transition duration-200 ease-linear transform text-sm text-gray-700 data-[focus]:font-bold data-[focus]:bg-yellow-50 data-[focus]:border-l-primary1 data-[focus]:border-l-4 data-[focus]:text-gray-900"
                >
                  {item.title}
                </button>
              </MenuItem>
            );
          })}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default DropdownFilter;
