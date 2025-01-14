import { useAuth } from "@/hooks/auth/use_auth";
import React, { Dispatch, SetStateAction } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SettingTabsProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

export default function SettingTabs({
  activeTab,
  setActiveTab,
}: SettingTabsProps) {
  const { account } = useAuth();

  const tabOptions = [
    {
      name: "Profile Griya",
      value: "profile-griya",
    },
    // { name: "Social Media Griya", value: "social-media-griya" },
    { name: "Profile Admin", value: "profile-admin" },
  ];

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 my-4 text-base focus:border-primary1 focus:outline-none focus:ring-primary1 sm:text-sm"
        >
          {account?.role === "superAdmin" ? (
            tabOptions.map((tab) => (
              <option key={tab.value} value={tab.value}>
                {tab.name}
              </option>
            ))
          ) : (
            <option value={tabOptions[tabOptions.length - 1].value}>
              {tabOptions[tabOptions.length - 1].name}
            </option>
          )}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {account?.role === "superAdmin" ? (
              tabOptions.map((tab) => (
                <a
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  aria-current={activeTab === tab.value ? "page" : undefined}
                  className={classNames(
                    activeTab === tab.value
                      ? "border-primary1 text-primary1"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium cursor-pointer"
                  )}
                >
                  {tab.name}
                </a>
              ))
            ) : (
              <a
                key={tabOptions[tabOptions.length - 1].value}
                onClick={() =>
                  setActiveTab(tabOptions[tabOptions.length - 1].value)
                }
                aria-current={
                  activeTab === tabOptions[tabOptions.length - 1].value
                    ? "page"
                    : undefined
                }
                className={classNames(
                  activeTab === tabOptions[tabOptions.length - 1].value
                    ? "border-primary1 text-primary1"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium cursor-pointer"
                )}
              >
                {tabOptions[tabOptions.length - 1].name}
              </a>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
