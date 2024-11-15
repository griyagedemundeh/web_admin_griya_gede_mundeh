"use client";

import { getDictionary, Locale } from "../../dictionaries";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import PrimaryTable from "@/components/table/PrimaryTable";
import TransactionModal from "./components/TransactionModal";
import { useTransaction } from "@/hooks/transaction/use_transaction";
import Invoice from "@/data/models/transaction/response/invoice";
import { formatDateIndonesia, formatRupiah } from "@/utils";

const StatusBadge = ({ status }: { status: string }): React.ReactElement => {
  let bgColor = "";
  let borderColor = "";
  let textColor = "";

  switch (status) {
    case "success":
      bgColor = "bg-emerald-100";
      borderColor = "border-green";
      textColor = "text-green";
      break;
    case "pending":
      bgColor = "bg-yellow-100";
      borderColor = "border-yellow-500";
      textColor = "text-yellow-500";
      break;
    case "failed":
      bgColor = "bg-red-100";
      borderColor = "border-red-500";
      textColor = "text-red-500";
      break;
    default:
      bgColor = "bg-gray-100";
      borderColor = "border-gray-300";
      textColor = "text-gray-600";
  }

  return (
    <div
      className={`py-1 ${bgColor} ${borderColor} border-2 rounded-lg ${textColor} w-auto text-center capitalize`}
    >
      <p>{status}</p>
    </div>
  );
};

export default function TransactionPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = getDictionary(lang);
  const [open, setOpen] = useState(false);

  const [openDetail, setOpenDetail] = useState(false);

  const { invoices } = useTransaction();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const columns = useMemo<ColumnDef<Invoice>[]>(
    () => [
      {
        header: "Detail Order",
        cell: (info) => (
          <div className="py-4 sm:pl-6 pr-3 text-sm font-medium text-gray-900">
            <div className="flex flex-col space-y-2">
              <p className="text-gray-500 line-clamp-1 text-ellipsis text-xs">
                {info.row.original.id}
              </p>
              <p className="text-gray-800 line-clamp-1 text-ellipsis">
                {info.row.original.status}
              </p>
            </div>
          </div>
        ),
      },
      {
        header: "Status",
        cell: (info) => (
          <div className="w-1/2">
            {StatusBadge({ status: info.row.original.status })}
          </div>
        ),
      },
      {
        header: "Total Harga",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {formatRupiah(info.row.original.totalPrice)}
          </div>
        ),
      },
      {
        header: "Tanggal Pembayaran",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {info.row.original?.paidAt
              ? formatDateIndonesia(info.row.original?.createdAt)
              : "Belum Bayar/Lunas"}
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
        data={invoices?.data ?? []}
        isLoading={false}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={5}
        limitPage={1000}
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
