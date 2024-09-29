"use client";

import React, { useState } from "react";
import {
  CalendarDaysIcon,
  HomeIcon,
  BanknotesIcon,
  ChatBubbleLeftRightIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
import MobileBarDialog from "./MobileBarDialog";
import SideBar from "./SideBar";
import Header from "./Header";
import getInitials from "@/utils/getInitial";
import Script from "next/script";

interface MainTemplateProps {
  t: any;
  children: React.ReactNode;
}

const MainTemplate = ({ t, children }: MainTemplateProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    {
      name: t.label.dashboard,
      href: `/dashboard`,
      icon: HomeIcon,
      current: true,
    },
    {
      name: t.label.transaction,
      href: `/transaction`,
      icon: BanknotesIcon,
      current: false,
    },
    {
      name: t.label.consultation,
      href: `/consultation`,
      icon: ChatBubbleLeftRightIcon,
      current: false,
    },
    {
      name: t.label.ceremonySchedule,
      href: `/ceremony-schedule`,
      icon: CalendarDaysIcon,
      current: false,
    },
    {
      name: t.label.article,
      href: `/article`,
      icon: NewspaperIcon,
      current: false,
    },
  ];
  const teams = [
    {
      id: 1,
      name: t.label.manager,
      href: `/manager`,
      initial: getInitials(t.label.manager),
      current: false,
    },
    {
      id: 2,
      name: t.label.user,
      href: `/user`,
      initial: getInitials(t.label.user),
      current: false,
    },
    {
      id: 3,
      name: t.label.ceremonyCategory,
      href: `/ceremony-category`,
      initial: getInitials(t.label.ceremonyCategory),
      current: false,
    },
    {
      id: 4,
      name: t.label.ceremony,
      href: `/ceremony`,
      initial: getInitials(t.label.ceremony),
      current: false,
    },
  ];
  const userNavigation = [
    { name: "Your profile", href: "#" },
    { name: "Sign out", href: "#" },
  ];

  return (
    <div>
      {/* Mobile mode */}
      <MobileBarDialog
        navigationAdmin={teams}
        navigations={navigation}
        onClose={setSidebarOpen}
        open={sidebarOpen}
        t={t}
      />

      {/* Static sidebar for desktop */}
      <SideBar navigationAdmin={teams} navigations={navigation} t={t} />

      <div className="lg:pl-72 bg-gray-50 h-screen">
        <Header navigations={userNavigation} onClose={setSidebarOpen} t={t} />

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
      <Script
        src="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.js"
        strategy="lazyOnload"
      />
    </div>
  );
};

export default MainTemplate;
