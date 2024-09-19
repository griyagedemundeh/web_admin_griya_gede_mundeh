"use client";

import {
  CheckCircleIcon,
  CreditCardIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TagIcon,
  UserPlusIcon,
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

export default function TransactionPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = getDictionary(lang);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openActiveConfirmation, setOpenActiveConfirmation] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const [selectedStatusItem, setSelectedStatusItem] =
    useState<DropdownFilterItemProps>();

  const [data, setData] = useState(() => transactions);
  const [active, setActive] = useState<boolean>(true);
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
            {info.row.original.ceremonyDate.toISOString()}
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
        onFilterReset={() => {}}
        filters={
          <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center  w-full">
            <div className="w-full">
              <div
                id="date-range-picker"
                date-rangepicker
                className="flex items-center w-full"
              >
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input
                    id="datepicker-range-start"
                    name="start"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary1 focus:border-primary1 block w-full ps-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary1 dark:focus:border-primary1"
                    placeholder="Select date start"
                  />
                </div>
                <span className="mx-4 text-gray-500">to</span>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input
                    id="datepicker-range-end"
                    name="end"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary1 focus:border-primary1 block w-full ps-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary1 dark:focus:border-primary1"
                    placeholder="Select date end"
                  />
                </div>
              </div>
            </div>

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
            />

            <PrimaryInput
              onChange={(e) => {}}
              value={""}
              placeholder="Cari transaksi"
              className="w-full"
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
        bottomAction={
          <PrimaryWithIconButton
            label="Simpan"
            onClick={() => {}}
            icon={UserPlusIcon}
          />
        }
      />

      {/* Dialog Detail Transaction*/}
      {/* <UserModal
        open={openDetail}
        isForDetail={true}
        setOpen={setOpenDetail}
        activeUser={active}
        setActiveUser={(e) => {
          setActive(e);
          setOpenActiveConfirmation(true);
        }}
        title="Detail Pengguna"
        bottomAction={
          <PrimaryWithIconButton
            label="Perbarui"
            onClick={() => {}}
            icon={PencilIcon}
          />
        }
      /> */}
    </>
  );
}
