import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import SecondaryWithIconButton from "@/components/button/SecondaryWithIconButton";
import CeremonyPackage from "@/data/models/ceremonyPackage";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";

import React, { ReactElement } from "react";
import AddCeremonyModalContent from "./AddCeremonyModalContent";
import PrimaryModal from "@/components/modal/PrimaryModal";

interface DetailCeremonyModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  progress: number;
  setProgress: (value: number) => void;
  ceremonyCategories: DropdownFilterItemProps[];
  selectedCeremonyCategory: DropdownFilterItemProps | undefined;
  setSelectedCeremonyCategory: (
    value: DropdownFilterItemProps | undefined
  ) => void;
  ceremonyPackages: CeremonyPackage[];
  setCeremonyPackages: (value: CeremonyPackage[]) => void;
  setSelectedCeremonyPackage: (value: CeremonyPackage | undefined) => void;
}

const DetailCeremonyModal = ({
  open,
  setOpen,
  progress,
  setProgress,
  ceremonyCategories,
  selectedCeremonyCategory,
  setSelectedCeremonyCategory,
  ceremonyPackages,
  setSelectedCeremonyPackage,
  setCeremonyPackages,
}: DetailCeremonyModalProps): ReactElement => {
  return (
    <PrimaryModal
      open={open}
      setOpen={setOpen}
      title="Detail Upacara Agama"
      content={
        <AddCeremonyModalContent
          ceremonyCategories={ceremonyPackages}
          ceremonyPackages={ceremonyPackages}
          progress={progress}
          selectedCeremonyCategory={selectedCeremonyCategory}
          setCeremonyPackages={setCeremonyPackages}
          setProgress={setProgress}
          setSelectedCeremonyCategory={setSelectedCeremonyCategory}
          setSelectedCeremonyPackage={setSelectedCeremonyPackage}
        />
      }
      bottomAction={
        <>
          {progress > 50 ? (
            <SecondaryWithIconButton
              label="Kembali"
              className="w-full"
              onClick={() => {
                setProgress(progress - 33.33);
              }}
              icon={ChevronDoubleLeftIcon}
            />
          ) : null}
          <PrimaryWithIconButton
            label="Selanjutnya"
            className={progress > 50 ? "w-full" : ""}
            onClick={() => {
              setProgress(progress + 33.33);
            }}
            icon={ChevronDoubleRightIcon}
          />
        </>
      }
    />
  );
};

export default DetailCeremonyModal;
