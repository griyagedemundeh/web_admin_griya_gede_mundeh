import PrimaryInput from "@/components/input/PrimaryInput";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import {
  CheckCircleIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  PencilIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";

import Modal from "@/components/modal/Modal";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import { useCentralStore } from "@/store";
import editMemberValidation from "../validation/edit_member_validation";
import { useMember } from "@/hooks/member/use_member";
import MemberRequest from "@/data/models/member/request/member_request";
import MemberAddressRequest from "@/data/models/member/request/member_address_request";
import memberAddressValidation from "../validation/member_address_validation";
import { useAuth } from "@/hooks/auth/use_auth";

interface DetailMemberModalProps {
  id: number | string;
  data: MemberRequest;
}

const DetailMemberModal = ({ data, id }: DetailMemberModalProps) => {
  const { setIsLoading } = useCentralStore();
  const {
    editMember,
    isEditMemberSuccess,
    isEditMemberError,
    createMemberAddress,
    isCreateMemberAddressSuccess,
    isLoadingCreateMemberAddress,
    resendEmailVerification,
    isLoadingResendEmailVerification,
  } = useMember({});

  const { account } = useAuth();

  const [openDetail, setOpenDetail] = useState(false);
  const [openAddAdress, setOpenAddAddress] = useState<boolean>(false);

  const [memberAddressRequest, setMemberAddressRequest] =
    useState<MemberAddressRequest>({
      address: "",
      addressAlias: "",
      addressNote: "",
      userId: id as number,
    });

  const handleEditMember = (anggotaRequest: MemberRequest) => {
    setIsLoading(true);
    editMember({ id, request: anggotaRequest });
    setOpenDetail(false);
  };

  const handleCreateMemberAddress = (
    memberAddressRequest: MemberAddressRequest
  ) => {
    createMemberAddress(memberAddressRequest);
  };

  const handleResendEmailVerification = (memberRequest: MemberRequest) => {
    resendEmailVerification({ id: id as number, request: memberRequest });
  };

  useEffect(() => {
    if (isEditMemberSuccess) {
      setOpenDetail(false);
    }

    if (isEditMemberError) {
      setOpenDetail(true);
    }
  }, [isEditMemberSuccess, isEditMemberError]);

  useEffect(() => {
    if (isCreateMemberAddressSuccess) {
      setOpenAddAddress(false);
    }
  }, [isCreateMemberAddressSuccess]);

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
        title="Detail Anggota"
        isOpen={openDetail}
        setIsOpen={setOpenDetail}
      >
        <Formik
          initialValues={data}
          onSubmit={handleEditMember}
          validationSchema={editMemberValidation}
          suppressHydrationWarning={true}
        >
          {({ errors, handleChange, handleSubmit, values }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                if (data.emailVerified) {
                  handleSubmit();
                } else {
                  handleResendEmailVerification(data);
                }
              }}
            >
              <div>
                <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
                  {/* <PhotoProfileInput isNull={true} onclose={toggleModalUpload} /> */}
                  <PrimaryInput
                    label="Nama Lengkap"
                    value={values.fullName}
                    placeholder="Masukkan nama lengkap anggota"
                    error={errors.fullName ?? undefined}
                    onChange={handleChange("fullName")}
                    disabled={account?.role == "admin"}
                    className="w-full"
                  />
                  <PrimaryInput
                    label="Email"
                    value={values.email}
                    placeholder="Masukkan email anggota"
                    error={errors.email ?? undefined}
                    onChange={handleChange("email")}
                    disabled={account?.role == "admin"}
                    className="w-full"
                    type="email"
                  />
                  <PrimaryInput
                    label="No.Handphone"
                    value={values.phoneNumber}
                    placeholder="Masukkan no hp anggota"
                    error={errors.phoneNumber ?? undefined}
                    onChange={handleChange("phoneNumber")}
                    disabled={account?.role == "admin"}
                    className="w-full"
                  />
                  <div className="flex flex-row space-x-2 items-end w-full">
                    <PrimaryInput
                      label="Alamat Utama"
                      onChange={handleChange("address")}
                      placeholder="Masukkan alamat anggota"
                      error={errors.address ?? undefined}
                      value={values.address}
                      disabled={account?.role == "admin"}
                      className="w-full"
                    />

                    <IconBackgroundButton
                      icon={MapPinIcon}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenAddAddress(true);
                      }}
                      colorIcon="white"
                      className="bg-gray-300 hover:bg-gray-200"
                    />
                  </div>
                  <PrimaryInput
                    label="Password"
                    value={values.password}
                    placeholder="Masukkan password anggota"
                    error={errors.password ?? undefined}
                    onChange={handleChange("password")}
                    disabled={account?.role == "admin"}
                    type="password"
                    className="w-full"
                  />
                  <PrimaryInput
                    label="Konfirmasi Password"
                    value={values.passwordConfirm}
                    placeholder="Masukkan konfirmasi password anggota"
                    error={errors.passwordConfirm ?? undefined}
                    onChange={handleChange("passwordConfirm")}
                    disabled={account?.role == "admin"}
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
                  {account?.role === "superAdmin" &&
                    data.emailVerified === 1 && (
                      <PrimaryWithIconButton
                        label="Simpan"
                        type="submit"
                        icon={PencilIcon}
                      />
                    )}
                  {account?.role === "superAdmin" &&
                    data.emailVerified === 0 && (
                      <PrimaryWithIconButton
                        label="Kirim Ulang Verifikasi Email"
                        type="submit"
                        loading={isLoadingResendEmailVerification}
                        icon={PaperAirplaneIcon}
                      />
                    )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        title={`Tambah Alamat \n${data.fullName ?? ""}`}
        isOpen={openAddAdress}
        setIsOpen={setOpenAddAddress}
      >
        {data?.fullName ? (
          <Formik
            initialValues={memberAddressRequest}
            onSubmit={handleCreateMemberAddress}
            validationSchema={memberAddressValidation}
            suppressHydrationWarning={true}
          >
            {({
              errors,
              handleChange,
              handleSubmit,
              values,

              setValues,
            }) => (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
                  <PrimaryInput
                    label="Alamat"
                    onChange={handleChange(`address`)}
                    value={values.address ?? ""}
                    placeholder={`Masukkan alamat ${data.fullName}`}
                    error={errors.address}
                    className="w-full"
                  />
                  <PrimaryInput
                    label="Alias Alamat"
                    onChange={handleChange(`addressAlias`)}
                    value={values.addressAlias ?? ""}
                    placeholder={`Masukkan alias alamat ${data.fullName}`}
                    error={errors.addressAlias}
                    className="w-full"
                  />
                  <PrimaryInput
                    label="Catatan Alamat"
                    onChange={handleChange(`addressNote`)}
                    value={values.addressNote ?? ""}
                    placeholder={`Masukkan catatan alamat ${data.fullName}`}
                    error={errors.addressNote}
                    className="w-full"
                    isOptional={true}
                  />
                  <div className="flex flex-row justify-end w-full pt-2">
                    <PrimaryWithIconButton
                      label="Simpan"
                      loading={isLoadingCreateMemberAddress}
                      type="submit"
                      icon={CheckCircleIcon}
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="p-6">Tolong pilih Pemedek/Pengguna!</div>
        )}
      </Modal>
    </>
  );
};

export default DetailMemberModal;
