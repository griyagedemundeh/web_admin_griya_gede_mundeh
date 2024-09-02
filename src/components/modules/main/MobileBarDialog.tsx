"use client";

import LogoWithTitle from "@/components/mini/LogoWithTitle";
import BasicNavigation from "@/interfaces/BasicNavigation";
import classNames from "@/utils/classname";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

import React from "react";

interface MobileBarDialogProps {
  open: boolean;
  onClose: (value: boolean) => void;
  t: any;
  navigations: BasicNavigation[];
  navigationAdmin: BasicNavigation[];
}

const MobileBarDialog = ({
  navigations,
  onClose,
  open,
  t,
  navigationAdmin,
}: MobileBarDialogProps) => {
  const pathName = usePathname();

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50 lg:hidden">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 flex">
        <DialogPanel
          transition
          className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
        >
          <TransitionChild>
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="-m-2.5 p-2.5"
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
              </button>
            </div>
          </TransitionChild>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
            <LogoWithTitle t={t} />
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigations.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            pathName.includes(item.href.toLocaleLowerCase())
                              ? "bg-gray-50 text-primary1 border-l-primary1 border-l-4"
                              : "text-gray-700 hover:bg-gray-50 hover:text-primary1",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className={classNames(
                              pathName.includes(item.href.toLocaleLowerCase())
                                ? "text-primary1"
                                : "text-gray-400 group-hover:text-primary1",
                              "h-6 w-6 shrink-0"
                            )}
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">
                    Your teams
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {navigationAdmin.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            pathName.includes(item.href.toLocaleLowerCase())
                              ? "bg-gray-50 text-primary1 border-l-primary1 border-l-4"
                              : "text-gray-700 hover:bg-gray-50 hover:text-primary1",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          )}
                        >
                          <span
                            className={classNames(
                              pathName.includes(item.href.toLocaleLowerCase())
                                ? "border-primary1 text-primary1"
                                : "border-gray-200 text-gray-400 group-hover:border-primary1 group-hover:text-primary1",
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium"
                            )}
                          >
                            {item.initial}
                          </span>
                          <span className="truncate">{item.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-yellow-50 hover:text-primary1"
                  >
                    <Cog6ToothIcon
                      aria-hidden="true"
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-primary1"
                    />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default MobileBarDialog;
