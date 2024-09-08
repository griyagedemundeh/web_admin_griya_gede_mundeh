"use client";

import {
  CheckCircleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TagIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { getDictionary } from "../../dictionaries";
import PrimaryInput from "@/components/input/PrimaryInput";
import Image from "next/image";
import {
  ExclamationTriangleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Field, Label, Switch } from "@headlessui/react";
import DropdownFilter from "@/components/dropdown/DropdownFilter";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import { useEffect, useMemo, useState } from "react";
import {
  createColumnHelper,
  RowModel,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import Divider from "@/components/mini/Divider";
import IconButton from "@/components/button/IconButton";

import CeremonyPackage from "@/data/models/ceremonyPackage";
import AddCeremonyModal from "./components/AddCeremonyModal";
import Ceremony from "@/data/models/ceremony";
import { categories, ceremonies, status } from "@/utils/dummyData";
import Pagination from "@/components/mini/Pagination";
import DetailCeremonyModal from "./components/DetailCeremonyModal";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import AlertModal from "@/components/modal/AlertModal";

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

  const columnHelper = createColumnHelper<Ceremony>();
  const columns = useMemo(
    () => [],
    [
      columnHelper.accessor("title", {
        cell: (info) => info.getValue(),
      }),
      ,
      columnHelper.accessor("kategori", {
        cell: (info) => info.getValue(),
      }),
      ,
      columnHelper.accessor("status", {
        cell: (info) => info.getValue(),
      }),
      ,
      ,
    ]
  );

  const [data, setData] = useState(() => ceremonies);
  const [progress, setProgress] = useState<number>(33.33);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: function (
      table: Table<Ceremony>
    ): () => RowModel<Ceremony> {
      throw new Error("Function not implemented.");
    },
  });

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
      <div>
        <h1 className="font-bold text-xl mb-8">Upacara Agama</h1>
        <div
          className="bg-white rounded-xl  w-full"
          style={{ boxShadow: "0 0px 5px rgba(209, 213, 219, 0.6)" }}
        >
          <div className="px-8 py-6 flex flex-row justify-between w-full items-center">
            <h2 className="font-bold text-primary1">Upacara Agama</h2>

            <PrimaryWithIconButton
              label={"Tambah Upacara"}
              onClick={() => {
                setOpen(true);
              }}
              icon={PlusIcon}
            />
          </div>
          <Divider />

          <div className="py-8">
            <div>
              <div className="sm:flex sm:items-center px-4 sm:px-6 lg:px-8">
                <div className="sm:flex-auto">
                  <button
                    onClick={() => {
                      setSelectedCeremonyCategory(undefined);
                      setSelectedStatusItem(undefined);
                    }}
                    className="flex flex-row items-center hover:text-gray-900"
                  >
                    <XMarkIcon width={16} height={16} color="gray" />
                    <p className="text-sm font-semibold leading-6 text-gray-600 underline hover:text-gray-900">
                      Reset
                    </p>
                  </button>
                </div>
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
                    icon={
                      <CheckCircleIcon height={16} width={16} color="gray" />
                    }
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
              </div>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-8 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-8 w-1/2"
                          >
                            Upacara
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/6"
                          >
                            Kategori
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/6"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/6"
                          >
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {data.map((item, index) => (
                          <tr key={`${index}`} className="even:bg-gray-50">
                            <td className="py-4 sm:pl-8 pr-3 text-sm font-medium text-gray-900">
                              <div className="flex flex-row space-x-4 ">
                                <Image
                                  alt={item.title}
                                  src={item.thumbnailUrl}
                                  className="h-10 w-10 rounded-full bg-gray-50 object-cover"
                                  height={40}
                                  width={40}
                                  objectFit="cover"
                                />
                                <div>
                                  <p className="font-bold">{item.title}</p>
                                  <p className="text-xs text-gray-500 text-ellipsis line-clamp-1">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {item.kategori}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <Field className="flex items-center bg-gray-100 p-2 rounded-full">
                                <Switch
                                  checked={item.status}
                                  className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary1 focus:ring-offset-2 data-[checked]:bg-primary1"
                                >
                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                                  />
                                </Switch>
                                <Label as="span" className="ml-3 text-sm">
                                  {item.status ? (
                                    <span className="font-medium text-gray-900">
                                      Aktif
                                    </span>
                                  ) : (
                                    <span className="font-medium text-gray-400">
                                      Non-Aktif
                                    </span>
                                  )}
                                </Label>
                              </Field>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="flex flex-row space-x-2">
                                <IconBackgroundButton
                                  icon={PencilSquareIcon}
                                  colorBackground="emerald"
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
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Pagination />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
      <AlertModal
        icon={ExclamationTriangleIcon}
        onRightClick={() => {
          setOpenDelete(false);
        }}
        open={openDelete}
        setOpen={setOpenDelete}
        title="Hapus"
        description="Are you sure you want to deactivate your account? All of your data will be permanently removed from our servers forever. This action cannot be undone."
        rightButtonLabel="Lanjutkan"
        leftButtonLabel="Batal"
        headingIconColor="red"
        rightButtonColor="red-500"
      />
    </>
  );
}
