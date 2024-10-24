import PrimaryInput from "@/components/input/PrimaryInput";
import { Form, Formik } from "formik";
import React, { ReactElement, useEffect, useState } from "react";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Modal from "@/components/modal/Modal";
import { useCentralStore } from "@/store";
import ArticleCategoryRequest from "@/data/models/article/request/article_category_request";
import BigFileInput from "@/components/input/image/BigFileInput";
import DropdownInput from "@/components/dropdown/DropdownInput";
import PrimaryTextEditor from "@/components/input/PrimaryTextEditor";
import { useArticle } from "@/hooks/article/use_article";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import ArticleRequest from "@/data/models/article/request/article_request";
import { addArticleCategory } from "@/hooks/article/article_category_bridge";
import articleValidation from "../validation/article_validation";
import { useArticleCategory } from "@/hooks/article/use_article_category";
import { url } from "inspector";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

interface AddArticleModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setData: (value: ArticleRequest) => void;
  data: ArticleRequest;

  // CATEGORY
  selectedArticleCategory: DropdownFilterItemProps | undefined;
  setSelectedArticleCategory: (
    value: DropdownFilterItemProps | undefined
  ) => void;
}

const AddArticleModal = ({
  open,
  setOpen,
  data,
  setData,
  selectedArticleCategory,
  setSelectedArticleCategory,
}: // CATEGORY
AddArticleModalProps): ReactElement => {
  const { setIsLoading, isLoading } = useCentralStore();

  const { addArticle, isAddArticleError, isAddArticleSuccess, article } =
    useArticle();

  const [articleCategories, setCategory] = useState<DropdownFilterItemProps[]>(
    []
  );

  // Flag untuk memastikan kategori sudah dimuat
  const [isCategoryLoaded, setIsCategoryLoaded] = useState(false);

  const { allArticleCategory } = useArticleCategory();
  // const [articleRequest, setArticleRequest] = useState<ArticleRequest>({
  //   title: "",
  //   articleCategoryId: "",
  //   content: "",
  // });

  const handleAddArticle = (articleRequest: ArticleRequest) => {
    console.log("anjay");
    setIsLoading(true);
    addArticle(articleRequest);
    setOpen(false);
  };

  // useEffect(() => {
  //   if (allArticleCategory?.data) {
  //     setCategory((prevCategories) =>
  //       prevCategories.concat(
  //         allArticleCategory.data.map((category) => ({
  //           id: category.id,
  //           title: category.name,
  //         }))
  //       )
  //     );
  //   }
  // }, [allArticleCategory?.data]);

  // useEffect(() => {

  //   if (isAddArticleSuccess) {
  //     setOpen(false);
  //   }

  //   if (isAddArticleError) {
  //     setOpen(true);
  //   }
  // }, [isAddArticleSuccess, isAddArticleError]);

  // Fetch all categories once
  useEffect(() => {
    if (allArticleCategory?.data) {
      setCategory(
        allArticleCategory.data.map((category) => ({
          id: category.id,
          title: category.name,
        }))
      );
      setIsCategoryLoaded(true); // Set flag ketika kategori telah dimuat
    }
  }, [allArticleCategory?.data]);

  // Effect untuk handle ketika artikel berhasil atau gagal ditambahkan
  useEffect(() => {
    if (isCategoryLoaded) {
      if (isAddArticleSuccess) {
        setOpen(false);
        setIsLoading(false);
      }

      if (isAddArticleError) {
        setOpen(true);
        setIsLoading(false);
      }
    }
  }, [isAddArticleSuccess, isAddArticleError, isCategoryLoaded]);

  return (
    <>
      <Modal title="Detail Artikel" isOpen={open} setIsOpen={setOpen}>
        <Formik
          initialValues={data}
          onSubmit={handleAddArticle}
          validationSchema={articleValidation}
          suppressHydrationWarning={true}
        >
          {({
            errors,
            handleChange,
            handleSubmit,
            values,
            setFieldValue,
            setValues,
          }) => (
            <Form
              onSubmit={() => {
                console.log(handleAddArticle);
                handleAddArticle(values);
              }}
            >
              <div>
                <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
                  <BigFileInput
                    //NEWWW
                    src={
                      typeof data.thumbnail === "string"
                        ? data.thumbnail
                        : data.thumbnail
                        ? URL.createObjectURL(data.thumbnail)
                        : ""
                    }
                    // Handle file input correctly
                    onChange={(e) => {
                      setFieldValue("thumbnail", e);
                    }}
                    // src={data.thumbnail}
                    // onChange={(e) => {
                    //   setFieldValue("thumbnail", e);
                    // }}
                    label="Kover Artikel"
                  />
                  <PrimaryInput
                    label="Judul Artikel"
                    value={values.title}
                    className="w-full"
                    placeholder="Masukkan judul artikel"
                    error={errors.title ?? undefined}
                    onChange={handleChange("title")}
                  />
                  <DropdownInput
                    items={articleCategories}
                    label="Kategori Artikel"
                    placeholder="Pilih Kategori Artikel"
                    // selectedItem={{ id: "", title: "" }}
                    //NEWWW
                    selectedItem={selectedArticleCategory}
                    className="w-full"
                    setSelectedItem={(e) => {
                      setSelectedArticleCategory(e);
                      setValues({
                        ...values,
                        articleCategoryId: e?.id as string,
                      });
                    }}
                  />
                  <PrimaryTextEditor
                    label="Konten Artikel"
                    value={values.content}
                    onChange={handleChange("content")}
                  />
                </div>
                <div className="flex flex-row justify-end w-full px-6 pb-4 space-x-4">
                  <PrimaryWithIconButton
                    label="Simpan"
                    onClick={() => {
                      console.log(handleSubmit, values);
                      handleAddArticle(values);
                    }}
                    icon={CheckCircleIcon}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default AddArticleModal;
