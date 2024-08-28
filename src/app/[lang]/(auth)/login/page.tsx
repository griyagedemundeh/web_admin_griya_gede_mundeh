import { getDictionary } from "../../dictionaries";
import LoginForm from "@/components/modules/login/LoginForm";

export default async function Login({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const t = await getDictionary(lang);

  return <LoginForm t={t} />;
}
