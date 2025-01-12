import PrimaryInput from "@/components/input/PrimaryInput";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import { UserPlusIcon } from "@heroicons/react/20/solid";
import Modal from "@/components/modal/Modal";
import { useCentralStore } from "@/store";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";
import PhotoProfileInput from "@/components/input/image/profile/PhotoProfileInput";
import CeremonyCategoryRequest from "@/data/models/ceremony/request/ceremony_category_request";
import ceremonyCategoryValidation from "../validation/ceremony_category_validation";
import { useCeremonyCategory } from "@/hooks/ceremony/use_ceremony_category";

interface AddCeremonyCategoryModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setData: (value: CeremonyCategoryRequest) => void;
  data: CeremonyCategoryRequest;
}

const AddCeremonyCategoryModal = ({
  open,
  setOpen,
  data,
  setData,
}: AddCeremonyCategoryModalProps) => {
  const { setIsLoading } = useCentralStore();
  const {
    addCeremonyCategory,
    isAddCeremonyCategoryError,
    isAddCeremonyCategorySuccess,
    isLoadingAddCeremonyCategory,
  } = useCeremonyCategory();

  const handleAddCeremonyCategory = (
    ceremonyCategoryRequest: CeremonyCategoryRequest
  ) => {
    setIsLoading(true);
    addCeremonyCategory({ ...ceremonyCategoryRequest, icon: data.icon });
    setOpen(false);
  };

  useEffect(() => {
    if (isAddCeremonyCategorySuccess) {
      setOpen(false);
    }

    if (isAddCeremonyCategoryError) {
      setOpen(true);
    }
  }, [isAddCeremonyCategorySuccess, isAddCeremonyCategoryError]);

  return (
    <Modal
      title="Tambah Kategori Upacara Agama"
      isOpen={open}
      setIsOpen={setOpen}
    >
      <Formik
        initialValues={data}
        onSubmit={handleAddCeremonyCategory}
        validationSchema={ceremonyCategoryValidation}
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
                <PhotoProfileInput
                  onChange={(file) => {
                    setData({ ...values, icon: file });
                  }}
                />
                <PrimaryInput
                  label="Nama Kategori Upacara Agama"
                  value={values.name}
                  className="w-full"
                  placeholder="Masukkan kategori upacara agama"
                  error={errors.name ?? undefined}
                  onChange={handleChange("name")}
                />
                <PrimaryTextArea
                  label="Deskripsi Kategori Upacara Agama"
                  value={values.description}
                  className="w-full"
                  placeholder="Masukkan kategori upacara agama"
                  error={errors.description ?? undefined}
                  onChange={handleChange("description")}
                />
              </div>
              <div className="flex flex-row justify-end w-full px-6 pb-4 space-x-4">
                <PrimaryWithIconButton
                  label="Simpan"
                  type="submit"
                  loading={isLoadingAddCeremonyCategory}
                  icon={UserPlusIcon}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddCeremonyCategoryModal;
