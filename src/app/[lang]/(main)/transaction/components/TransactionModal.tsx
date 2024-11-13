import DropdownInput from "@/components/dropdown/DropdownInput";
import PrimaryCurrencyInput from "@/components/input/PrimaryCurrencyInput";
import PrimaryInput from "@/components/input/PrimaryInput";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";
import React, { useEffect, useState } from "react";
import PrimaryDatePicker from "@/components/input/PrimaryDatePicker";
import Modal from "@/components/modal/Modal";
import { Form, Formik } from "formik";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import { DocumentCheckIcon } from "@heroicons/react/20/solid";
import { useAdmin } from "@/hooks/admin/use_admin";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import { useCeremony } from "@/hooks/ceremony/use_ceremony";
import { useMember } from "@/hooks/member/use_member";
import { CeremonyPackage } from "@/data/models/ceremony/response/ceremony_package";
import invoiceValidation from "../validation/invoice_validation";
import PrimaryTextEditor from "@/components/input/PrimaryTextEditor";

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
  const { allAdmin } = useAdmin();
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
    consultationId: "",
    ceremonyServiceId: "",
    additionalTitle: "",
    ceremonyPackageId: "",
  });

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
          id: `${ceremonyPackage?.id}`,
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
        allAddress.data.map((address) => ({
          id: address.id,
          title: `${address?.addressAlias ?? "Rumah"} - ${address.address}`,
        }))
      );
    }
  }, [selectedMember, allAddress]);

  const handleAddInvoice = (invoiceRequest: InvoiceRequest) => {
    console.log("====================================");
    console.log("DATA ===>> ", invoiceRequest);
    console.log("====================================");
  };

  return (
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
            onSubmit={() => {
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
                      ceremonyServiceId: `${value?.id}`,
                      totalPrice: "",
                      description: "",
                    });
                  }}
                  className="w-full"
                />
                <PrimaryInput
                  label="Judul Tambahan"
                  onChange={handleChange(`additionalTitle`)}
                  value={values.additionalTitle ?? ""}
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
                error={errors.ceremonyPackageId}
                setSelectedItem={(value) => {
                  setSelectedPackage(value);

                  if (value === undefined) {
                    setValues({
                      ...values,
                      totalPrice: "",
                      description: "",
                      ceremonyPackageId: undefined,
                    });
                  } else {
                    allCeremonyPackageByCeremonyServiceId?.data?.map(
                      (ceremonyPackage) => {
                        if (parseInt(`${value.id}`) === ceremonyPackage.id) {
                          setValues({
                            ...values,
                            ceremonyPackageId: value.id,
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
                    memberAddressId: undefined,
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
                  setValues({ ...values, ceremonyDate: e });
                }}
                value={values.ceremonyDate}
                error={`${errors?.ceremonyDate ?? ""}`}
                className="w-full"
              />

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
                    memberAddressId: value?.id as string,
                  });
                }}
                className="w-full"
              />

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
                    adminId: e?.id as string,
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
                  type="submit"
                  onClick={() => {
                    handleSubmit();
                  }}
                  icon={DocumentCheckIcon}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default TransactionModal;
