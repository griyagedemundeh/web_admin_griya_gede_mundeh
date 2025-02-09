"use client";

import { getDictionary, Locale } from "../../dictionaries";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import PrimaryTable from "@/components/table/PrimaryTable";
import AddCeremonyCategoryModal from "./components/AddCeremonyCategoryModal";
import CeremonyCategoryRequest from "@/data/models/ceremony/request/ceremony_category_request";
import { useCeremonyCategory } from "@/hooks/ceremony/use_ceremony_category";
import CeremonyCategory from "@/data/models/ceremony/response/ceremony_category";
import Images from "@/constants/images";
import DetailCeremonyCategoryModal from "./components/DetailCeremonyCategoryModal";
import DeleteCeremonyCategoryModal from "./components/DeleteCeremonyCategoryModal";

export default function CeremonyCategoryPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = getDictionary(lang);
  const [open, setOpen] = useState(false);

  const { allCeremonyCategory } = useCeremonyCategory();

  const [ceremonyCategoryRequest, setCeremonyCategoryRequest] =
    useState<CeremonyCategoryRequest>({
      name: "",
      icon: null,
      description: "",
    });

  const columnsCategories = useMemo<ColumnDef<CeremonyCategory>[]>(
    () => [
      {
        header: "Kategori Upacara Agama",
        cell: (info) => (
          <div className="py-4 sm:pl-8 pr-3 text-sm font-medium text-gray-900">
            <div className="flex flex-row space-x-4 items-center">
              <Image
                alt={info.row.original.name}
                src={info.row.original.icon ?? Images.dummyProfile}
                className="h-10 w-10 rounded-full bg-gray-50 object-cover"
                height={40}
                width={40}
                objectFit="cover"
              />
              <div>
                <p className="font-bold">{info.row.original.name}</p>
              </div>
            </div>
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
              <DetailCeremonyCategoryModal
                id={info.row.original.id}
                data={{
                  name: info.row.original.name,
                  description: info.row.original.description,
                  icon: info.row.original.icon ?? "",
                }}
              />
              <DeleteCeremonyCategoryModal
                data={{
                  name: info.row.original.name,
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

  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <>
      <h1 className="font-bold text-xl mb-8">Kategori Upacara Agama</h1>

      <PrimaryTable
        title="Kategori Upacara Agama"
        mainActionTitle="Tambah Kategori Upacara Agama"
        // onFilterReset={() => {}}
        // filters={
        //   <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center lg:w-8/12 w-full">
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
        //       placeholder="Cari Kategori Upacara Agama"
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
        columns={columnsCategories}
        data={allCeremonyCategory?.data ?? []}
        isLoading={false}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={5}
        isCommon={true}
      />

      {/* Dialog Add Category */}
      <AddCeremonyCategoryModal
        open={open}
        setOpen={setOpen}
        data={ceremonyCategoryRequest}
        setData={setCeremonyCategoryRequest}
      />
    </>
  );
}
