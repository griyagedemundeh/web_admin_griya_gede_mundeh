import PrimaryInput from "@/components/input/PrimaryInput";
import SwitchInput from "@/components/input/SwitchInput";
import PrimaryModal from "@/components/modal/PrimaryModal";
import AddAdminRequest from "@/data/models/admin/request/add_admin_request";
import { Form, Formik } from "formik";
import React, { ReactElement, useEffect, useState } from "react";
import adminValidation from "../validation/admin_validation";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import { UserPlusIcon } from "@heroicons/react/20/solid";
import { useAdmin } from "@/hooks/admin/use_admin";
import { useCentralStore } from "@/store";

interface ManagerModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  activeManager?: boolean;
  setActiveManager?: (value: boolean) => void;
  bottomAction?: ReactElement;
}

const ManagerModal = ({
  open,
  setOpen,
  title,
  activeManager,
  setActiveManager,
  bottomAction,
}: ManagerModalProps) => {
  const { setIsLoading } = useCentralStore();
  const { addAdmin, isAddAdminSuccess, isAddAdminError } = useAdmin();

  const [addAdminRequest, setAddAdminRequest] = useState<AddAdminRequest>({
    email: "",
    fullName: "",
    password: "",
    password_confirmation: "",
    phoneNumber: "",
  });

  const handleAddAdmin = (addAdminRequest: AddAdminRequest) => {
    setIsLoading(true);

    addAdmin(addAdminRequest);

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
    <Formik
      initialValues={addAdminRequest}
      onSubmit={handleAddAdmin}
      validationSchema={adminValidation}
      suppressHydrationWarning={true}
    >
      {({ errors, handleChange, handleSubmit, values }) => (
        <Form>
          <PrimaryModal
            open={open}
            setOpen={setOpen}
            title={title}
            content={
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
                    value={values.password_confirmation}
                    placeholder="Masukkan konfirmasi password admin"
                    error={errors.password_confirmation ?? undefined}
                    onChange={handleChange("password_confirmation")}
                    type="password"
                    className="w-full"
                  />
                  {activeManager !== undefined && (
                    <SwitchInput
                      className="self-start pt-2"
                      label={
                        <span className="font-medium text-gray-500">
                          Aktif/Non-Aktif
                        </span>
                      }
                      value={activeManager ?? false}
                      onChange={(e) => {
                        if (setActiveManager) {
                          setActiveManager(e);
                        }
                      }}
                    />
                  )}
                </div>
                <div className="flex flex-row justify-end w-full px-6 pb-4 space-x-4">
                  <PrimaryWithIconButton
                    label="Simpan"
                    onClick={() => {
                      handleSubmit();
                    }}
                    icon={UserPlusIcon}
                  />
                </div>
              </div>
            }
          />
        </Form>
      )}
    </Formik>
  );
};

export default ManagerModal;
