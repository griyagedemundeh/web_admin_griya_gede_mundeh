import DropdownInput from "@/components/dropdown/DropdownInput";
import PrimaryInput from "@/components/input/PrimaryInput";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";
import PrimaryModal from "@/components/modal/PrimaryModal";
import React, { ReactElement } from "react";

interface CeremonyScheduleModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  bottomAction: ReactElement;
}

const CeremonyScheduleModal = ({
  open,
  setOpen,
  title,
  bottomAction,
}: CeremonyScheduleModalProps) => {
  return (
    <PrimaryModal
      open={open}
      setOpen={setOpen}
      title={title}
      content={
        <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
          <PrimaryInput
            name="Status"
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

          <PrimaryInput
            name="Pemedek/Penyelenggara"
            onChange={(e) => {}}
            value={""}
            className="w-full"
          />
          <PrimaryInput
            name="Tanggal Upacara"
            onChange={(e) => {}}
            value={""}
            className="w-full"
          />
          <PrimaryInput
            name="Lokasi Upacara"
            onChange={(e) => {}}
            value={""}
            className="w-full"
          />
          <PrimaryInput
            name="Pengelola"
            onChange={(e) => {}}
            value={""}
            className="w-full"
          />

          <PrimaryTextArea
            onChange={(e) => {}}
            value={""}
            label="Catatan"
            isOptional={true}
            className="w-full"
          />
        </div>
      }
      bottomAction={bottomAction}
    />
  );
};

export default CeremonyScheduleModal;
