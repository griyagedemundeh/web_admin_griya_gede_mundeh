"use client";

import { getDictionary, Locale } from "../../dictionaries";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { articles } from "@/utils/dummyData";
import PrimaryTable from "@/components/table/PrimaryTable";
import AddArticleModal from "./components/AddArticleModal";
import ArticleCategoryRequest from "@/data/models/article/request/article_category_request";
import ListDataRequest from "@/data/models/base/list_data_request";
import { useArticle } from "@/hooks/article/use_article";
import { ArticleinList } from "@/data/models/article/response/article";
import ArticleRequest from "@/data/models/article/request/article_request";
import DeleteArticleModal from "./components/DeleteArticleModal";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import Images from "@/constants/images";
import DetailArticleModal from "./components/DetailArticleModal";

export default function ArticlePage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = getDictionary(lang);
  const [open, setOpen] = useState(false);

  const [data, setData] = useState(() => articles);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [articleRequest, setArticleRequest] = useState<ArticleRequest>({
    articleCategoryId: "",
    title: "",
    // thumbnail: null,
    // thumbnail: "",
    content: "",
    isPublish: false,
  });

  const [selectedArticleCategory, setSelectedArticleCategory] =
    useState<DropdownFilterItemProps>();

  const [listDataRequest, setListDataRequest] = useState<ListDataRequest>({
    limit: 100,
    page: 1,
  });

  const { allArticle } = useArticle();

  useEffect(() => {
    setCurrentPage(allArticle?.meta?.currentPage ?? 1);
  }, [allArticle]);

  const columns = useMemo<ColumnDef<ArticleinList>[]>(
    () => [
      {
        header: "Judul Artikel",
        cell: (info) => (
          <div className="py-4 sm:pl-8 pr-3 text-sm font-medium text-gray-900">
            <div className="flex flex-row space-x-4 items-center">
              {(info.row.original?.articleDocumentation?.length ?? 0) > 0 &&
              info.row.original?.articleDocumentation !== undefined ? (
                <Image
                  alt={info.row.original.title}
                  src={
                    info.row.original.articleDocumentation[0].thumbnail ?? ""
                  }
                  className="h-10 w-10 rounded-md bg-gray-50 object-cover"
                  height={40}
                  width={40}
                  objectFit="cover"
                />
              ) : (
                <Image
                  alt={info.row.original.title}
                  src={Images.dummyProfile}
                  //NEWWWW
                  // src={
                  //   info.row.original.articleDocumentation.length > 0 &&
                  //   info.row.original.articleDocumentation[0].thumbnail
                  //     ? URL.createObjectURL(info.row.original.articleDocumentation[0].thumbnail!)
                  //     : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  // }
                  // src={info.row.original.thumbnail ??
                  //   "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  // }
                  className="h-10 w-10 rounded-md bg-gray-50 object-cover"
                  height={40}
                  width={40}
                  objectFit="cover"
                />
              )}
              <p className="text-gray-500 line-clamp-1 text-ellipsis pr-6">
                {info.row.original.title}
              </p>
            </div>
          </div>
        ),
      },
      //NEWWW
      {
        header: "Tanggal Posting",
        cell: (info) => {
          const createdAt = info.row.original.createdAt;

          // Check if createdAt exists and format it
          const formattedDate = createdAt
            ? new Date(createdAt).toLocaleString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            : "null";
          return (
            <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {formattedDate}
            </div>
          );
        },
      },
      {
        header: "Kategori",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {/* <div
              dangerouslySetInnerHTML={{
                __html: info.row.original.articleCategory.name ?? "null",
              }}
            /> */}
            {info.row.original.articleCategory?.title ??  "Tidak ada kategori"} 
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
              <DetailArticleModal
                id={info.row.original.id}
                data={{
                  title: info.row.original.title,
                  articleCategoryId: info.row.original.articleCategory?.name,
                  content: info.row.original.content ?? "",
                  thumbnail: (info.row.original.articleDocumentation?.length ?? 0) >
                  0 && info.row.original.articleDocumentation !== undefined
                  ? info.row.original?.articleDocumentation[0].thumbnail : "",
                  // thumbnail: info.row.original.articleDocumentation?.[0]?.thumbnail ?? null,
                }}
                setData={setArticleRequest}
                selectedArticleCategory={selectedArticleCategory}
                setSelectedArticleCategory={setSelectedArticleCategory}
              />
              <DeleteArticleModal
                data={{
                  title: info.row.original.title,
                  id: info.row.original.id,
                }}
              />
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
        data={allArticle?.data ?? []}
        isLoading={false}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={allArticle?.meta?.total}
        limitPage={listDataRequest.limit}
        isCommon={true}
      />

      <AddArticleModal
        open={open}
        setOpen={setOpen}
        data={articleRequest}
        setData={setArticleRequest}
        selectedArticleCategory={selectedArticleCategory}
        setSelectedArticleCategory={setSelectedArticleCategory}
      />
    </>
  );
}
