"use client";

import {
  CheckCircleIcon,
  MagnifyingGlassIcon,
  TagIcon,
} from "@heroicons/react/20/solid";
import { getDictionary, Locale } from "../../dictionaries";
import PrimaryInput from "@/components/input/PrimaryInput";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import DropdownFilter from "@/components/dropdown/DropdownFilter";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import IconButton from "@/components/button/IconButton";
import { categories, ceremonySchedules, status } from "@/utils/dummyData";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import PrimaryTable from "@/components/table/PrimaryTable";
import SecondaryButton from "@/components/button/SecondaryButton";
import PrimaryButton from "@/components/button/PrimaryButton";
import PrimaryDatePicker from "@/components/input/PrimaryDatePicker";
import CeremonyScheduleModal from "./components/CeremonyScheduleModal";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function TransactionPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = getDictionary(lang);
  const [open, setOpen] = useState(false);

  const [openDetail, setOpenDetail] = useState(false);

  const [selectedCeremonyCategory, setSelectedCeremonyCategory] =
    useState<DropdownFilterItemProps>();

  const [selectedStatusItem, setSelectedStatusItem] =
    useState<DropdownFilterItemProps>();

  const [data, setData] = useState(() => ceremonySchedules);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const columns = useMemo<ColumnDef<CeremonySchedule>[]>(
    () => [
      {
        header: "Nama Upacara",
        cell: (info) => (
          <div className="py-4 sm:pl-6 pr-3 text-sm font-medium text-gray-900">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row space-x-2">
                <div className="h-4 w-4 rounded-full bg-orange-400"></div>
                <p className="text-gray-500 line-clamp-1 text-ellipsis text-xs">
                  {info.row.original.status}
                </p>
              </div>
              <p className="text-gray-800 line-clamp-1 text-ellipsis">
                {info.row.original.title}
              </p>
            </div>
          </div>
        ),
      },
      {
        header: "Kategori",
        cell: (info) => <div className="pl-4">{info.row.original.status}</div>,
      },
      {
        header: "Alamat",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {info.row.original.address}
          </div>
        ),
      },
      {
        header: "Hitung Mundur",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {info.row.original.countDown.toISOString()}
          </div>
        ),
      },
      {
        header: "Aksi",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="flex flex-row space-x-2">
              <IconBackgroundButton
                icon={InformationCircleIcon}
                colorBackground="blue"
                className="bg-blue-100"
                colorIcon="blue"
                onClick={() => {
                  setOpenDetail(true);
                }}
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
        onFilterReset={() => {}}
        filters={
          <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center flex-1 relative">
            <PrimaryDatePicker
              setValue={(value) => {}}
              value={[new Date(), new Date()]}
            />

            <DropdownFilter
              label="Kategori"
              selectedItem={selectedCeremonyCategory}
              setSelectedItem={setSelectedCeremonyCategory}
              icon={TagIcon}
              items={categories}
            />

            <DropdownFilter
              label="Status"
              selectedItem={selectedStatusItem}
              setSelectedItem={setSelectedStatusItem}
              icon={CheckCircleIcon}
              items={status}
            />

            <PrimaryInput
              onChange={(e) => {}}
              value={""}
              placeholder="Cari upacara"
              className=""
              trailing={
                <IconButton
                  icon={MagnifyingGlassIcon}
                  onClick={() => {}}
                  className="absolute top-1 right-1"
                />
              }
            />
          </div>
        }
        columns={columns}
        data={data ?? []}
        isLoading={false}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={5}
        limitPage={10}
        isCommon={true}
      />

      {/* Dialog PRE-PAID Transaction*/}
      <CeremonyScheduleModal
        open={openDetail}
        setOpen={setOpenDetail}
        title="Detail Jadwal Upacara"
        bottomAction={
          <div className="flex flex-row space-x-2">
            <SecondaryButton label="Konsultasi" onClick={() => {}} />
            <PrimaryButton label="Ubah Status" onClick={() => {}} />
          </div>
        }
      />
    </>
  );
}
