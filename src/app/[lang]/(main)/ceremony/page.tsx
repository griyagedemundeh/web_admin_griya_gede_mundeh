"use client";

import { getDictionary, Locale } from "../../dictionaries";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import AddCeremonyModal from "./components/AddCeremonyModal";
import PrimaryTable from "@/components/table/PrimaryTable";
import { useCeremony } from "@/hooks/ceremony/use_ceremony";
import { CeremonyInList } from "@/data/models/ceremony/response/ceremony";
import Images from "@/constants/images";
import DeleteCeremonyModal from "./components/DeleteCeremonyModal";
import DetailCeremonyModal from "./components/DetailCeremonyModal";
import { CeremonyPackage } from "@/data/models/ceremony/response/ceremony_package";
import PrimaryInput from "@/components/input/PrimaryInput";
import IconButton from "@/components/button/IconButton";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function CeremonyPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = getDictionary(lang);
  const [open, setOpen] = useState(false);

  const {
    allCeremony,
    isAllCeremonyLoading,
    filter,
    setFilter,
    refecthAllCeremony,
  } = useCeremony();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [active, setActive] = useState<number>(1);

  const numberClick = (index: number) => {
    setActive(index);
    setFilter({ ...filter, page: index });
  };
  const nextClick = () => {
    if (active === allCeremony?.meta?.lastPage) return;
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
      refecthAllCeremony();
    }, 1000);
  }, [filter]);

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
              <DetailCeremonyModal
                id={info.row.original.id}
                category={{
                  id: info.row.original.ceremonyCategory.id,
                  name: info.row.original.ceremonyCategory.name,
                  description: info.row.original.ceremonyCategory.description,
                }}
                data={{
                  title: info.row.original.title,
                  ceremonyCategoryId: info.row.original.ceremonyCategory.id,
                  description: info.row.original.description,
                }}
                documentation={{
                  id:
                    (info.row.original.ceremonyDocumentation?.length ?? 0) >
                      0 && info.row.original.ceremonyDocumentation !== undefined
                      ? info.row.original?.ceremonyDocumentation[0].id
                      : "",
                  photo:
                    (info.row.original.ceremonyDocumentation?.length ?? 0) >
                      0 && info.row.original.ceremonyDocumentation !== undefined
                      ? info.row.original?.ceremonyDocumentation[0].photo
                      : "",
                }}
                packages={
                  info.row.original.ceremonyPackages as CeremonyPackage[]
                }
              />

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

  return (
    <>
      <h1 className="font-bold text-xl mb-8">Upacara Agama</h1>
      <PrimaryTable
        title="Upacara Agama"
        mainActionTitle="Tambah Upacara Agama"
        // onFilterReset={() => {}}
        filters={
          <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center flex-1 relative">
            {/* <PrimaryDatePicker
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
            /> */}

            <PrimaryInput
              onChange={(e) => {
                setFilter({ ...filter, search: e.target.value });
              }}
              value={filter.search ?? ""}
              placeholder="Cari Upacara Agama"
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
        data={allCeremony?.data ?? []}
        isLoading={isAllCeremonyLoading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={allCeremony?.meta?.total}
        last={allCeremony?.meta?.lastPage}
        onNumberClick={numberClick}
        onNext={nextClick}
        onPrev={prevClick}
        active={active}
      />

      {/* Dialog Add Ceremony*/}
      <AddCeremonyModal open={open} setOpen={setOpen} />
    </>
  );
}
