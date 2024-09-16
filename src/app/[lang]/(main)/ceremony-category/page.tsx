"use client";

import {
  CheckCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { getDictionary, Locale } from "../../dictionaries";
import PrimaryInput from "@/components/input/PrimaryInput";
import Image from "next/image";
import {
  CheckBadgeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import DropdownFilter from "@/components/dropdown/DropdownFilter";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import IconButton from "@/components/button/IconButton";
import Ceremony from "@/data/models/ceremony";
import { ceremonies, status } from "@/utils/dummyData";

import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import AlertDangerModal from "@/components/modal/AlertDangerModal";
import PrimaryTable from "@/components/table/PrimaryTable";
import SwitchInput from "@/components/input/SwitchInput";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import CeremonyCategoryModal from "./components/CeremonyCategoryModal";
import AlertConfirmationModal from "@/components/modal/AlertConfirmationModal";

export default function CeremonyPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = getDictionary(lang);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [active, setActive] = useState<boolean>(true);
  const [openActiveConfirmation, setOpenActiveConfirmation] = useState(false);

  const [selectedStatusItem, setSelectedStatusItem] =
    useState<DropdownFilterItemProps>();

  const columnsCategories = useMemo<ColumnDef<Ceremony>[]>(
    () => [
      {
        header: "Kategori Upacara Agama",
        cell: (info) => (
          <div className="py-4 sm:pl-8 pr-3 text-sm font-medium text-gray-900">
            <div className="flex flex-row space-x-4 items-center">
              <Image
                alt={info.row.original.title}
                src={info.row.original.thumbnailUrl}
                className="h-10 w-10 rounded-full bg-gray-50 object-cover"
                height={40}
                width={40}
                objectFit="cover"
              />
              <div>
                <p className="font-bold">{info.row.original.title}</p>
              </div>
            </div>
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

  const [data, setData] = useState(() => ceremonies);
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <>
      <h1 className="font-bold text-xl mb-8">Kategori Upacara Agama</h1>

      <PrimaryTable
        title="Upacara Kategori Agama"
        mainActionTitle="Tambah Kategori Upacara Agama"
        onFilterReset={() => {}}
        filters={
          <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center lg:w-8/12 w-full">
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
              placeholder="Cari Kategori Upacara Agama"
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
        columns={columnsCategories}
        data={data ?? []}
        isLoading={false}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={5}
        limitPage={10}
        isCommon={true}
      />

      {/* Dialog Add Category */}
      <CeremonyCategoryModal
        open={open}
        setOpen={setOpen}
        title="Tambah Kategori Upacara Agama"
        bottomAction={
          <PrimaryWithIconButton
            label="Simpan"
            onClick={() => {}}
            icon={CheckBadgeIcon}
          />
        }
      />

      <CeremonyCategoryModal
        open={openDetail}
        setOpen={setOpenDetail}
        isForDetail={true}
        title="Tambah Kategori Upacara Agama"
        activeCeremonyCategory={active}
        setActiveCeremonyCategory={(e) => {
          setActive(e);
          setOpenActiveConfirmation(true);
        }}
        bottomAction={
          <PrimaryWithIconButton
            label="Simpan"
            onClick={() => {}}
            icon={CheckBadgeIcon}
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
