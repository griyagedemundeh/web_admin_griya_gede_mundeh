import { getDictionary, Locale } from "../../dictionaries";
import LoginForm from "@/app/[lang]/(auth)/login/components/LoginForm";

export default async function Login({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = await getDictionary(lang);

  return <LoginForm t={t} />;
}
