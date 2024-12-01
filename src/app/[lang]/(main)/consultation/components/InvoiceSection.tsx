import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import PrimaryInput from "@/components/input/PrimaryInput";
import {
  CheckCircleIcon,
  DocumentCheckIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import { Form, Formik } from "formik";
import memberAddressValidation from "../../member/validation/member_address_validation";
import IconButton from "@/components/button/IconButton";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import invoiceValidation from "../../transaction/validation/invoice_validation";
import DropdownInput from "@/components/dropdown/DropdownInput";
import Image from "next/image";
import { useEffect, useState } from "react";
import MemberAddressRequest from "@/data/models/member/request/member_address_request";
import InvoiceRequest from "@/data/models/transaction/request/invoice_request";
import { useMember } from "@/hooks/member/use_member";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import { useCeremony } from "@/hooks/ceremony/use_ceremony";

import { useTransaction } from "@/hooks/transaction/use_transaction";
import { useAdmin } from "@/hooks/admin/use_admin";
import Images from "@/constants/images";
import PrimaryDatePicker from "@/components/input/PrimaryDatePicker";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import PrimaryCurrencyInput from "@/components/input/PrimaryCurrencyInput";
import PrimaryTextEditor from "@/components/input/PrimaryTextEditor";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";
import { CeremonyPackage } from "@/data/models/ceremony/response/ceremony_package";
import { useCentralStore } from "@/store";

interface InvoiceSectionProps {
  ceremonyServiceId: number;
}

function InvoiceSection({ ceremonyServiceId }: InvoiceSectionProps) {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openAddAddress, setOpenAddAddress] = useState<boolean>(false);

  const { setInvoice, invoice } = useCentralStore();

  const { allAdmin } = useAdmin();

  const {
    createInvoice,
    isLoadingCreateInvoice,
    payment,
    isCreateInvoiceSuccess,
  } = useTransaction();

  const [selectedCeremony, setSelectedCeremony] =
    useState<DropdownFilterItemProps>();
  const [selectedAdmin, setSelectedAdmin] = useState<DropdownFilterItemProps>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<DropdownFilterItemProps>();
  const [selectedMember, setSelectedMember] =
    useState<DropdownFilterItemProps>();
  const [selectedPackage, setSelectedPackage] =
    useState<DropdownFilterItemProps>();
  const [selectedPackageFull, setSelectedPackageFull] =
    useState<CeremonyPackage>();
  const [selectedAddress, setSelectedAddress] =
    useState<DropdownFilterItemProps>();

  const { allCeremonyPackageByCeremonyServiceId, allCeremony } = useCeremony({
    ceremonyServiceId: ceremonyServiceId ?? selectedCeremony?.id,
  });

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
        allCeremony.data.map((ceremony) => ({
          id: ceremony?.id,
          title: `${ceremony?.title}`,
        }))
      );
    }
    if (allAdmin?.data) {
      setAdmins(
        allAdmin.data.map((admin) => ({
          id: admin?.id,
          title: `${admin?.user?.fullName} - ${admin?.user?.phoneNumber}`,
        }))
      );
    }
    if (allCeremonyPackageByCeremonyServiceId?.data) {
      setPackages(
        allCeremonyPackageByCeremonyServiceId.data.map((ceremonyPackage) => ({
          id: ceremonyPackage?.id,
          title: `${ceremonyPackage?.name}`,
        }))
      );
    }
    if (allMember?.data) {
      setMembers(
        allMember.data.map((member) => ({
          id: member?.id,
          title: `${member?.user?.fullName}`,
        }))
      );
    }
  }, [
    allCeremony?.data,
    allAdmin?.data,
    allCeremonyPackageByCeremonyServiceId?.data,
    allMember?.data,
    selectedCeremony,
  ]);

  useEffect(() => {
    if (allAddress?.data) {
      setAddresses(
        allAddress.data.map((address, index) => ({
          id: address.id,
          title:
            `${address?.addressAlias ?? `Rumah ${index + 1}`}` +
            `- ${address.address}`,
        }))
      );
    }

    setMemberAddressRequest({
      ...memberAddressRequest,
      userId: selectedMember?.id as number,
    });
  }, [selectedMember, allAddress]);

  const handleAddInvoice = (invoiceRequest: InvoiceRequest) => {
    const ceremonyDate = new Date(invoiceRequest.ceremonyDate);

    const date = `${ceremonyDate.getFullYear()}-${
      ceremonyDate.toLocaleDateString().split("/")[0]
    }-${ceremonyDate.getDate()} ${
      ceremonyDate.toTimeString().split("GMT+0800 (Central Indonesia Time)")[0]
    }`;

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

  // Refresh Member Address Dropdown with new data right after add some
  useEffect(() => {
    if (isCreateMemberAddressSuccess && allAddress?.data) {
      refecthAllAddress();
      setOpenAddAddress(false);
      setAddresses(
        allAddress.data.map((address, index) => ({
          id: address.id,
          title:
            `${address?.addressAlias ?? `Rumah ${index + 1}`}` +
            `- ${address.address}`,
        }))
      );
    }
  }, [isCreateMemberAddressSuccess, allAddress?.data]);

  // Send the Invoice to Chat Section
  useEffect(() => {
    if (payment && isCreateInvoiceSuccess) {
      setInvoice(payment);
      setOpenCreate(false);
      setOpenAddAddress(false);
    }
  }, [payment, isCreateInvoiceSuccess, invoice]);

  if (!openCreate && !openAddAddress) {
    return (
      <div className="w-1/4 p-4 border-l border-gray-300 rounded-tr-xl rounded-br-xl flex flex-col items-center justify-center">
        <Image
          alt=""
          src={Images.icEmptyInvoice}
          className="w-52"
          height={40}
          width={40}
        />
        <h3 className="text-lg font-bold">Sudah Deal?</h3>
        <p className="text-sm text-gray-500 mb-4">
          Ayo Buatkan Invoice Untuk User
        </p>
        <PrimaryWithIconButton
          label="Buat Invoice"
          className="w-full"
          onClick={() => {
            // setOpen(true);
            setOpenCreate(true);
          }}
          icon={DocumentCheckIcon}
        />
      </div>
    );
  }

  if (openCreate && !openAddAddress) {
    return (
      <div className="w-2/5">
        <div
          className="w-full overflow-y-scroll border-l-[1.5px] border-gray-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-200 scrollbar-track-white"
          style={{ height: "40rem" }}
        >
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
                onSubmit={() => {
                  handleAddInvoice(values);
                }}
              >
                <div className="flex flex-col items-center w-full px-8 space-y-4 py-6">
                  <div className=" w-full flex flex-row items-center">
                    <IconButton
                      icon={ArrowLeftCircleIcon}
                      onClick={() => {
                        setOpenCreate(false);
                        setOpenAddAddress(false);
                      }}
                      className="h-10 w-10 flex flex-row items-center justify-center"
                      classNameIcon="text-red"
                    />
                    <p className="text-lg font-bold text-start">Buat Invoice</p>
                  </div>
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
                            if (
                              parseInt(`${value.id}`) === ceremonyPackage.id
                            ) {
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
                        setOpenCreate(false);
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
                    value={
                      selectedPackageFull?.description ?? values.description
                    }
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
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      icon={DocumentCheckIcon}
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }

  if (!openCreate && openAddAddress && !selectedMember?.title) {
    return (
      <div className="p-6 w-2/5 flex flex-row items-center justify-center border-l-[1.5px] border-gray-300">
        <IconButton
          icon={ArrowLeftCircleIcon}
          onClick={() => {
            setOpenCreate(true);
            setOpenAddAddress(false);
          }}
          className="h-10 w-10 flex flex-row items-center justify-center"
          classNameIcon="text-red"
        />
        <p>Tolong pilih Pemedek/Pengguna!</p>
      </div>
    );
  }

  if (!openCreate && openAddAddress && selectedMember?.title) {
    return (
      <div className="w-2/6">
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
              <div className="flex flex-col items-center px-8 py-6 space-y-4 border-l-[1.5px] border-gray-300 w-full">
                <div className=" w-full flex flex-row items-center">
                  <IconButton
                    icon={ArrowLeftCircleIcon}
                    onClick={() => {
                      setOpenCreate(true);
                      setOpenAddAddress(false);
                    }}
                    className="h-10 w-10 flex flex-row items-center justify-center"
                    classNameIcon="text-red"
                  />
                  <p className="text-lg font-bold text-start">
                    Tambah Alamat {selectedMember.title}{" "}
                  </p>
                </div>
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
      </div>
    );
  }
}

export default InvoiceSection;