"use client";

import { getDictionary, Locale } from "../../dictionaries";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import PrimaryTable from "@/components/table/PrimaryTable";
import AddArticleCategoryModal from "./components/AddArticleCategoryModal";
import ArticleCategoryRequest from "@/data/models/article/request/article_category_request";
import ArticleCategory from "@/data/models/article/response/article_category";
import { useArticleCategory } from "@/hooks/article/use_article_category";
import DetailArticleCategoryModal from "./components/DetailArticleCategoryModal";
import DeleteArticleCategoryModal from "./components/DeleteArticleCategoryModal";

export default function ArticleCategoryPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = getDictionary(lang);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articleCategoryRequest, setArticleCategoryRequest] =
    useState<ArticleCategoryRequest>({
      name: "",
    });

  const { allArticleCategory } = useArticleCategory();

  const columns = useMemo<ColumnDef<ArticleCategory>[]>(
    () => [
      {
        header: "Judul Kategori Artikel",
        cell: (info) => (
          <div className="py-4 sm:pl-8 pr-3 text-sm font-medium text-gray-900">
            <p className="text-gray-500 line-clamp-1 text-ellipsis pr-6">
              {info.row.original.name}
            </p>
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
              <DetailArticleCategoryModal
                id={info.row.original.id}
                data={{ name: info.row.original.name }}
              />
              <DeleteArticleCategoryModal
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

  return (
    <>
      <h1 className="font-bold text-xl mb-8">Kategori Artikel</h1>
      <PrimaryTable
        title="Kategori Artikel"
        mainActionTitle="Tambah Kategori Artikel"
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
        data={allArticleCategory?.data ?? []}
        isLoading={false}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={5}
        limitPage={10}
        isCommon={true}
      />

      {/* Dialog Add Article Category */}
      <AddArticleCategoryModal
        open={open}
        setOpen={setOpen}
        data={articleCategoryRequest}
        setData={setArticleCategoryRequest}
      />

      {/* Confirmation Dialog */}
      {/* <AlertConfirmationModal
        onRightClick={() => {
          setOpenActiveConfirmation(false);
        }}
        open={openActiveConfirmation}
        setOpen={setOpenActiveConfirmation}
        title="Konfirmasi"
        description="Apakah Anda yakin untuk menonaktifkan akun Katrina Hegmann?"
        rightButtonLabel="Lanjutkan"
        leftButtonLabel="Batal"
      /> */}
    </>
  );
}
