import CeremonyPackage from "@/data/models/ceremonyPackage";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import React, { ReactElement, useEffect, useState } from "react";
import AddCeremonyModalContent from "./AddCeremonyModalContent";
import Modal from "@/components/modal/Modal";
import CeremonyRequest from "@/data/models/ceremony/request/ceremony_request";
import { useCentralStore } from "@/store";
import { useCeremony } from "@/hooks/ceremony/use_ceremony";
import CeremonyDocumentationRequest from "@/data/models/ceremony/request/ceremony_documentation_request";

interface AddCeremonyModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  progress: number;
  setProgress: (value: number) => void;
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
  selectedCeremonyCategory,
  setSelectedCeremonyCategory,
  ceremonyPackages,
  setSelectedCeremonyPackage,
  setCeremonyPackages,
}: AddCeremonyModalProps): ReactElement => {
  const { setIsLoading, isLoading } = useCentralStore();
  const {
    addCeremony,
    isAddCeremonySuccess,
    ceremony,
    addCeremonyDocumentation,
  } = useCeremony();

  const [ceremonyRequest, setCeremonyRequest] = useState<CeremonyRequest>({
    title: "",
    ceremonyCategoryId: "",
    description: "",
  });

  const [ceremonyDocumentationRequest, setCeremonyDocumentationRequest] =
    useState<CeremonyDocumentationRequest>({
      ceremonyServiceId: ceremony?.id as number,
      photo: null,
    });

  const handleAddCeremony = (ceremonyRequest: CeremonyRequest) => {
    setIsLoading(true);
    addCeremony(ceremonyRequest);
  };

  const handleAddCeremonyDocumentation = (
    ceremonyDocumentRequest: CeremonyDocumentationRequest
  ) => {
    setIsLoading(true);
    addCeremonyDocumentation(ceremonyDocumentRequest);
  };

  useEffect(() => {
    if (isAddCeremonySuccess) {
      setProgress(progress + 33.33);
      setCeremonyRequest({
        ceremonyCategoryId: ceremony?.ceremonyCategoryId ?? "",
        description: ceremony?.description ?? "",
        title: ceremony?.title ?? "",
      });

      setCeremonyDocumentationRequest({
        ...ceremonyDocumentationRequest,
        ceremonyServiceId: ceremony?.id as number,
      });
    }
  }, [isAddCeremonySuccess, ceremony]);

  return (
    <Modal title="Tambah Upacara Agama" isOpen={open} setIsOpen={setOpen}>
      <AddCeremonyModalContent
        progress={progress}
        loading={isLoading}
        // CEREMONY
        ceremonyRequest={ceremonyRequest}
        handleCeremonySubmit={handleAddCeremony}
        // DOCUMENTATION
        ceremonyDocumentationRequest={ceremonyDocumentationRequest}
        handleCeremonyDocumentationSubmit={handleAddCeremonyDocumentation}
        // PACKAGE
        ceremonyPackages={ceremonyPackages}
        selectedCeremonyCategory={selectedCeremonyCategory}
        setCeremonyPackages={setCeremonyPackages}
        setProgress={setProgress}
        setSelectedCeremonyCategory={setSelectedCeremonyCategory}
        setSelectedCeremonyPackage={setSelectedCeremonyPackage}
      />
    </Modal>
  );
};

export default AddCeremonyModal;
