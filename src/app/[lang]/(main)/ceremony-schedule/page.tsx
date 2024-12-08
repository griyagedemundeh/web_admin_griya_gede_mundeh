"use client";

import { getDictionary, Locale } from "../../dictionaries";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import PrimaryTable from "@/components/table/PrimaryTable";
import { useCeremonyHistory } from "@/hooks/ceremony/use_ceremony_history";
import CeremonyHistory from "@/data/models/ceremony/response/ceremony_history";
import { getCountdown } from "@/utils";
import CeremonyScheduleModal from "./components/CeremonyScheduleModal";
import CeremonyHistoryUpdateStatusRequest from "@/data/models/ceremony/request/ceremony_history_update_request";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const StatusIndicator = ({
  status,
}: CeremonyHistoryUpdateStatusRequest): React.ReactElement => {
  let bgColor = "";

  switch (status) {
    case "completed":
      bgColor = "bg-emerald-400";
      break;
    case "onProgress":
      bgColor = "bg-yellow-400";
      break;
    case "onGoing":
      bgColor = "bg-blue-400";
      break;
    case "cancel":
      bgColor = "bg-rose-600";
      break;
    default:
      bgColor = "bg-gray-400";
      break;
  }

  return <div className={`h-2 w-2 rounded-full ${bgColor}`}></div>;
};

const CountDown = ({ date }: { date: string }): ReactElement => {
  const [countDown, setCountDown] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown(getCountdown(date));

      if (countDown === "Hari Ini") {
        clearInterval(timer);
      }
    }, 1000);

    () => clearInterval(timer);
  }, [countDown]);

  return <p className="font-semibold">{countDown}</p>;
};

export default function CeremonyHistoryPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = getDictionary(lang);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { allCeremonyHistory } = useCeremonyHistory();

  const columns = useMemo<ColumnDef<CeremonyHistory>[]>(
    () => [
      {
        header: "Nama Upacara",
        cell: (info) => (
          <div className="py-4 sm:pl-6 pr-3 text-sm font-medium text-gray-900">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row space-x-2 items-center">
                <StatusIndicator status={info.row.original.status} id={1} />
                <p className="text-gray-500 line-clamp-1 text-ellipsis text-xs">
                  {info.row.original.status}
                </p>
              </div>
              <p className="text-gray-800 line-clamp-1 text-ellipsis">
                {info.row.original.title.length > 40
                  ? info.row.original.title.slice(0, 40).concat("...")
                  : info.row.original.title}
              </p>
            </div>
          </div>
        ),
      },
      {
        header: "Alamat",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {info.row.original.ceremonyAddress.length > 40
              ? info.row.original.ceremonyAddress.slice(0, 40).concat("...")
              : info.row.original.ceremonyAddress}
          </div>
        ),
      },
      {
        header: "Hitung Mundur",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {info.row.original.status !== "cancel" ? (
              <CountDown date={info.row.original.ceremonyDate} />
            ) : (
              <p>-</p>
            )}
          </div>
        ),
      },
      {
        header: "Aksi",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="flex flex-row space-x-2">
              <CeremonyScheduleModal
                title={`Detail - ${info.row.original?.title}`}
                ceremonyHistory={info.row.original}
              />
            </div>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <h1 className="font-bold text-xl mb-8">Jadwal Upacara</h1>
      <PrimaryTable
        title="Daftar Jadwal Upacara"
        // onFilterReset={() => {}}
        // filters={
        //   <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center flex-1 relative">
        //     <PrimaryDatePicker
        //       setValue={(value) => {}}
        //       value={[new Date(), new Date()]}
        //     />

        //     <DropdownFilter
        //       label="Kategori"
        //       selectedItem={selectedCeremonyCategory}
        //       setSelectedItem={setSelectedCeremonyCategory}
        //       icon={TagIcon}
        //       items={categories}
        //     />

        //     <DropdownFilter
        //       label="Status"
        //       selectedItem={selectedStatusItem}
        //       setSelectedItem={setSelectedStatusItem}
        //       icon={CheckCircleIcon}
        //       items={status}
        //     />

        //     <PrimaryInput
        //       onChange={(e) => {}}
        //       value={""}
        //       placeholder="Cari upacara"
        //       className=""
        //       trailing={
        //         <IconButton
        //           icon={MagnifyingGlassIcon}
        //           onClick={() => {}}
        //           className="absolute top-1 right-1"
        //         />
        //       }
        //     />
        //   </div>
        // }
        columns={columns}
        data={allCeremonyHistory?.data ?? []}
        isLoading={false}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={5}
        limitPage={10}
        isCommon={true}
      />
    </>
  );
}
