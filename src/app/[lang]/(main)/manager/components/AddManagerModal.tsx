import PrimaryInput from "@/components/input/PrimaryInput";
import AdminRequest from "@/data/models/admin/request/admin_request";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import adminValidation from "../validation/admin_validation";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import { UserPlusIcon } from "@heroicons/react/20/solid";
import { useAdmin } from "@/hooks/admin/use_admin";
import Modal from "@/components/modal/Modal";
import { useCentralStore } from "@/store";

interface AddManagerModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  data: AdminRequest;
}

const AddManagerModal = ({ open, setOpen, data }: AddManagerModalProps) => {
  const { setIsLoading } = useCentralStore();
  const { addAdmin, isAddAdminSuccess, isAddAdminError } = useAdmin();

  const handleAddAdmin = (adminRequest: AdminRequest) => {
    setIsLoading(true);
    addAdmin(adminRequest);
    setOpen(false);
  };

  useEffect(() => {
    if (isAddAdminSuccess) {
      setOpen(false);
    }

    if (isAddAdminError) {
      setOpen(true);
    }
  }, [isAddAdminSuccess, isAddAdminError]);

  return (
    <Modal title="Tambah Pengelola" isOpen={open} setIsOpen={setOpen}>
      <Formik
        initialValues={data}
        onSubmit={handleAddAdmin}
        validationSchema={adminValidation}
        suppressHydrationWarning={true}
      >
        {({ errors, handleChange, handleSubmit, values }) => (
          <Form
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
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
              </div>
              <div className="flex flex-row justify-end w-full px-6 pb-4 space-x-4">
                <PrimaryWithIconButton
                  label="Simpan"
                  type="submit"
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

export default AddManagerModal;
