"use client";

import {
  CheckCircleIcon,
  CreditCardIcon,
  DocumentCheckIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { getDictionary, Locale } from "../../dictionaries";
import PrimaryInput from "@/components/input/PrimaryInput";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import DropdownFilter from "@/components/dropdown/DropdownFilter";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import IconButton from "@/components/button/IconButton";
import { status, transactions } from "@/utils/dummyData";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import PrimaryTable from "@/components/table/PrimaryTable";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import Transaction from "@/data/models/transaction";
import TransactionModal from "./components/TransactionModal";
import SecondaryButton from "@/components/button/SecondaryButton";
import PrimaryButton from "@/components/button/PrimaryButton";
import PrimaryDatePicker from "@/components/input/PrimaryDatePicker";
import Script from "next/script";

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
  const [value, onChange] = useState<Value>([new Date(), new Date()]);

  const [selectedStatusItem, setSelectedStatusItem] =
    useState<DropdownFilterItemProps>();

  const [data, setData] = useState(() => transactions);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        header: "Detail Order",
        cell: (info) => (
          <div className="py-4 sm:pl-6 pr-3 text-sm font-medium text-gray-900">
            <div className="flex flex-col space-y-2">
              <p className="text-gray-500 line-clamp-1 text-ellipsis text-xs">
                {info.row.original.invoiceNumber}
              </p>
              <p className="text-gray-800 line-clamp-1 text-ellipsis">
                {info.row.original.title}
              </p>
            </div>
          </div>
        ),
      },
      {
        header: "Status",
        cell: (info) => (
          <div className="w-1/2">
            <div className="py-1 bg-emerald-100 border-green border-2 rounded-lg text-green w-auto text-center">
              <p>{info.row.original.status}</p>
            </div>
          </div>
        ),
      },
      {
        header: "Total Harga",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            Rp{info.row.original.totalPrice}
          </div>
        ),
      },
      {
        header: "Tanggal Upacara",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {/* {info.row.original.ceremonyDate.toISOString()} */}
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
      <h1 className="font-bold text-xl mb-8">Transaksi</h1>
      <PrimaryTable
        title="Riwayat Transaksi"
        mainActionTitle="Tambah Transaksi"
        // onFilterReset={() => {}}
        // filters={
        //   <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center flex-1 relative">
        //     <PrimaryDatePicker
        //       setValue={(value) => {}}
        //       value={[new Date(), new Date()]}
        //     />

        //     <DropdownFilter
        //       label="Status"
        //       selectedItem={selectedStatusItem}
        //       setSelectedItem={setSelectedStatusItem}
        //       icon={CheckCircleIcon}
        //       items={status}
        //     />

        //     <DropdownFilter
        //       label="Tipe Pembayaran"
        //       selectedItem={selectedStatusItem}
        //       setSelectedItem={setSelectedStatusItem}
        //       icon={CreditCardIcon}
        //       items={status}
        //     />

        //     <PrimaryInput
        //       onChange={(e) => {}}
        //       value={""}
        //       placeholder="Cari transaksi"
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
        mainActionOnClick={() => {
          setOpen(true);
        }}
        columns={columns}
        data={data ?? []}
        isLoading={false}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={5}
        limitPage={10}
        isCommon={true}
      />

      {/* Dialog Add Transaction*/}
      <TransactionModal
        open={open}
        setOpen={setOpen}
        title="Tambah Transaksi"
      />

      {/* Dialog PRE-PAID Transaction*/}
      <TransactionModal
        open={openDetail}
        setOpen={setOpenDetail}
        title="Detail Transaksi"
      />
    </>
  );
}
