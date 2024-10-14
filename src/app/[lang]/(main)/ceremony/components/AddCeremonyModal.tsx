import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import SecondaryWithIconButton from "@/components/button/SecondaryWithIconButton";
import CeremonyPackage from "@/data/models/ceremonyPackage";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";

import React, { ReactElement, useState } from "react";
import AddCeremonyModalContent from "./AddCeremonyModalContent";
import PrimaryModal from "@/components/modal/PrimaryModal";
import Modal from "@/components/modal/Modal";
import { Form, Formik } from "formik";
import CeremonyRequest from "@/data/models/ceremony/request/ceremony_request";

interface AddCeremonyModalProps {
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

const AddCeremonyModal = ({
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
}: AddCeremonyModalProps): ReactElement => {
  const [ceremonyRequest, setCeremonyRequest] = useState<CeremonyRequest>({
    title: "",
    ceremonyCategoryId: "",
    description: "",
  });

  const handleAddCeremony = (ceremonyRequest: CeremonyRequest) => {};

  return (
    <Modal title="Tambah Upacara Agama" isOpen={open} setIsOpen={setOpen}>
      <AddCeremonyModalContent
        ceremonyRequest={ceremonyRequest}
        handleCeremonySubmit={handleAddCeremony}
        ceremonyCategories={ceremonyCategories}
        ceremonyPackages={ceremonyPackages}
        progress={progress}
        selectedCeremonyCategory={selectedCeremonyCategory}
        setCeremonyPackages={setCeremonyPackages}
        setProgress={setProgress}
        setSelectedCeremonyCategory={setSelectedCeremonyCategory}
        setSelectedCeremonyPackage={setSelectedCeremonyPackage}
      />
    </Modal>
    // <PrimaryModal
    //   open={open}
    //   setOpen={setOpen}
    //   title="Tambah Upacara Agama"
    //   content={
    //     <AddCeremonyModalContent
    //       ceremonyCategories={ceremonyCategories}
    //       ceremonyPackages={ceremonyPackages}
    //       progress={progress}
    //       selectedCeremonyCategory={selectedCeremonyCategory}
    //       setCeremonyPackages={setCeremonyPackages}
    //       setProgress={setProgress}
    //       setSelectedCeremonyCategory={setSelectedCeremonyCategory}
    //       setSelectedCeremonyPackage={setSelectedCeremonyPackage}
    //     />
    //   }
    //   bottomAction={
    // <>
    //   {progress > 50 ? (
    //     <SecondaryWithIconButton
    //       label="Kembali"
    //       className="w-full"
    //       onClick={() => {
    //         setProgress(progress - 33.33);
    //       }}
    //       icon={ChevronDoubleLeftIcon}
    //     />
    //   ) : null}
    //   <PrimaryWithIconButton
    //     label="Selanjutnya"
    //     className={progress > 50 ? "w-full" : ""}
    //     onClick={() => {
    //       setProgress(progress + 33.33);
    //     }}
    //     icon={ChevronDoubleRightIcon}
    //   />
    // </>
    //   }
    // />
  );
};

export default AddCeremonyModal;
