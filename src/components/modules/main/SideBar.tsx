import LogoWithTitle from "@/components/mini/LogoWithTitle";
import { useAuth } from "@/hooks/auth/use_auth";
import BasicNavigation from "@/interfaces/BasicNavigation";
import { classNames } from "@/utils";

import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import React from "react";

interface SideBarProps {
  t: any;
  navigations: BasicNavigation[];
  navigationAdmin: BasicNavigation[];
}
const SideBar = ({ navigationAdmin, navigations, t }: SideBarProps) => {
  const pathName = usePathname();

  const { account } = useAuth();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
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
                        pathName.endsWith(item.href.toLocaleLowerCase())
                          ? "bg-yellow-50 text-primary1  border-l-primary1 border-l-4"
                          : "text-gray-700 hover:bg-yellow-50 hover:text-primary1",
                        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                      )}
                    >
                      <item.icon
                        aria-hidden="true"
                        className={classNames(
                          pathName.endsWith(item.href.toLocaleLowerCase())
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
            {account?.role === "superAdmin" && (
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-400">
                  Admin
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {navigationAdmin.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          pathName.endsWith(item.href.toLocaleLowerCase())
                            ? "bg-yellow-50 text-primary1 border-l-primary1 border-l-4"
                            : "text-gray-700 hover:bg-yellow-50 hover:text-primary1",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                        )}
                      >
                        <span
                          className={classNames(
                            pathName.endsWith(item.href.toLocaleLowerCase())
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
            )}
            <li className="mt-auto">
              <a
                href="/setting"
                className={`group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-yellow-50 hover:text-primary1 ${
                  pathName.includes("setting")
                    ? "bg-yellow-50 text-primary1  border-l-primary1 border-l-4"
                    : "text-gray-700 hover:bg-yellow-50 hover:text-primary1"
                }`}
              >
                <Cog6ToothIcon
                  aria-hidden="true"
                  className="h-6 w-6 shrink-0 group-hover:text-primary1"
                />
                Pengaturan
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
