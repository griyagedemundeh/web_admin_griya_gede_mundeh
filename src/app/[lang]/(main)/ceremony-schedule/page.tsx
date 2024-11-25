"use client";

import { getDictionary, Locale } from "../../dictionaries";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import PrimaryTable from "@/components/table/PrimaryTable";
import { useCeremonyHistory } from "@/hooks/ceremony/use_ceremony_history";
import CeremonyHistory from "@/data/models/ceremony/response/ceremony_history";
import { getCountdown } from "@/utils";
import CeremonyScheduleModal from "./components/CeremonyScheduleModal";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CountDown = ({ date }: { date: string }): ReactElement => {
  const [countdown, setCountDown] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown(getCountdown(date));

      if (countdown === "Hari Ini") {
        clearInterval(timer);
      }
    }, 1000);

    () => clearInterval(timer);
  }, [countdown]);

  return <p className="font-semibold">{countdown}</p>;
};

export default function CeremonyHistoryPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = getDictionary(lang);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { allCeremonyHistory } = useCeremonyHistory();

  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const columns = useMemo<ColumnDef<CeremonyHistory>[]>(
    () => [
      {
        header: "Nama Upacara",
        cell: (info) => (
          <div className="py-4 sm:pl-6 pr-3 text-sm font-medium text-gray-900">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row space-x-2 items-center">
                <div className="h-2 w-2 rounded-full bg-orange-400"></div>
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
            <CountDown date={info.row.original.ceremonyDate} />
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

      {/* Dialog PRE-PAID Transaction*/}
      {/* <CeremonyScheduleModal
        open={openDetail}
        setOpen={setOpenDetail}
        title="Detail Jadwal Upacara"
        bottomAction={
          <div className="flex flex-row space-x-2">
            <SecondaryButton label="Konsultasi" onClick={() => {}} />
            <PrimaryButton label="Ubah Status" onClick={() => {}} />
          </div>
        }
      /> */}
    </>
  );
}
