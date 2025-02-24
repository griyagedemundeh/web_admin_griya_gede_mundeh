import BasicNavigation from "@/interfaces/BasicNavigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React from "react";
import { useAuth } from "@/hooks/auth/use_auth";
import Images from "@/constants/images";

interface HeaderProps {
  onClose: (value: boolean) => void;
  t: any;
  navigations: BasicNavigation[];
}

const Header = ({ navigations, onClose, t }: HeaderProps) => {
  const { account, logout } = useAuth();

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => onClose(true)}
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
      </button>

      {/* Separator */}
      <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

      <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon aria-hidden="true" className="h-6 w-6" />
          </button> */}

          {/* Separator */}
          <div
            aria-hidden="true"
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
          />

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <MenuButton className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <Image
                alt={account?.fullName ?? ""}
                src={account?.avatarUrl ?? Images.dummyProfile}
                className="h-8 w-8 rounded-full bg-gray-50"
                height={40}
                width={40}
              />
              <span className="hidden lg:flex lg:items-center">
                <span
                  aria-hidden="true"
                  className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                >
                  {account?.fullName}
                </span>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="ml-2 h-5 w-5 text-gray-400"
                />
              </span>
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              {navigations.map((item) => (
                <MenuItem key={item.name}>
                  {item.name.toLowerCase() === "keluar" ? (
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                      }}
                      href=""
                      className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-rose-50"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <a
                      href={item.href}
                      className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-rose-50"
                    >
                      {item.name}
                    </a>
                  )}
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
