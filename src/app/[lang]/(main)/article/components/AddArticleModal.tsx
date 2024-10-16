import PrimaryInput from "@/components/input/PrimaryInput";
import { Form, Formik } from "formik";
import React from "react";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Modal from "@/components/modal/Modal";
import { useCentralStore } from "@/store";
import ArticleCategoryRequest from "@/data/models/article/request/article_category_request";
import BigFileInput from "@/components/input/image/BigFileInput";
import DropdownInput from "@/components/dropdown/DropdownInput";
import PrimaryTextEditor from "@/components/input/PrimaryTextEditor";

interface AddArticleModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setData: (value: ArticleCategoryRequest) => void;
  data: ArticleCategoryRequest;
}

const AddArticleModal = ({
  open,
  setOpen,
  data,
  setData,
}: AddArticleModalProps) => {
  const { setIsLoading } = useCentralStore();
  // const {
  //   addArticleCategory,
  //   isAddArticleCategoryError,
  //   isAddArticleCategorySuccess,
  // } = useArticleCategory();

  const handleAddArticleCategory = (articleRequest: ArticleCategoryRequest) => {
    setIsLoading(true);
    // addArticleCategory({ ...ceremonyCategoryRequest, icon: data.icon });
    setOpen(false);
  };

  // useEffect(() => {
  //   if (isAddArticleCategorySuccess) {
  //     setOpen(false);
  //   }

  //   if (isAddArticleCategoryError) {
  //     setOpen(true);
  //   }
  // }, [isAddArticleCategorySuccess, isAddArticleCategoryError]);

  return (
    <Modal title="Tambah Artikel" isOpen={open} setIsOpen={setOpen}>
      <Formik
        initialValues={data}
        onSubmit={handleAddArticleCategory}
        // validationSchema={ceremonyCategoryValidation}
        suppressHydrationWarning={true}
      >
        {({ errors, handleChange, handleSubmit, values }) => (
          <Form>
            <div>
              <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
                <BigFileInput
                  src={""}
                  onChange={(e) => {}}
                  label="Kover Artikel"
                />
                <PrimaryInput
                  label="Judul Artikel"
                  value={values.name}
                  className="w-full"
                  placeholder="Masukkan judul artikel"
                  error={errors.name ?? undefined}
                  onChange={handleChange("name")}
                />
                <DropdownInput
                  items={[]}
                  label="Kategori Artikel"
                  placeholder="Pilih Kategori Artikel"
                  selectedItem={{ id: "", title: "" }}
                  className="w-full"
                  setSelectedItem={(e) => {
                    // setSelectedCeremonyCategory(e);
                    // setValues({
                    //   ...values,
                    //   ceremonyCategoryId: e?.id as string,
                    // });
                  }}
                />
                <PrimaryTextEditor
                  label="Konten Artikel"
                  value={""}
                  onChange={(e) => {}}
                />
              </div>
              <div className="flex flex-row justify-end w-full px-6 pb-4 space-x-4">
                <PrimaryWithIconButton
                  label="Simpan"
                  onClick={() => {
                    handleSubmit();
                  }}
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

export default AddArticleModal;
