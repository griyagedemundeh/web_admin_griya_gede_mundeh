import PrimaryInput from "@/components/input/PrimaryInput";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";

import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import { UserPlusIcon } from "@heroicons/react/20/solid";
import Modal from "@/components/modal/Modal";
import { useCentralStore } from "@/store";
import memberValidation from "../validation/member_validation";
import { useMember } from "@/hooks/member/use_member";
import MemberRequest from "@/data/models/member/request/member_request";

interface AddMemberModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  // tolong ubah dengan MemberRequest
  data: MemberRequest;
}

const AddMemberModal = ({ open, setOpen, data }: AddMemberModalProps) => {
  const { setIsLoading } = useCentralStore();
  // sesuaikan dengan useMember()
  const { addMember, isAddMemberSuccess, isAddMemberError } = useMember();

  // buat dengan menyesuaikan untuk Member
  const handleAddMember = (anggotaRequest: MemberRequest) => {
    setIsLoading(true);
    addMember(anggotaRequest);
    setOpen(false);
  };

  // Sesuaikan dengan Member
  useEffect(() => {
    if (isAddMemberSuccess) {
      setOpen(false);
    }

    if (isAddMemberError) {
      setOpen(true);
    }
  }, [isAddMemberSuccess, isAddMemberError]);

  return (
    <Modal title="Tambah Anggota" isOpen={open} setIsOpen={setOpen}>
      <Formik
        initialValues={data}
        onSubmit={handleAddMember}
        // tolong disesuaikan lagi MemberValidation dengan UI
        validationSchema={memberValidation}
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
                  placeholder="Masukkan nama lengkap anggota"
                  error={errors.fullName ?? undefined}
                  onChange={handleChange("fullName")}
                  className="w-full"
                />
                <PrimaryInput
                  label="Email"
                  isOptional={true}
                  value={values.email}
                  placeholder="Masukkan email anggota"
                  error={errors.email ?? undefined}
                  onChange={handleChange("email")}
                  className="w-full"
                  type="email"
                />
                <PrimaryInput
                  label="No.Handphone"
                  value={values.phoneNumber}
                  placeholder="Masukkan no hp anggota"
                  error={errors.phoneNumber ?? undefined}
                  onChange={handleChange("phoneNumber")}
                  className="w-full"
                />
                <PrimaryInput
                  label="Alamat Utama"
                  // Tolong diadjust dengan validation memberValidation
                  value={values.address}
                  placeholder="Masukkan Alamat Utama"
                  error={errors.address ?? undefined}
                  onChange={handleChange("address")}
                  // onChange={(e) => {}}
                  className="w-full"
                />
                <PrimaryInput
                  label="Password"
                  value={values.password}
                  placeholder="Masukkan password anggota"
                  error={errors.password ?? undefined}
                  onChange={handleChange("password")}
                  type="password"
                  className="w-full"
                />
                <PrimaryInput
                  label="Konfirmasi Password"
                  value={values.passwordConfirm}
                  placeholder="Masukkan konfirmasi password anggota"
                  error={errors.passwordConfirm ?? undefined}
                  onChange={handleChange("passwordConfirm")}
                  type="password"
                  className="w-full"
                />
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
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddMemberModal;
