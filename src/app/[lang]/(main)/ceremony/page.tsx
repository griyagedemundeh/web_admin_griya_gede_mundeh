"use client";

import {
  CheckCircleIcon,
  MagnifyingGlassIcon,
  TagIcon,
} from "@heroicons/react/20/solid";
import { getDictionary } from "../../dictionaries";
import PrimaryInput from "@/components/input/PrimaryInput";
import Image from "next/image";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Field, Label, Switch } from "@headlessui/react";
import DropdownFilter from "@/components/dropdown/DropdownFilter";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import IconButton from "@/components/button/IconButton";

import CeremonyPackage from "@/data/models/ceremonyPackage";
import AddCeremonyModal from "./components/AddCeremonyModal";
import Ceremony from "@/data/models/ceremony";
import { categories, ceremonies, status } from "@/utils/dummyData";
import DetailCeremonyModal from "./components/DetailCeremonyModal";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import AlertDangerModal from "@/components/modal/AlertDangerModal";
import PrimaryTable from "@/components/table/PrimaryTable";

export default function CeremonyPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const t = getDictionary(lang);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedCeremonyCategory, setSelectedCeremonyCategory] =
    useState<DropdownFilterItemProps>();
  const [selectedStatusItem, setSelectedStatusItem] =
    useState<DropdownFilterItemProps>();

  const columns = useMemo<ColumnDef<Ceremony>[]>(
    () => [
      {
        header: "Upacara Agama",
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
                {/* <p className="text-xs text-gray-500 text-ellipsis line-clamp-1">
                  {info.row.original.description}
                </p> */}
              </div>
            </div>
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
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <Field className="flex items-center bg-gray-100 p-2 rounded-full">
              <Switch
                checked={info.row.original.status}
                className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary1 focus:ring-offset-2 data-[checked]:bg-primary1"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                />
              </Switch>
              <Label as="span" className="ml-3 text-sm">
                {info.row.original.status ? (
                  <span className="font-medium text-gray-900">Aktif</span>
                ) : (
                  <span className="font-medium text-gray-400">Non-Aktif</span>
                )}
              </Label>
            </Field>
          </div>
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
  const [progress, setProgress] = useState<number>(33.33);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [ceremonyPackages, setCeremonyPackages] = useState<CeremonyPackage[]>([
    { id: `${new Date()}`, title: "", price: "0", description: "" },
  ]);
  const [selectedCeremonyPackage, setSelectedCeremonyPackage] =
    useState<CeremonyPackage>();

  const removeCeremonyPackage = () => {
    setCeremonyPackages(
      ceremonyPackages.filter((item) => item.id !== selectedCeremonyPackage?.id)
    );
  };

  useEffect(() => {
    removeCeremonyPackage();
  }, [selectedCeremonyPackage]);

  return (
    <>
      <h1 className="font-bold text-xl mb-8">Upacara Agama</h1>
      <PrimaryTable
        title="Upacara Agama"
        mainActionTitle="Tambah Upacara Agama"
        onFilterReset={() => {}}
        filters={
          <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center lg:w-8/12 w-full">
            <DropdownFilter
              label="Kategori"
              selectedItem={selectedCeremonyCategory}
              setSelectedItem={setSelectedCeremonyCategory}
              icon={<TagIcon height={16} width={16} color="gray" />}
              items={categories}
            />
            <DropdownFilter
              label="Status"
              selectedItem={selectedStatusItem}
              setSelectedItem={setSelectedStatusItem}
              icon={<CheckCircleIcon height={16} width={16} color="gray" />}
              items={status}
            />

            <PrimaryInput
              onChange={(e) => {}}
              value={""}
              placeholder="Cari Upacara"
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

      {/* Dialog Add Ceremony*/}
      <AddCeremonyModal
        ceremonyCategories={ceremonyPackages}
        ceremonyPackages={ceremonyPackages}
        open={open}
        progress={progress}
        selectedCeremonyCategory={selectedCeremonyCategory}
        setCeremonyPackages={setCeremonyPackages}
        setOpen={setOpen}
        setProgress={setProgress}
        setSelectedCeremonyCategory={setSelectedCeremonyCategory}
        setSelectedCeremonyPackage={setSelectedCeremonyPackage}
      />
      {/* Dialog Detail Ceremony*/}
      <DetailCeremonyModal
        ceremonyCategories={ceremonyPackages}
        ceremonyPackages={ceremonyPackages}
        open={openDetail}
        progress={progress}
        selectedCeremonyCategory={selectedCeremonyCategory}
        setCeremonyPackages={setCeremonyPackages}
        setOpen={setOpenDetail}
        setProgress={setProgress}
        setSelectedCeremonyCategory={setSelectedCeremonyCategory}
        setSelectedCeremonyPackage={setSelectedCeremonyPackage}
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
    </>
  );
}
