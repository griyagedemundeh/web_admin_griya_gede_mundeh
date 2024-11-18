import PrimaryInput from "@/components/input/PrimaryInput";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import {
  CheckCircleIcon,
  MapPinIcon,
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
  } = useMember({});

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
        title="Detail Member"
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
            <Form>
              <div>
                <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
                  {/* <PhotoProfileInput isNull={true} onclose={toggleModalUpload} /> */}
                  <PrimaryInput
                    label="Nama Lengkap"
                    value={values.fullName}
                    placeholder="Masukkan nama lengkap member"
                    error={errors.fullName ?? undefined}
                    onChange={handleChange("fullName")}
                    className="w-full"
                  />
                  <PrimaryInput
                    label="Email"
                    isOptional={true}
                    value={values.email}
                    placeholder="Masukkan email member"
                    error={errors.email ?? undefined}
                    onChange={handleChange("email")}
                    className="w-full"
                    type="email"
                  />
                  <PrimaryInput
                    label="No.Handphone"
                    value={values.phoneNumber}
                    placeholder="Masukkan no hp member"
                    error={errors.phoneNumber ?? undefined}
                    onChange={handleChange("phoneNumber")}
                    className="w-full"
                  />
                  <div className="flex flex-row space-x-2 items-end w-full">
                    <PrimaryInput
                      label="Alamat Utama"
                      // onChange={(e) => {}}
                      onChange={handleChange("address")}
                      placeholder="Masukkan alamat member"
                      error={errors.address ?? undefined}
                      value={values.address}
                      // value={"AKU Ingin"}
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
                    placeholder="Masukkan password member"
                    error={errors.password ?? undefined}
                    onChange={handleChange("password")}
                    type="password"
                    className="w-full"
                  />
                  <PrimaryInput
                    label="Konfirmasi Password"
                    value={values.passwordConfirm}
                    placeholder="Masukkan konfirmasi password member"
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
                onSubmit={() => {
                  handleCreateMemberAddress(values);
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
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
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
