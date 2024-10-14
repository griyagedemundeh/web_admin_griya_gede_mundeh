"use client";

import { getDictionary, Locale } from "../../dictionaries";
import Image from "next/image";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import AddCeremonyModal from "./components/AddCeremonyModal";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import PrimaryTable from "@/components/table/PrimaryTable";
import { useCeremony } from "@/hooks/ceremony/use_ceremony";
import { CeremonyInList } from "@/data/models/ceremony/response/ceremony";
import Images from "@/constants/images";
import DeleteCeremonyModal from "./components/DeleteCeremonyModal";

export default function CeremonyPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = getDictionary(lang);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedCeremonyCategory, setSelectedCeremonyCategory] =
    useState<DropdownFilterItemProps>();
  const [selectedStatusItem, setSelectedStatusItem] =
    useState<DropdownFilterItemProps>();

  const { allCeremony } = useCeremony();

  const columns = useMemo<ColumnDef<CeremonyInList>[]>(
    () => [
      {
        header: "Upacara Agama",
        cell: (info) => (
          <div className="py-4 sm:pl-8 pr-3 text-sm font-medium text-gray-900">
            <div className="flex flex-row space-x-4 items-center">
              {(info.row.original?.ceremonyDocumentation?.length ?? 0) > 0 &&
              info.row.original?.ceremonyDocumentation !== undefined ? (
                <Image
                  alt={info.row.original.title}
                  src={info.row.original.ceremonyDocumentation[0].photo ?? ""}
                  className="h-10 w-10 rounded-full bg-gray-50 object-cover"
                  height={40}
                  width={40}
                  objectFit="cover"
                />
              ) : (
                <Image
                  alt={info.row.original.title}
                  src={Images.dummyProfile}
                  className="h-10 w-10 rounded-full bg-gray-50 object-cover"
                  height={40}
                  width={40}
                  objectFit="cover"
                />
              )}
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
            {info.row.original.ceremonyCategory.name}
          </div>
        ),
      },
      // {
      //   header: "Status",
      //   cell: (info) => (
      //     <SwitchInput
      //       label={
      //         info.row.original.status ? (
      //           <span className="font-medium text-gray-900">Aktif</span>
      //         ) : (
      //           <span className="font-medium text-gray-400">Non-Aktif</span>
      //         )
      //       }
      //       value={info.row.original.status}
      //       onChange={(e) => {}}
      //     />
      //   ),
      // },
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

              {/* <IconBackgroundButton
                icon={TrashIcon}
                colorBackground="rose"
                colorIcon="red"
                onClick={() => {
                  setOpenDelete(true);
                }}
              /> */}
              <DeleteCeremonyModal
                data={{
                  name: info.row.original.title,
                  id: info.row.original.id,
                }}
              />
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const [progress, setProgress] = useState<number>(33.33);
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <>
      <h1 className="font-bold text-xl mb-8">Upacara Agama</h1>
      <PrimaryTable
        title="Upacara Agama"
        mainActionTitle="Tambah Upacara Agama"
        // onFilterReset={() => {}}
        // filters={
        //   <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center lg:w-8/12 w-full">
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
        //       placeholder="Cari Upacara"
        //       className="w-full"
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
        data={allCeremony?.data ?? []}
        isLoading={false}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={5}
        limitPage={10}
        isCommon={true}
      />

      {/* Dialog Add Ceremony*/}
      <AddCeremonyModal
        open={open}
        progress={progress}
        selectedCeremonyCategory={selectedCeremonyCategory}
        setOpen={setOpen}
        setProgress={setProgress}
        setSelectedCeremonyCategory={setSelectedCeremonyCategory}
      />
      {/* Dialog Detail Ceremony*/}
      {/* <DetailCeremonyModal
        ceremonyCategories={categories}
        ceremonyPackages={ceremonyPackages}
        open={openDetail}
        progress={progress}
        selectedCeremonyCategory={selectedCeremonyCategory}
        setCeremonyPackages={setCeremonyPackages}
        setOpen={setOpenDetail}
        setProgress={setProgress}
        setSelectedCeremonyCategory={setSelectedCeremonyCategory}
        setSelectedCeremonyPackage={setSelectedCeremonyPackage}
      /> */}

      {/* Delete Dialog */}
      {/* <AlertDangerModal
        onRightClick={() => {
          setOpenDelete(false);
        }}
        open={openDelete}
        setOpen={setOpenDelete}
        title="Hapus"
        description="Are you sure you want to deactivate your account? All of your data will be permanently removed from our servers forever. This action cannot be undone."
        rightButtonLabel="Lanjutkan"
        leftButtonLabel="Batal"
      /> */}
    </>
  );
}
