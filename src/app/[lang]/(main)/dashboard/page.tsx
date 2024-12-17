"use client";

import CeremonyCard from "@/components/card/CeremonyCard";
import { Locale } from "../../dictionaries";
import { useAuth } from "@/hooks/auth/use_auth";
import { useCeremonyHistory } from "@/hooks/ceremony/use_ceremony_history";
// import TransactionChart from "@/components/chart/TransactionChart";

const data = [{}, {}, {}, {}, {}, {}];

export default function Dashboard({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { account } = useAuth();

  const { allCeremonyHistoryOnProgress } = useCeremonyHistory();

  return (
    <div>
      <div>
        <h1 className="font-bold text-xl">
          Selamat Datang, {account?.fullName}🎉
        </h1>
        <p className="text-gray-500">
          Lihat statistik transaksi dan acaramu disini.
        </p>
      </div>

      <div className="flex flex-row space-x-6 overflow-x-scroll w-full no-scrollbar mt-4">
        {allCeremonyHistoryOnProgress?.data ? (
          allCeremonyHistoryOnProgress?.data.map((item, index) => (
            <CeremonyCard ceremonyHistory={item} key={item.id} />
          ))
        ) : (
          <div className="h-40 w-full flex items-center justify-center text-gray-400">
            Tidak ada Upacara Agama dalam proses
          </div>
        )}
      </div>

      <div>{/* <TransactionChart /> */}</div>
    </div>
  );
}
