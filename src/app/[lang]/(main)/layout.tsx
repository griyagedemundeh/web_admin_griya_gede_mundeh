import MainTemplate from "@/components/modules/main/MainTemplate";
import { getDictionary } from "../dictionaries";

export default async function MainLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const t = await getDictionary(lang);

  return <MainTemplate t={t}>{children}</MainTemplate>;
}
