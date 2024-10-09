import PrimaryInput from "@/components/input/PrimaryInput";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";
import SwitchInput from "@/components/input/SwitchInput";
import PrimaryModal from "@/components/modal/PrimaryModal";
import React, { ReactElement } from "react";

interface CeremonyCategoryModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  activeCeremonyCategory?: boolean;
  setActiveCeremonyCategory?: (value: boolean) => void;
  bottomAction: ReactElement;
  isForDetail?: boolean;
}

const CeremonyCategoryModal = ({
  open,
  setOpen,
  title,
  activeCeremonyCategory,
  setActiveCeremonyCategory,
  bottomAction,
  isForDetail,
}: CeremonyCategoryModalProps) => {
  return (
    <PrimaryModal
      open={open}
      setOpen={setOpen}
      title={"Tambah Kategori Upacara Agama"}
      content={
        <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
          {/* <PhotoProfileInput /> */}
          <PrimaryInput
            label="Nama Kategori Upacara Agama"
            onChange={(e) => {}}
            value={""}
            className="w-full"
          />
          <PrimaryTextArea
            onChange={(e) => {}}
            value={""}
            label="Deskripsi Kategori Upacara"
            className="w-full"
          />

          {activeCeremonyCategory !== undefined && (
            <SwitchInput
              className="self-start pt-2"
              label={
                <span className="font-medium text-gray-500">
                  Aktif/Non-Aktif
                </span>
              }
              value={activeCeremonyCategory ?? false}
              onChange={(e) => {
                if (setActiveCeremonyCategory) {
                  setActiveCeremonyCategory(e);
                }
              }}
            />
          )}
        </div>
      }
      bottomAction={bottomAction}
    />
  );
};

export default CeremonyCategoryModal;
