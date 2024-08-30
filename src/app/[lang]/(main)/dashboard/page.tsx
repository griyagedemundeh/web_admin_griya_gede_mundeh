import { getDictionary } from "../../dictionaries";

export default async function Dashboard({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const t = await getDictionary(lang);

  return (
    <div>
      <p>DASHBOARD</p>
    </div>
  );
}
