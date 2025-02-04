"use client";

import { getDictionary, Locale } from "../../dictionaries";
import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import PrimaryTable from "@/components/table/PrimaryTable";
import TransactionModal from "./components/TransactionModal";
import { useTransaction } from "@/hooks/transaction/use_transaction";
import Invoice from "@/data/models/transaction/response/invoice";
import { formatDateIndonesia, formatRupiah } from "@/utils";
import DetailTransactionModal from "./components/DetailTransactionModal";
import PrimaryInput from "@/components/input/PrimaryInput";
import IconButton from "@/components/button/IconButton";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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
      <p className="text-xs">{status}</p>
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

  const {
    invoices,
    filter,
    setFilter,
    refetchInvoices,
    isLoadingGetAllInvoice,
  } = useTransaction();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [active, setActive] = useState<number>(1);

  const numberClick = (index: number) => {
    setActive(index);
    setFilter({ ...filter, page: index });
  };
  const nextClick = () => {
    if (active === invoices?.meta?.lastPage) return;
    setActive(active + 1);

    setFilter({ ...filter, page: active + 1 });
  };

  const prevClick = () => {
    if (active === 1) return;
    setActive(active - 1);

    setFilter({ ...filter, page: active - 1 });
  };

  useEffect(() => {
    setTimeout(() => {
      refetchInvoices();
    }, 1000);
  }, [filter]);

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
                {info.row.original.invoiceCeremonyHistory?.ceremonyService
                  ?.title &&
                info.row.original.invoiceCeremonyHistory.ceremonyService?.title
                  ?.length < 40
                  ? info.row.original.invoiceCeremonyHistory.ceremonyService
                      ?.title
                  : info.row.original.invoiceCeremonyHistory.ceremonyService?.title
                      ?.slice(0, 40)
                      .concat("...")}
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
              ? formatDateIndonesia(info.row.original?.paidAt)
              : "Belum Bayar/Belum Lunas"}
          </div>
        ),
      },
      {
        header: "Aksi",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="flex flex-row space-x-2">
              <DetailTransactionModal
                title={`Detail - ${info.row.original?.id}`}
                invoice={info.row.original}
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
        filters={
          <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center flex-1 relative">
            {/* <PrimaryDatePicker
              setValue={(value) => {}}
              value={[new Date(), new Date()]}
            />

            <DropdownFilter
              label="Status"
              selectedItem={selectedStatusItem}
              setSelectedItem={setSelectedStatusItem}
              icon={CheckCircleIcon}
              items={status}
            />

            <DropdownFilter
              label="Tipe Pembayaran"
              selectedItem={selectedStatusItem}
              setSelectedItem={setSelectedStatusItem}
              icon={CreditCardIcon}
              items={status}
            /> */}

            <PrimaryInput
              onChange={(e) => {
                setFilter({ ...filter, search: e.target.value });
              }}
              value={filter.search ?? ""}
              placeholder="Cari transaksi"
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
        mainActionOnClick={() => {
          setOpen(true);
        }}
        columns={columns}
        data={invoices?.data ?? []}
        isLoading={isLoadingGetAllInvoice}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={invoices?.meta?.total}
        last={invoices?.meta?.lastPage}
        onNumberClick={numberClick}
        onNext={nextClick}
        onPrev={prevClick}
        active={active}
      />

      {/* Dialog Add Transaction*/}
      <TransactionModal
        open={open}
        setOpen={setOpen}
        title="Tambah Transaksi"
      />
    </>
  );
}
