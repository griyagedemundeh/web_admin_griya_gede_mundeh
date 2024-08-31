import CeremonyCard from "@/components/card/CeremonyCard";
import { getDictionary } from "../../dictionaries";
import TransactionChart from "@/components/chart/TransactionChart";

const data = [{}, {}, {}, {}, {}, {}];

export default async function Dashboard({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const t = await getDictionary(lang);

  return (
    <div>
      <div>
        <h1 className="font-bold text-xl">Selamat Datang, Bimo🎉</h1>
        <p className="text-gray-500">
          Lihat statistik transaksi dan acaramu disini.
        </p>
      </div>

      <div className="flex flex-row space-x-6 overflow-x-scroll w-full no-scrollbar mt-4">
        {data.map((item, index) => (
          <CeremonyCard key={index.toString()} />
        ))}
      </div>

      <div>
        <TransactionChart />
      </div>
    </div>
  );
}
