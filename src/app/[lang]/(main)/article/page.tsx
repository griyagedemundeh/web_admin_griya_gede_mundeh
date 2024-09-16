"use client";

import {
  CheckCircleIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TagIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import { getDictionary } from "../../dictionaries";
import PrimaryInput from "@/components/input/PrimaryInput";
import Image from "next/image";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import DropdownFilter from "@/components/dropdown/DropdownFilter";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import IconButton from "@/components/button/IconButton";
import { articles, status } from "@/utils/dummyData";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import AlertDangerModal from "@/components/modal/AlertDangerModal";
import PrimaryTable from "@/components/table/PrimaryTable";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import SwitchInput from "@/components/input/SwitchInput";
import AlertConfirmationModal from "@/components/modal/AlertConfirmationModal";
import UserModal from "./components/UserModal";
import Article from "@/data/models/article";

export default function ArticlePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const t = getDictionary(lang);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openActiveConfirmation, setOpenActiveConfirmation] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const [selectedStatusItem, setSelectedStatusItem] =
    useState<DropdownFilterItemProps>();

  const [data, setData] = useState(() => articles);
  const [active, setActive] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const columns = useMemo<ColumnDef<Article>[]>(
    () => [
      {
        header: "Judul Artikel",
        cell: (info) => (
          <div className="py-4 sm:pl-8 pr-3 text-sm font-medium text-gray-900">
            <div className="flex flex-row space-x-4 items-center">
              <Image
                alt={info.row.original.title}
                src={
                  info.row.original.thumbnailString ??
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                }
                className="h-10 w-10 rounded-md bg-gray-50 object-cover"
                height={40}
                width={40}
                objectFit="cover"
              />
              <p className="text-gray-500 line-clamp-1 text-ellipsis pr-6">
                {info.row.original.title}
              </p>
            </div>
          </div>
        ),
      },
      {
        header: "Tanggal Posting",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {info.row.original.postedDate.toISOString()}
          </div>
        ),
      },
      {
        header: "Kategori",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {info.row.original.kategori}
          </div>
        ),
      },
      {
        header: "Status",
        cell: (info) => (
          <SwitchInput
            label={
              info.row.original.status ? (
                <span className="font-medium text-gray-900">Aktif</span>
              ) : (
                <span className="font-medium text-gray-400">Non-Aktif</span>
              )
            }
            value={info.row.original.status}
            onChange={(e) => {}}
          />
        ),
      },
      {
        header: "Aksi",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="flex flex-row space-x-2">
              <IconBackgroundButton
                icon={PencilSquareIcon}
                colorBackground="emerald"
                className="bg-emerald-100"
                colorIcon="green"
                onClick={() => {
                  setOpenDetail(true);
                }}
              />

              <IconBackgroundButton
                icon={TrashIcon}
                colorBackground="rose"
                colorIcon="red"
                onClick={() => {
                  setOpenDelete(true);
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
      <h1 className="font-bold text-xl mb-8">Artikel</h1>
      <PrimaryTable
        title="Artikel"
        mainActionTitle="Tambah Artikel"
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
              label="Kategori"
              selectedItem={selectedStatusItem}
              setSelectedItem={setSelectedStatusItem}
              icon={TagIcon}
              items={status}
            />

            <PrimaryInput
              onChange={(e) => {}}
              value={""}
              placeholder="Cari artikel"
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

      {/* Dialog Add User*/}
      <UserModal
        open={open}
        setOpen={setOpen}
        title="Tambah Pengguna"
        bottomAction={
          <PrimaryWithIconButton
            label="Simpan"
            onClick={() => {}}
            icon={UserPlusIcon}
          />
        }
      />

      {/* Dialog Detail User*/}
      <UserModal
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
      />

      {/* Delete Dialog */}
      <AlertDangerModal
        onRightClick={() => {
          setOpenDelete(false);
        }}
        open={openDelete}
        setOpen={setOpenDelete}
        title="Hapus"
        description="Are you sure you want to deactivate your account? All of your data will be permanently removed from our servers forever. This action cannot be undone."
        rightButtonLabel="Lanjutkan"
        leftButtonLabel="Batal"
      />
      {/* Confirmation Dialog */}
      <AlertConfirmationModal
        onRightClick={() => {
          setOpenActiveConfirmation(false);
        }}
        open={openActiveConfirmation}
        setOpen={setOpenActiveConfirmation}
        title="Konfirmasi"
        description="Apakah Anda yakin untuk menonaktifkan akun Katrina Hegmann?"
        rightButtonLabel="Lanjutkan"
        leftButtonLabel="Batal"
      />
    </>
  );
}