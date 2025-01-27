import DropdownInput from "@/components/dropdown/DropdownInput";
import PrimaryCurrencyInput from "@/components/input/PrimaryCurrencyInput";
import PrimaryInput from "@/components/input/PrimaryInput";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";
import React, { useEffect, useState } from "react";
import PrimaryDatePicker from "@/components/input/PrimaryDatePicker";
import Modal from "@/components/modal/Modal";
import { Form, Formik } from "formik";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import {
  CheckCircleIcon,
  DocumentCheckIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import { useAdmin } from "@/hooks/admin/use_admin";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import { useCeremony } from "@/hooks/ceremony/use_ceremony";
import { useMember } from "@/hooks/member/use_member";
import invoiceValidation from "../validation/invoice_validation";
import PrimaryTextEditor from "@/components/input/PrimaryTextEditor";
import InvoiceRequest from "@/data/models/transaction/request/invoice_request";
import { useTransaction } from "@/hooks/transaction/use_transaction";
import memberAddressValidation from "../../member/validation/member_address_validation";
import MemberAddressRequest from "@/data/models/member/request/member_address_request";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import Image from "next/image";
import Images from "@/constants/images";
import { log } from "node:console";

interface TransactionModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  ceremonyServiceId?: number | string;
}

const TransactionModal = ({
  open,
  setOpen,
  title,
  ceremonyServiceId,
}: TransactionModalProps) => {
  const [openPayment, setOpenPayment] = useState<boolean>(false);
  const [openAddAddress, setOpenAddAddress] = useState<boolean>(false);

  const { allAdminFromAdmin, refecthAllAdminFromAdmin } = useAdmin();

  const {
    createInvoice,
    isLoadingCreateInvoice,
    payment,
    isCreateInvoiceSuccess,
    updateStatusInvoice,
    isLoadingUpdateStatusInvoice,
  } = useTransaction();

  const {
    allCeremonyPackageByCeremonyServiceId,
    allCeremony,
    refetchCeremonyPackageByCeremonyServiceId,
    selectedAdmin,
    selectedCeremony,
    selectedMember,
    selectedPackage,
    selectedPackageFull,
    selectedPaymentMethod,
    selectedAddress,
    setSelectedAdmin,
    setSelectedCeremony,
    setSelectedMember,
    setSelectedPackage,
    setSelectedPackageFull,
    setSelectedAddress,
    setSelectedPaymentMethod,
  } = useCeremony();

  const [ceremonies, setCeremonies] = useState<DropdownFilterItemProps[]>([]);
  const [admins, setAdmins] = useState<DropdownFilterItemProps[]>([]);
  const [members, setMembers] = useState<DropdownFilterItemProps[]>([]);
  const [packages, setPackages] = useState<DropdownFilterItemProps[]>([]);
  const [addresses, setAddresses] = useState<DropdownFilterItemProps[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<
    DropdownFilterItemProps[]
  >([
    { id: 1, title: "Transfer/Online", value: false },
    { id: 2, title: "Tunai/Offline", value: true },
  ]);

  const { allMember, allAddress, refecthAllAddress } = useMember({
    userId: selectedMember?.id,
  });

  const [invoiceRequest, setInvoiceRequest] = useState<InvoiceRequest>({
    adminId: 0,
    ceremonyDate: new Date(),
    description: "",
    isCash: false,
    memberAddressId: 0,
    memberId: 0,
    note: "",
    totalPrice: "",
    consultationId: 0,
    ceremonyServiceId: 0,
    title: "",
    ceremonyServicePackageId: 0,
  });

  const [memberAddressRequest, setMemberAddressRequest] =
    useState<MemberAddressRequest>({
      address: "",
      addressAlias: "",
      addressNote: "",
      userId: selectedMember?.id as number,
    });

  const {
    createMemberAddress,
    isCreateMemberAddressSuccess,
    isLoadingCreateMemberAddress,
  } = useMember({});

  useEffect(() => {
    if (allCeremony?.data) {
      setCeremonies(
        allCeremony?.data?.map((ceremony) => ({
          id: ceremony?.id,
          title: `${ceremony?.title}`,
        }))
      );
    }

    refecthAllAdminFromAdmin();
    if (allAdminFromAdmin?.data) {
      setAdmins(
        allAdminFromAdmin?.data?.map((admin) => ({
          id: admin?.id,
          title: `${admin?.user?.fullName} - ${admin?.user?.phoneNumber}`,
        }))
      );
    }

    // Refetch Package
    refetchCeremonyPackageByCeremonyServiceId();
    if (allCeremonyPackageByCeremonyServiceId?.data) {
      setPackages(
        allCeremonyPackageByCeremonyServiceId?.data?.map((ceremonyPackage) => ({
          id: ceremonyPackage?.id,
          title: `${ceremonyPackage?.name}`,
        }))
      );
    }
    if (allMember?.data) {
      setMembers(
        allMember?.data?.map((member) => ({
          id: member?.id,
          title: `${member?.user?.fullName}`,
        }))
      );
    }
  }, [
    allCeremony?.data,
    allAdminFromAdmin?.data,
    allCeremonyPackageByCeremonyServiceId?.data,
    allMember?.data,
    selectedCeremony,
  ]);

  useEffect(() => {
    if (selectedMember?.id) {
      refecthAllAddress();
      if (allAddress?.data) {
        setAddresses(
          allAddress?.data?.map((address, index) => ({
            id: address.id,
            title:
              `${address?.addressAlias ?? `Rumah ${index + 1}`}` +
              `- ${address?.address}`,
          }))
        );
      }
      setMemberAddressRequest({
        ...memberAddressRequest,
        userId: selectedMember?.id as number,
      });
    }
  }, [selectedMember, allAddress]);

  const handleAddInvoice = (invoiceRequest: InvoiceRequest) => {
    const ceremonyDate = new Date(invoiceRequest.ceremonyDate);

    const date = `${ceremonyDate.getFullYear()}-${
      ceremonyDate.toLocaleDateString().split("/")[0]
    }-${ceremonyDate.getDate()} ${ceremonyDate.toTimeString().split(" ")[0]}`;

    createInvoice({
      ...invoiceRequest,
      ceremonyDate: date,
    });
  };

  const handleCreateMemberAddress = (
    memberAddressRequest: MemberAddressRequest
  ) => {
    createMemberAddress(memberAddressRequest);
  };

  useEffect(() => {
    if (isCreateInvoiceSuccess && !invoiceRequest.isCash) {
      setOpenPayment(true);
    }
  }, [isCreateInvoiceSuccess, invoiceRequest.isCash]);

  useEffect(() => {
    if (
      isCreateMemberAddressSuccess &&
      allAddress?.data &&
      selectedMember?.id
    ) {
      refecthAllAddress();
      setOpenAddAddress(false);
      setAddresses(
        allAddress?.data?.map((address, index) => ({
          id: address.id,
          title:
            `${address?.addressAlias ?? `Rumah ${index + 1}`}` +
            `- ${address?.address}`,
        }))
      );
    }
  }, [isCreateMemberAddressSuccess, allAddress?.data, selectedMember]);

  useEffect(() => {
    if (isCreateInvoiceSuccess) {
      setSelectedAddress(undefined);
      setSelectedAdmin(undefined);
      setSelectedCeremony(undefined);
      setSelectedMember(undefined);
      setSelectedPackage(undefined);
      setSelectedPackageFull(undefined);
      setSelectedPaymentMethod(undefined);
    }
  }, [isCreateInvoiceSuccess]);

  return (
    <div>
      <Modal title={title} isOpen={open} setIsOpen={setOpen}>
        <Formik
          initialValues={invoiceRequest}
          onSubmit={handleAddInvoice}
          validationSchema={invoiceValidation}
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
                handleAddInvoice(values);
              }}
            >
              <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
                <div className="w-full flex flex-row space-x-4">
                  <DropdownInput
                    items={ceremonies ?? []}
                    label="Upacara"
                    placeholder="Pilih Upacara"
                    selectedItem={selectedCeremony}
                    error={errors.ceremonyServiceId}
                    setSelectedItem={(value) => {
                      setSelectedCeremony(value);

                      setValues({
                        ...values,
                        ceremonyServiceId: value?.id as number,
                      });

                      setSelectedPackage(undefined);
                      setValues({
                        ...values,
                        ceremonyServiceId: value?.id as number,
                        totalPrice: "",
                        description: "",
                      });
                    }}
                    className="w-full"
                  />
                  <PrimaryInput
                    label="Judul Tambahan"
                    onChange={handleChange(`title`)}
                    value={values.title ?? ""}
                    error={errors.note}
                    className="w-full"
                    isOptional={true}
                  />
                </div>
                <DropdownInput
                  items={packages ?? []}
                  label="Paket"
                  placeholder="Pilih Paket Upacara"
                  selectedItem={selectedPackage}
                  error={errors.ceremonyServicePackageId}
                  setSelectedItem={(value) => {
                    setSelectedPackage(value);

                    if (value === undefined) {
                      setValues({
                        ...values,
                        totalPrice: "",
                        description: "",
                        ceremonyServicePackageId: undefined,
                      });
                    } else {
                      allCeremonyPackageByCeremonyServiceId?.data?.map(
                        (ceremonyPackage) => {
                          if (parseInt(`${value.id}`) === ceremonyPackage.id) {
                            setValues({
                              ...values,
                              ceremonyServicePackageId: value.id as number,
                              totalPrice: ceremonyPackage.price.toString(),
                              description: ceremonyPackage.description,
                            });
                          }
                        }
                      );
                    }
                  }}
                  className="w-full"
                  isOptional={true}
                />
                <DropdownInput
                  items={members ?? []}
                  label="Pemedek/Pengguna"
                  placeholder="Pilih Pemedek/Pengguna"
                  selectedItem={selectedMember}
                  error={errors.memberId}
                  setSelectedItem={(value) => {
                    setSelectedMember(value);
                    setSelectedAddress(undefined);
                    setValues({
                      ...values,
                      memberId: value?.id as number,
                      memberAddressId: null,
                    });
                  }}
                  className="w-full"
                />
                <DropdownInput
                  items={paymentMethods ?? []}
                  label="Tipe Pembayaran"
                  placeholder="Pilih metode pembayaran"
                  selectedItem={selectedPaymentMethod}
                  error={errors.isCash}
                  setSelectedItem={(value) => {
                    setSelectedPaymentMethod(value);
                    setValues({
                      ...values,
                      isCash: value?.value,
                    });
                  }}
                  className="w-full"
                />

                <PrimaryDatePicker
                  label="Tanggal Upacara"
                  setValue={(e) => {
                    setValues({
                      ...values,
                      ceremonyDate: e,
                    });
                  }}
                  value={new Date(values.ceremonyDate)}
                  error={`${errors?.ceremonyDate ?? ""}`}
                  className="w-full"
                />

                <div
                  className={`flex flex-row justify-between w-full space-x-2 ${
                    errors.memberAddressId ? "items-center" : "items-end"
                  }`}
                >
                  <DropdownInput
                    items={addresses ?? []}
                    label="Lokasi/Alamat Upacara"
                    placeholder="Pilih Lokasi/Alamat Upacara"
                    selectedItem={selectedAddress}
                    error={errors.memberAddressId}
                    setSelectedItem={(value) => {
                      setSelectedAddress(value);
                      setValues({
                        ...values,
                        memberAddressId: value?.id as number,
                      });
                    }}
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

                <PrimaryCurrencyInput
                  label="Total Harga"
                  disabled={selectedPackage !== undefined}
                  value={values?.totalPrice}
                  error={errors?.totalPrice}
                  setValue={handleChange(`totalPrice`)}
                  placeholder="Masukkan harga paket"
                  className="w-full"
                />
                <DropdownInput
                  items={admins ?? []}
                  label="Pengelola"
                  placeholder="Pilih pengelola"
                  selectedItem={selectedAdmin}
                  error={errors.adminId}
                  setSelectedItem={(e) => {
                    setSelectedAdmin(e);
                    setValues({
                      ...values,
                      adminId: e?.id as number,
                    });
                  }}
                  className="w-full"
                />

                <PrimaryTextEditor
                  label="Deskripsi Upacara"
                  value={selectedPackageFull?.description ?? values.description}
                  error={errors?.description}
                  onChange={handleChange(`description`)}
                  disabled={selectedPackage !== undefined}
                />

                <PrimaryTextArea
                  value={values.note}
                  error={errors?.note}
                  onChange={handleChange(`note`)}
                  label="Catatan"
                  isOptional={true}
                  className="w-full"
                />
                <div className="flex flex-row justify-end w-full pt-2">
                  <PrimaryWithIconButton
                    label="Buat Invoice"
                    loading={isLoadingCreateInvoice}
                    type="submit"
                    icon={DocumentCheckIcon}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        title={"Pembayaran"}
        isOpen={openPayment}
        setIsOpen={setOpenPayment}
      >
        {payment?.paymentUrl ? (
          <iframe
            src={payment?.paymentUrl}
            className="h-[550px] w-full"
            title="Pembayaran"
            onChange={(e) => {
              console.log("====================================");
              console.log("e ---> ", e.target);
              console.log("====================================");
            }}
          ></iframe>
        ) : (
          <div className="w-full flex flex-col justify-center items-center gap-y-4 p-4">
            <Image
              alt=""
              src={Images.icEmptyInvoice}
              className="w-72"
              height={40}
              width={40}
            />
            <PrimaryWithIconButton
              label="Sudah Bayar"
              loading={isLoadingUpdateStatusInvoice}
              onClick={(e) => {
                e.preventDefault();
                updateStatusInvoice({
                  invoiceId: payment?.id as string,
                  status: "success",
                });
              }}
              icon={DocumentCheckIcon}
            />
          </div>
        )}
      </Modal>

      <Modal
        title={`Tambah Alamat \n${selectedMember?.title ?? ""}`}
        isOpen={openAddAddress}
        setIsOpen={setOpenAddAddress}
      >
        {selectedMember?.title ? (
          <Formik
            initialValues={memberAddressRequest}
            onSubmit={handleCreateMemberAddress}
            validationSchema={memberAddressValidation}
            suppressHydrationWarning={true}
          >
            {({ errors, handleChange, handleSubmit, values, setValues }) => (
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
                    placeholder={`Masukkan alamat ${selectedMember.title}`}
                    error={errors.address}
                    className="w-full"
                  />
                  <PrimaryInput
                    label="Alias Alamat"
                    onChange={handleChange(`addressAlias`)}
                    value={values.addressAlias ?? ""}
                    placeholder={`Masukkan alias alamat ${selectedMember.title}`}
                    error={errors.addressAlias}
                    className="w-full"
                  />
                  <PrimaryInput
                    label="Catatan Alamat"
                    onChange={handleChange(`addressNote`)}
                    value={values.addressNote ?? ""}
                    placeholder={`Masukkan catatan alamat ${selectedMember.title}`}
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
    </div>
  );
};

export default TransactionModal;
