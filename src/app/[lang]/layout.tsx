import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { getDictionary, Locale } from "./dictionaries";
import Main from "./main";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Griya Gede Mundeh",
  description: "Admin Panel Griya Gede Mundeh",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const t = await getDictionary(params.lang);

  return (
    <Main params={{ className: plusJakartaSans.className, lang: "en", t: t }}>
      {children}
    </Main>
  );
}
