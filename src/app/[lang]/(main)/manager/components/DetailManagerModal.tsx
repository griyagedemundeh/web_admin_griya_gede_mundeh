import PrimaryInput from "@/components/input/PrimaryInput";
import AdminRequest from "@/data/models/admin/request/add_admin_request";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import { PencilIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { useAdmin } from "@/hooks/admin/use_admin";
import Modal from "@/components/modal/Modal";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import { useCentralStore } from "@/store";
import editAdminValidation from "../validation/edit_admin_validation";

interface DetailManagerModalProps {
  id: number | string;
  data: AdminRequest;
}

const DetailManagerModal = ({ data, id }: DetailManagerModalProps) => {
  const { setIsLoading } = useCentralStore();
  const { editAdmin, isEditAdminSuccess, isEditAdminError } = useAdmin();

  const [active, setActive] = useState<boolean>(true);
  const [openDetail, setOpenDetail] = useState(false);

  const handleEditAdmin = (adminRequest: AdminRequest) => {
    setIsLoading(true);
    editAdmin({ id, request: adminRequest });
    setOpenDetail(false);
  };

  useEffect(() => {
    if (isEditAdminSuccess) {
      setOpenDetail(false);
    }

    if (isEditAdminError) {
      setOpenDetail(true);
    }
  }, [isEditAdminSuccess, isEditAdminError]);

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
        title="Detail Pengelola"
        isOpen={openDetail}
        setIsOpen={setOpenDetail}
      >
        <Formik
          initialValues={data}
          onSubmit={handleEditAdmin}
          validationSchema={editAdminValidation}
          suppressHydrationWarning={true}
        >
          {({ errors, handleChange, handleSubmit, values }) => (
            <Form>
              <div>
                <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
                  {/* <PhotoProfileInput isNull={true} onclose={toggleModalUpload} /> */}
                  <PrimaryInput
                    label="Nama Lengkap"
                    value={values.fullName}
                    placeholder="Masukkan nama lengkap admin"
                    error={errors.fullName ?? undefined}
                    onChange={handleChange("fullName")}
                    className="w-full"
                  />
                  <PrimaryInput
                    label="Email"
                    isOptional={true}
                    value={values.email}
                    placeholder="Masukkan email admin"
                    error={errors.email ?? undefined}
                    onChange={handleChange("email")}
                    className="w-full"
                    type="email"
                  />
                  <PrimaryInput
                    label="No.Handphone"
                    value={values.phoneNumber}
                    placeholder="Masukkan no hp admin"
                    error={errors.phoneNumber ?? undefined}
                    onChange={handleChange("phoneNumber")}
                    className="w-full"
                  />
                  <PrimaryInput
                    label="Password"
                    value={values.password}
                    placeholder="Masukkan password admin"
                    error={errors.password ?? undefined}
                    onChange={handleChange("password")}
                    type="password"
                    className="w-full"
                  />
                  <PrimaryInput
                    label="Konfirmasi Password"
                    value={values.passwordConfirm}
                    placeholder="Masukkan konfirmasi password admin"
                    error={errors.passwordConfirm ?? undefined}
                    onChange={handleChange("passwordConfirm")}
                    type="password"
                    className="w-full"
                  />
                  {/* {active !== undefined && (
                    <SwitchInput
                      className="self-start pt-2"
                      label={
                        <span className="font-medium text-gray-500">
                          Aktif/Non-Aktif
                        </span>
                      }
                      value={active ?? false}
                      onChange={(e) => {
                        setActive(e);
                      }}
                    />
                  )} */}
                </div>
                <div className="flex flex-row justify-end w-full px-6 pb-4 space-x-4">
                  <PrimaryWithIconButton
                    label="Simpan"
                    onClick={() => {
                      handleSubmit();
                    }}
                    icon={PencilIcon}
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

export default DetailManagerModal;
