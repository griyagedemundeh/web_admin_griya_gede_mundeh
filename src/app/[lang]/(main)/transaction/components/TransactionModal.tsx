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
    { id: 1, title: "Transfer/Online" },
    { id: 2, title: "Tunai/Offline" },
  ]);

  const { allMember, allAddress } = useMember({ userId: selectedMember?.id });

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
  useEffect(() => {
    allCeremonyPackageByCeremonyServiceId?.data?.map((ceremonyPackage) => {
      if (parseInt(`${selectedPackage?.id}`) === ceremonyPackage.id) {
        setSelectedPackageFull(ceremonyPackage);
      }
    });
  }, [selectedPackage]);

  return (
    <Modal title={title} isOpen={open} setIsOpen={setOpen}>
      <Formik
        initialValues={{}}
        onSubmit={() => {}}
        // validationSchema={}
        suppressHydrationWarning={true}
      >
        {({
          errors,
          handleChange,
          handleSubmit,
          values,
          setFieldValue,
          setValues,
        }) => (
          <Form
            onSubmit={() => {
              // handleAddArticle(values);
            }}
          >
            <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
              <div className="w-full flex flex-row space-x-4">
                {/* <PrimaryInput
                  label="Nama Upacara"
                  onChange={(e) => {}}
                  value={""}
                  className="w-full"
                /> */}
                <DropdownInput
                  items={ceremonies ?? []}
                  label="Upacara"
                  placeholder="Pilih Upacara"
                  selectedItem={selectedCeremony}
                  setSelectedItem={(value) => {
                    setSelectedCeremony(value);
                  }}
                  className="w-full"
                />
                <PrimaryInput
                  label="Judul Tambahan"
                  onChange={(e) => {}}
                  value={""}
                  className="w-full"
                  isOptional={true}
                />
              </div>
              <DropdownInput
                items={packages ?? []}
                label="Paket"
                placeholder="Pilih Paket Upacara"
                selectedItem={selectedPackage}
                setSelectedItem={(value) => {
                  setSelectedPackage(value);
                }}
                className="w-full"
                isOptional={true}
              />
              <DropdownInput
                items={members ?? []}
                label="Pemedek/Pengguna"
                placeholder="Pilih Pemedek/Pengguna"
                selectedItem={selectedMember}
                setSelectedItem={(value) => {
                  setSelectedMember(value);
                }}
                className="w-full"
              />
              <DropdownInput
                items={paymentMethods ?? []}
                label="Tipe Pembayaran"
                placeholder="Pilih metode pembayaran"
                selectedItem={selectedPaymentMethod}
                setSelectedItem={(value) => {
                  setSelectedPaymentMethod(value);
                }}
                className="w-full"
              />

              <PrimaryDatePicker
                label="Tanggal Upacara"
                setValue={(e) => {}}
                value={[new Date(), new Date()]}
                className="w-full"
              />

              {/* <PrimaryInput
                label="Lokasi Upacara"
                onChange={(e) => {}}
                value={""}
                className="w-full"
              /> */}
              <DropdownInput
                items={addresses ?? []}
                label="Lokasi/Alamat Upacara"
                placeholder="Pilih Lokasi/Alamat Upacara"
                selectedItem={selectedAddress}
                setSelectedItem={(value) => {
                  setSelectedAddress(value);
                }}
                className="w-full"
              />

              {/* <PrimaryCurrencyInput
                label="Total Harga"
                setValue={(e) => {}}
                value={}
                placeholder="Masukkan total harga"
                className="w-full"
              /> */}

              <PrimaryCurrencyInput
                label="Total Harga"
                value={selectedPackageFull?.price}
                // error={(errors?.packages?.[index] as any)?.price}
                // setValue={handleChange(`packages.${index}.price`)}
                setValue={(e) => {}}
                placeholder="Masukkan harga paket"
                className="w-full"
              />
              <DropdownInput
                items={admins ?? []}
                label="Pengelola"
                placeholder="Pilih pengelola"
                selectedItem={selectedAdmin}
                setSelectedItem={(e) => {
                  setSelectedAdmin(e);
                  // setValues({
                  //   ...values,
                  //   ceremonyCategoryId: e?.id as string,
                  // });
                }}
                className="w-full"
              />

              <PrimaryTextArea
                onChange={(e) => {}}
                value={""}
                label="Catatan"
                isOptional={true}
                className="w-full"
              />
              <div className="flex flex-row justify-end w-full pt-2">
                <PrimaryWithIconButton
                  label="Buat Invoice"
                  onClick={() => {}}
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
