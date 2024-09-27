import DropdownInput from "@/components/dropdown/DropdownInput";
import PrimaryCurrencyInput from "@/components/input/PrimaryCurrencyInput";
import PrimaryInput from "@/components/input/PrimaryInput";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";
import PrimaryModal from "@/components/modal/PrimaryModal";
import React, { ReactElement } from "react";
import PrimaryDatePicker from "@/components/input/PrimaryDatePicker";

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
    <PrimaryModal
      open={open}
      setOpen={setOpen}
      title={title}
      content={
        <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
          <div className="w-full flex flex-row space-x-4">
            <PrimaryInput
              name="Nama Upacara"
              onChange={(e) => {}}
              value={""}
              className="w-full"
            />
            <PrimaryInput
              name="Judul Tambahan"
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
            name="Lokasi Upacara"
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
            name="Catatan"
            isOptional={true}
            className="w-full"
          />
        </div>
      }
      bottomAction={bottomAction}
    />
  );
};

export default TransactionModal;
