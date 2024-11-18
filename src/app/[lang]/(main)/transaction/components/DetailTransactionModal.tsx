import React, { useState } from "react";
import Modal from "@/components/modal/Modal";
import { Form, Formik } from "formik";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import { DocumentCheckIcon } from "@heroicons/react/20/solid";
import invoiceValidation from "../validation/invoice_validation";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Invoice from "@/data/models/transaction/response/invoice";

interface DetailTransactionModalProps {
  title: string;
  invoice: Invoice;
}

const DetailTransactionModal = ({
  title,
  invoice,
}: DetailTransactionModalProps) => {
  const [openPayment, setOpenPayment] = useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState(false);

  return (
    <div>
      <IconBackgroundButton
        icon={InformationCircleIcon}
        colorBackground="blue"
        className="bg-blue-100"
        colorIcon="blue"
        onClick={() => {
          setOpenDetail(true);
        }}
      />
      <Modal title={title} isOpen={openDetail} setIsOpen={setOpenDetail}>
        <Formik
          initialValues={{}}
          onSubmit={() => {}}
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
            <Form onSubmit={() => {}}>
              <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
                {/*
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
                      ceremonyDate: e.toISOString(),
                    });
                  }}
                  value={new Date(values.ceremonyDate)}
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
                      memberAddressId: value?.id as number,
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
                /> */}
                {invoice.status === "pending" && (
                  <div className="flex flex-row justify-end w-full pt-2">
                    <PrimaryWithIconButton
                      label="Bayar Sekarang"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenPayment(true);
                      }}
                      icon={DocumentCheckIcon}
                    />
                  </div>
                )}
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
        <iframe
          src={invoice.paymentUrl}
          className="h-[550px] w-full"
          title={`Pembayaran untuk Invoice: ${invoice.id}`}
          onChange={(e) => {
            console.log("====================================");
            console.log("e ---> ", e.target);
            console.log("====================================");
          }}
        ></iframe>
      </Modal>
    </div>
  );
};

export default DetailTransactionModal;
