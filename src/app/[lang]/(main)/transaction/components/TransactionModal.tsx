import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import DropdownInput from "@/components/dropdown/DropdownInput";
import PrimaryInput from "@/components/input/PrimaryInput";
import PrimaryModal from "@/components/modal/PrimaryModal";
import { MapPinIcon } from "@heroicons/react/20/solid";
import React, { ReactElement } from "react";

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
              name="Nama Upacara"
              onChange={(e) => {}}
              value={""}
              className="w-full"
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
          <PrimaryInput
            name="No.Handphone"
            onChange={(e) => {}}
            value={""}
            className="w-full"
          />

          {isForDetail && (
            <div className="flex flex-row space-x-2 items-end w-full">
              <PrimaryInput
                name="Alamat Utama"
                onChange={(e) => {}}
                value={""}
                className="w-full"
              />

              <IconBackgroundButton
                icon={MapPinIcon}
                onClick={() => {}}
                colorIcon="white"
                className="bg-gray-300 hover:bg-gray-200"
              />
            </div>
          )}

          <PrimaryInput
            name="Alamat Utama"
            onChange={(e) => {}}
            value={""}
            className="w-full"
          />
          <PrimaryInput
            name="Password"
            onChange={(e) => {}}
            value={""}
            type="password"
            className="w-full"
          />
          <PrimaryInput
            name="Konfirmasi Password"
            onChange={(e) => {}}
            value={""}
            type="password"
            className="w-full"
          />
        </div>
      }
      bottomAction={bottomAction}
    />
  );
};

export default TransactionModal;
