import PrimaryInput from "@/components/input/PrimaryInput";
import { Form, Formik } from "formik";
import React, { ReactElement, useEffect, useState } from "react";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Modal from "@/components/modal/Modal";
import { useCentralStore } from "@/store";
import BigFileInput from "@/components/input/image/BigFileInput";
import DropdownInput from "@/components/dropdown/DropdownInput";
import PrimaryTextEditor from "@/components/input/PrimaryTextEditor";
import { useArticle } from "@/hooks/article/use_article";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import ArticleRequest from "@/data/models/article/request/article_request";
import articleValidation from "../validation/article_validation";
import { useArticleCategory } from "@/hooks/article/use_article_category";

interface AddArticleModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;

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
  selectedArticleCategory,
  setSelectedArticleCategory,
}: // CATEGORY
AddArticleModalProps): ReactElement => {
  const { setIsLoading } = useCentralStore();

  const { addArticle, isAddArticleError, isAddArticleSuccess } = useArticle();

  const [categories, setCategories] = useState<DropdownFilterItemProps[]>([]);

  // Flag untuk memastikan kategori sudah dimuat
  const [isCategoryLoaded, setIsCategoryLoaded] = useState(false);

  const { allArticleCategory } = useArticleCategory();

  const handleAddArticle = (articleRequest: ArticleRequest) => {
    console.log("anjay");
    setIsLoading(true);
    addArticle(articleRequest);
    setOpen(false);
  };

  // Fetch all categories once
  useEffect(() => {
    if (allArticleCategory?.data) {
      setCategories(
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
    <div>
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
                handleAddArticle(values);
              }}
            >
              <div>
                <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
                  <BigFileInput
                    src={data.thumbnail as string}
                    onChange={(e) => {
                      setFieldValue("thumbnail", e);
                    }}
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
                    items={categories}
                    label="Kategori Artikel"
                    placeholder="Pilih Kategori Artikel"
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
                    error={errors.content ?? undefined}
                  />
                </div>
                <div className="flex flex-row justify-end w-full px-6 pb-4 space-x-4">
                  <PrimaryWithIconButton
                    label="Simpan"
                    onClick={() => {
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
    </div>
  );
};

export default AddArticleModal;
