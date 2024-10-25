import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import Modal from "@/components/modal/Modal";
import ArticleCategoryRequest from "@/data/models/article/request/article_category_request";
import { useArticleCategory } from "@/hooks/article/use_article_category";
import { useCentralStore } from "@/store";
import { PencilIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import editArticleCategoryValidation from "../validation/edit_category_validation";
import PrimaryInput from "@/components/input/PrimaryInput";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";

interface DetailArticleCategoryModalProps {
  id: number | string;
  data: ArticleCategoryRequest;
}

const DetailArticleCategoryModal = ({
  id,
  data,
}: DetailArticleCategoryModalProps) => {
  const { setIsLoading } = useCentralStore();
  const {
    editArticleCategory,
    isEditArticleCategorySuccess,
    isEditArticleCategoryError,
  } = useArticleCategory();

  const [openDetail, setOpenDetail] = useState(false);

  const handleEditAdmin = (articleCategory: ArticleCategoryRequest) => {
    setIsLoading(true);
    editArticleCategory({ id, request: articleCategory });
    setOpenDetail(false);
  };

  useEffect(() => {
    if (isEditArticleCategorySuccess) {
      setOpenDetail(false);
    }
    if (isEditArticleCategoryError) {
      setOpenDetail(true);
    }
  }, [isEditArticleCategorySuccess, isEditArticleCategoryError]);

  return (
    <>
      <IconBackgroundButton
        icon={PencilSquareIcon}
        colorBackground="emerald"
        className="bg-emerald-100"
        colorIcon="green"
        onClick={() => {
          setOpenDetail(true);
        }}
      />
      <Modal
        title="Detail Artikel Upacara"
        isOpen={openDetail}
        setIsOpen={setOpenDetail}
      >
        <Formik
          initialValues={data}
          onSubmit={(values) => handleEditAdmin(values)}
          validationSchema={editArticleCategoryValidation}
        >
          {({ errors, handleChange, values }) => (
            <Form>
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
                    icon={PencilIcon}
                    onClick={() => {
                      handleEditAdmin(values);
                    }}
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

export default DetailArticleCategoryModal;
