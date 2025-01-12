import PrimaryInput from "@/components/input/PrimaryInput";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import { PencilIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import Modal from "@/components/modal/Modal";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import { useCentralStore } from "@/store";
import CeremonyCategoryRequest from "@/data/models/ceremony/request/ceremony_category_request";
import { useCeremonyCategory } from "@/hooks/ceremony/use_ceremony_category";
import PhotoProfileInput from "@/components/input/image/profile/PhotoProfileInput";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";
import editCeremonyCategoryValidation from "../validation/edit_admin_validation";

interface DetailCeremonyCategoryModalProps {
  id: number | string;
  data: CeremonyCategoryRequest;
}

const DetailCeremonyCategoryModal = ({
  data,
  id,
}: DetailCeremonyCategoryModalProps) => {
  const { setIsLoading } = useCentralStore();
  const {
    editCeremonyCategory,
    isEditCeremonyCategorySuccess,
    isEditCeremonyCategoryError,
    isLoadingEditCeremonyCategory,
  } = useCeremonyCategory();

  const [openDetail, setOpenDetail] = useState(false);
  const [ceremonyCategoryRequest, setCeremonyCategoryRequest] =
    useState<CeremonyCategoryRequest>({
      description: data.description,
      name: data.name,
    });

  const handleEditCeremonyCategory = (
    ceremonyCategory: CeremonyCategoryRequest
  ) => {
    setIsLoading(true);
    editCeremonyCategory({ id, request: ceremonyCategory });
    setOpenDetail(false);
  };

  useEffect(() => {
    if (isEditCeremonyCategorySuccess) {
      setOpenDetail(false);
    }

    if (isEditCeremonyCategoryError) {
      setOpenDetail(true);
    }
  }, [isEditCeremonyCategorySuccess, isEditCeremonyCategoryError, data]);

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
        title="Detail Kategori Upacara"
        isOpen={openDetail}
        setIsOpen={setOpenDetail}
      >
        <Formik
          initialValues={ceremonyCategoryRequest}
          onSubmit={handleEditCeremonyCategory}
          validationSchema={editCeremonyCategoryValidation}
        >
          {({ errors, handleChange, setFieldValue, values }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditCeremonyCategory(values);
              }}
            >
              <div>
                <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
                  <PhotoProfileInput
                    src={data.icon as string}
                    onChange={(file) => {
                      setFieldValue("icon", file);
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
              </div>
              <div className="flex flex-row justify-end w-full px-6 pb-4 space-x-4">
                <PrimaryWithIconButton
                  label="Simpan"
                  loading={isLoadingEditCeremonyCategory}
                  icon={PencilIcon}
                  type="submit"
                />
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default DetailCeremonyCategoryModal;
