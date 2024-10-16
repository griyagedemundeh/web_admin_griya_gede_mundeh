"use client";

import { getDictionary, Locale } from "../../dictionaries";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { articles } from "@/utils/dummyData";
import PrimaryTable from "@/components/table/PrimaryTable";
import Article from "@/data/models/article";
import AddArticleModal from "./components/AddArticleModal";
import ArticleCategoryRequest from "@/data/models/article/request/article_category_request";

export default function ArticlePage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = getDictionary(lang);
  const [open, setOpen] = useState(false);

  const [data, setData] = useState(() => articles);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [articleCategoryRequest, setArticleCategoryRequest] =
    useState<ArticleCategoryRequest>({
      name: "",
    });

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
            {/* {info.row.original.postedDate.toISOString()} */}
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
              {/* <IconBackgroundButton
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
              /> */}
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
        // onFilterReset={() => {}}
        // filters={
        //   <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center  w-full">
        //     <PrimaryDatePicker
        //       setValue={(value) => {}}
        //       value={[new Date(), new Date()]}
        //     />

        //     <DropdownFilter
        //       label="Status"
        //       selectedItem={selectedStatusItem}
        //       setSelectedItem={setSelectedStatusItem}
        //       icon={CheckCircleIcon}
        //       items={status}
        //     />

        //     <DropdownFilter
        //       label="Kategori"
        //       selectedItem={selectedStatusItem}
        //       setSelectedItem={setSelectedStatusItem}
        //       icon={TagIcon}
        //       items={status}
        //     />

        //     <PrimaryInput
        //       onChange={(e) => {}}
        //       value={""}
        //       placeholder="Cari artikel"
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
        data={data ?? []}
        isLoading={false}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={5}
        limitPage={10}
        isCommon={true}
      />

      {/* Dialog Add Article*/}
      <AddArticleModal
        open={open}
        setOpen={setOpen}
        data={articleCategoryRequest}
        setData={setArticleCategoryRequest}
      />
    </>
  );
}
