"use client";

import { getDictionary, Locale } from "../../dictionaries";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import PrimaryTable from "@/components/table/PrimaryTable";
import AddArticleModal from "./components/AddArticleModal";
import ListDataRequest from "@/data/models/base/list_data_request";
import { useArticle } from "@/hooks/article/use_article";

import ArticleRequest from "@/data/models/article/request/article_request";
import DeleteArticleModal from "./components/DeleteArticleModal";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import Images from "@/constants/images";
import DetailArticleModal from "./components/DetailArticleModal";
import { Article } from "@/data/models/article/response/article";
import PrimaryInput from "@/components/input/PrimaryInput";
import IconButton from "@/components/button/IconButton";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function ArticlePage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = getDictionary(lang);
  const [open, setOpen] = useState(false);

  const [articleRequest, setArticleRequest] = useState<ArticleRequest>({
    articleCategoryId: "",
    title: "",
    thumbnail: null,
    content: "",
    isPublish: false,
  });

  const [selectedArticleCategory, setSelectedArticleCategory] =
    useState<DropdownFilterItemProps>();

  const {
    allArticle,
    isAllArticleLoading,
    refetchAllArticle,
    filter,
    setFilter,
  } = useArticle();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [active, setActive] = useState<number>(1);

  const numberClick = (index: number) => {
    setActive(index);
    setFilter({ ...filter, page: index });
  };
  const nextClick = () => {
    if (active === allArticle?.meta?.lastPage) return;
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
      refetchAllArticle();
    }, 1000);
  }, [filter]);

  const columns = useMemo<ColumnDef<Article>[]>(
    () => [
      {
        header: "Judul Artikel",
        cell: (info) => (
          <div className="py-4 sm:pl-8 pr-3 text-sm font-medium text-gray-900">
            <div className="flex flex-row space-x-4 items-center">
              {info.row.original?.thumbnail !== undefined ? (
                <Image
                  alt={info.row.original.title}
                  src={info.row.original.thumbnail ?? ""}
                  className="h-10 w-10 rounded-md bg-gray-50 object-cover"
                  height={40}
                  width={40}
                  objectFit="cover"
                />
              ) : (
                <Image
                  alt={info.row.original.title}
                  src={Images.dummyProfile}
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
            {info.row.original.articleCategory?.name ?? "Tidak ada kategori"}
          </div>
        ),
      },

      {
        header: "Aksi",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="flex flex-row space-x-2">
              <DetailArticleModal
                id={info.row.original.id}
                data={{
                  title: info.row.original.title,
                  articleCategoryId: info.row.original.articleCategory
                    ?.id as number,
                  content: info.row.original.content ?? "",
                  thumbnail: info.row.original.thumbnail ?? "",
                }}
                category={info.row.original.articleCategory}
              />
              <DeleteArticleModal
                data={{
                  title: info.row.original.title,
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
      <h1 className="font-bold text-xl mb-8">Artikel</h1>
      <PrimaryTable
        title="Artikel"
        mainActionTitle="Tambah Artikel"
        // onFilterReset={() => {}}
        filters={
          <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center flex-1 relative">
            {/* <PrimaryDatePicker
              setValue={(value) => {}}
              value={[new Date(), new Date()]}
            />

            <DropdownFilter
              label="Status"
              selectedItem={selectedStatusItem}
              setSelectedItem={setSelectedStatusItem}
              icon={CheckCircleIcon}
              items={status}
            />

            <DropdownFilter
              label="Kategori"
              selectedItem={selectedStatusItem}
              setSelectedItem={setSelectedStatusItem}
              icon={TagIcon}
              items={status}
            /> */}

            <PrimaryInput
              onChange={(e) => {
                setFilter({ ...filter, search: e.target.value });
              }}
              value={filter.search ?? ""}
              placeholder="Cari Artikel"
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
        data={allArticle?.data ?? []}
        isLoading={isAllArticleLoading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={allArticle?.meta?.total}
        last={allArticle?.meta?.lastPage}
        onNumberClick={numberClick}
        onNext={nextClick}
        onPrev={prevClick}
        active={active}
      />

      <AddArticleModal
        open={open}
        setOpen={setOpen}
        data={articleRequest}
        selectedArticleCategory={selectedArticleCategory}
        setSelectedArticleCategory={setSelectedArticleCategory}
      />
    </>
  );
}
