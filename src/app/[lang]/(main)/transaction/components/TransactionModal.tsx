import DropdownInput from "@/components/dropdown/DropdownInput";
import PrimaryCurrencyInput from "@/components/input/PrimaryCurrencyInput";
import PrimaryInput from "@/components/input/PrimaryInput";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";
import React, { ReactElement } from "react";
import PrimaryDatePicker from "@/components/input/PrimaryDatePicker";
import Modal from "@/components/modal/Modal";
import { Form, Formik } from "formik";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import { DocumentCheckIcon } from "@heroicons/react/20/solid";

interface TransactionModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  bottomAction: ReactElement;
  isForDetail?: boolean;
}

const TransactionModal = ({
  open,
  setOpen,
  title,
  bottomAction,
  isForDetail,
}: TransactionModalProps) => {
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
                <PrimaryInput
                  label="Nama Upacara"
                  onChange={(e) => {}}
                  value={""}
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
                items={[]}
                label="Paket"
                placeholder="Pilih Paket Upacara"
                selectedItem={undefined}
                setSelectedItem={(value) => {}}
                className="w-full"
                isOptional={true}
              />
              <DropdownInput
                items={[]}
                label="Pemedek/Pengguna"
                placeholder="Pilih Pemedek/Pengguna"
                selectedItem={undefined}
                setSelectedItem={(value) => {}}
                className="w-full"
              />
              <DropdownInput
                items={[]}
                label="Tipe Pembayaran"
                placeholder="Pilih metode pembayaran"
                selectedItem={undefined}
                setSelectedItem={(value) => {}}
                className="w-full"
              />

              <PrimaryDatePicker
                label="Tanggal Upacara"
                setValue={(e) => {}}
                value={[new Date(), new Date()]}
                className="w-full"
              />

              <PrimaryInput
                label="Lokasi Upacara"
                onChange={(e) => {}}
                value={""}
                className="w-full"
              />

              <PrimaryCurrencyInput
                label="Total Harga"
                setValue={(e) => {}}
                value=""
                placeholder="Masukkan total harga"
                className="w-full"
              />

              <DropdownInput
                items={[]}
                label="Pengelola"
                placeholder="Pilih pengelola"
                selectedItem={undefined}
                setSelectedItem={(value) => {}}
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
