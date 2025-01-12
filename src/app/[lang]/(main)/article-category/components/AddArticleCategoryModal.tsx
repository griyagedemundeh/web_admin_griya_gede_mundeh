import PrimaryInput from "@/components/input/PrimaryInput";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Modal from "@/components/modal/Modal";
import { useCentralStore } from "@/store";
import ArticleCategoryRequest from "@/data/models/article/request/article_category_request";
import { useArticleCategory } from "@/hooks/article/use_article_category";
import articleCategoryValidation from "../validation/article_category_validation";

interface AddArticleCategoryModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setData: (value: ArticleCategoryRequest) => void;
  data: ArticleCategoryRequest;
}

const AddArticleCategoryModal = ({
  open,
  setOpen,
  data,
  setData,
}: AddArticleCategoryModalProps) => {
  const { setIsLoading } = useCentralStore();
  const {
    addArticleCategory,
    isAddArticleCategoryError,
    isAddArticleCategorySucces,
    isLoadingAddArticleCategory,
  } = useArticleCategory();

  const handleAddArticleCategory = (
    articleCategoryRequest: ArticleCategoryRequest
  ) => {
    setIsLoading(true);
    addArticleCategory({ ...articleCategoryRequest });
    setOpen(false);
  };

  useEffect(() => {
    if (isAddArticleCategorySucces) {
      setOpen(false);
    }

    if (isAddArticleCategoryError) {
      setOpen(true);
    }
  }, [isAddArticleCategorySucces, isAddArticleCategoryError]);

  return (
    <Modal title="Tambah Kategori Artikel" isOpen={open} setIsOpen={setOpen}>
      <Formik
        initialValues={data}
        onSubmit={handleAddArticleCategory}
        validationSchema={articleCategoryValidation}
        suppressHydrationWarning={true}
      >
        {({ errors, handleChange, handleSubmit, values }) => (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div>
              <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
                <PrimaryInput
                  label="Nama Kategori Artikel"
                  value={values.name}
                  className="w-full"
                  placeholder="Masukkan kategori artikel"
                  error={errors.name ?? undefined}
                  onChange={handleChange("name")}
                />
              </div>
              <div className="flex flex-row justify-end w-full px-6 pb-4 space-x-4">
                <PrimaryWithIconButton
                  label="Simpan"
                  type="submit"
                  loading={isLoadingAddArticleCategory}
                  icon={CheckCircleIcon}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddArticleCategoryModal;
