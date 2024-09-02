"use client";

import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TagIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { getDictionary } from "../../dictionaries";
import PrimaryInput from "@/components/input/PrimaryInput";
import Image from "next/image";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Field, Label, Switch } from "@headlessui/react";
import DropdownFilter from "@/components/dropdown/DropdownFilter";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import { useState } from "react";

export default function Ceremony({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const t = getDictionary(lang);
  const [selectedItem, setSelectedItem] = useState<DropdownFilterItemProps>();
  const [selectedStatusItem, setSelectedStatusItem] =
    useState<DropdownFilterItemProps>();

  const categories: DropdownFilterItemProps[] = [
    {
      id: "1",
      title: "Dewa Yadnya",
    },
    {
      id: "2",
      title: "Manusa Yadnya",
    },
    {
      id: "3",
      title: "Pitra Yadnya",
    },
    {
      id: "4",
      title: "Rsi Yadnya",
    },
    {
      id: "5",
      title: "Butha Yadnya",
    },
  ];

  const status: DropdownFilterItemProps[] = [
    {
      id: "1",
      title: "Aktif",
    },
    {
      id: "2",
      title: "Non-Aktif",
    },
  ];

  const people = [
    {
      title: "Mebayuh",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      kategori: "Dewa Yadnya",
      thumbnailUrl:
        "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/03/22/Pawai-Ogoh-Ogoh-Awal-Mula-Kedudukan-Dalam-Tradisi-Hindu-Bali-Serta-Pesan-Sosialnya-3506145498.jpg",
      status: true,
      role: "Member",
    },
    {
      title: "Melaspas",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      kategori: "Manusa Yadnya",
      thumbnailUrl:
        "https://awsimages.detik.net.id/community/media/visual/2024/05/05/potret-mahalini-dan-rizky-febian-gelar-upacara-adat-bali-jelang-pernikahan-6_169.jpeg?w=1200",
      status: false,
      role: "Member",
    },
    {
      title: "Melaspas",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      kategori: "Manusa Yadnya",
      thumbnailUrl:
        "https://awsimages.detik.net.id/community/media/visual/2024/05/05/potret-mahalini-dan-rizky-febian-gelar-upacara-adat-bali-jelang-pernikahan-6_169.jpeg?w=1200",
      status: false,
      role: "Member",
    },
    {
      title: "Melaspas",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      kategori: "Manusa Yadnya",
      thumbnailUrl:
        "https://awsimages.detik.net.id/community/media/visual/2024/05/05/potret-mahalini-dan-rizky-febian-gelar-upacara-adat-bali-jelang-pernikahan-6_169.jpeg?w=1200",
      status: false,
      role: "Member",
    },
    {
      title: "Melaspas",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      kategori: "Manusa Yadnya",
      thumbnailUrl:
        "https://awsimages.detik.net.id/community/media/visual/2024/05/05/potret-mahalini-dan-rizky-febian-gelar-upacara-adat-bali-jelang-pernikahan-6_169.jpeg?w=1200",
      status: false,
      role: "Member",
    },
  ];

  return (
    <div>
      <h1 className="font-bold text-xl mb-8">Upacara Agama</h1>
      <div
        className="bg-white rounded-xl  w-full"
        style={{ boxShadow: "0 0px 5px rgba(209, 213, 219, 0.6)" }}
      >
        <div className="px-8 py-6 flex flex-row justify-between w-full items-center">
          <h2 className="font-bold text-primary1">Upacara Agama</h2>

          <button
            type="button"
            className="inline-flex items-center gap-x-2 rounded-md bg-primary1 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prbg-primary1"
          >
            <PlusIcon
              aria-hidden="true"
              className="-mr-0.5 h-5 w-5"
              color="white"
            />
            Tambah Upacara
          </button>
        </div>
        <div className="w-full bg-gray-300" style={{ height: 1 }}></div>

        <div className="py-8">
          <div>
            <div className="sm:flex sm:items-center px-4 sm:px-6 lg:px-8">
              <div className="sm:flex-auto">
                <button className="flex flex-row items-center hover:text-gray-900">
                  <XMarkIcon width={16} height={16} color="gray" />
                  <p className="text-sm font-semibold leading-6 text-gray-600 underline hover:text-gray-900">
                    Reset
                  </p>
                </button>
              </div>
              <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center lg:w-8/12 w-full">
                <DropdownFilter
                  label="Kategori"
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
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
                    <button
                      className="absolute top-2 right-2 hover:cursor-pointer"
                      onClick={() => {}}
                    >
                      <MagnifyingGlassIcon
                        aria-hidden="true"
                        className="h-5 w-5"
                        color="gray"
                      />
                    </button>
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
                      {people.map((person) => (
                        <tr key={person.title} className="even:bg-gray-50">
                          <td className="py-4 sm:pl-8 pr-3 text-sm font-medium text-gray-900">
                            <div className="flex flex-row space-x-4 ">
                              <Image
                                alt={person.title}
                                src={person.thumbnailUrl}
                                className="h-10 w-10 rounded-full bg-gray-50 object-cover"
                                height={40}
                                width={40}
                                objectFit="cover"
                              />
                              <div>
                                <p className="font-bold">{person.title}</p>
                                <p className="text-xs text-gray-500 text-ellipsis line-clamp-1">
                                  {person.description}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {person.kategori}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <Field className="flex items-center bg-gray-100 p-2 rounded-full">
                              <Switch
                                checked={person.status}
                                className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary1 focus:ring-offset-2 data-[checked]:bg-primary1"
                              >
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                                />
                              </Switch>
                              <Label as="span" className="ml-3 text-sm">
                                {person.status ? (
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
                              <button className="p-2 bg-emerald-100 rounded-lg hover:bg-emerald-200">
                                <PencilSquareIcon
                                  color="green"
                                  height={22}
                                  width={22}
                                />
                              </button>
                              <button className="p-2 bg-rose-100 rounded-lg hover:bg-rose-200">
                                <TrashIcon color="red" height={22} width={22} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Previous
                      </a>
                      <a
                        href="#"
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Next
                      </a>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">1</span> to{" "}
                          <span className="font-medium">10</span> of{" "}
                          <span className="font-medium">97</span> results
                        </p>
                      </div>
                      <div>
                        <nav
                          aria-label="Pagination"
                          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        >
                          <a
                            href="#"
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                              aria-hidden="true"
                              className="h-5 w-5"
                            />
                          </a>
                          {/* Current: "z-10 bg-primary1 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary1", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                          <a
                            href="#"
                            aria-current="page"
                            className="relative z-10 inline-flex items-center bg-primary1 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary2"
                          >
                            1
                          </a>
                          <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            2
                          </a>
                          <a
                            href="#"
                            className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                          >
                            3
                          </a>
                          <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                            ...
                          </span>
                          <a
                            href="#"
                            className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                          >
                            8
                          </a>
                          <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            9
                          </a>
                          <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            10
                          </a>
                          <a
                            href="#"
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon
                              aria-hidden="true"
                              className="h-5 w-5"
                            />
                          </a>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
