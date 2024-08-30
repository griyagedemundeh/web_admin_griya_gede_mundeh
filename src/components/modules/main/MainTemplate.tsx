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

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
  { name: "Transaksi", href: "#", icon: BanknotesIcon, current: false },
  {
    name: "Konsultasi",
    href: "#",
    icon: ChatBubbleLeftRightIcon,
    current: false,
  },
  { name: "Jadwal Upacara", href: "#", icon: CalendarDaysIcon, current: false },
  { name: "Artikel", href: "#", icon: NewspaperIcon, current: false },
];
const teams = [
  { id: 1, name: "Pengelola", href: "#", initial: "P", current: false },
  {
    id: 2,
    name: "Pemedek/Pengguna Layanan",
    href: "#",
    initial: "PP",
    current: false,
  },
  { id: 3, name: "Upacara Agama", href: "#", initial: "UA", current: false },
];
const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

interface MainTemplateProps {
  t: any;
  children: React.ReactNode;
}

const MainTemplate = ({ t, children }: MainTemplateProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

      <div className="lg:pl-72">
        <Header navigations={userNavigation} onClose={setSidebarOpen} t={t} />

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainTemplate;
