import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import React, { ReactElement, useEffect, useState } from "react";

import Modal from "@/components/modal/Modal";
import CeremonyRequest from "@/data/models/ceremony/request/ceremony_request";
import { useCentralStore } from "@/store";
import { useCeremony } from "@/hooks/ceremony/use_ceremony";
import CeremonyDocumentationRequest from "@/data/models/ceremony/request/ceremony_documentation_request";
import { CeremonyPackagesRequest } from "@/data/models/ceremony/request/ceremony_package_request";
import CeremonyModalContent from "./CeremonyModalContent";

interface AddCeremonyModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const AddCeremonyModal = ({
  open,
  setOpen,
}: AddCeremonyModalProps): ReactElement => {
  const { setIsLoading, isLoading } = useCentralStore();
  const [progress, setProgress] = useState<number>(33.33);
  const {
    addCeremony,
    isAddCeremonySuccess,
    ceremony,
    addCeremonyDocumentation,
    isAddCeremonyDocumentationSuccess,
    addCeremonyPackages,
    isAddCeremonyPackagesSuccess,
  } = useCeremony();

  const [selectedCeremonyCategory, setSelectedCeremonyCategory] =
    useState<DropdownFilterItemProps>();

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

  const handleAddCeremonyPackeges = (
    ceremonyPackagesRequest: CeremonyPackagesRequest
  ) => {
    setIsLoading(true);
    addCeremonyPackages(ceremonyPackagesRequest);
  };

  const [ceremonyPackages, setCeremonyPackages] =
    useState<CeremonyPackagesRequest>();

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

      setCeremonyPackages({
        packages: [
          {
            id: `${new Date()}`,
            name: "",
            price: 0,
            description: "",
            ceremonyServiceId: ceremony?.id ?? "",
          },
        ],
      });
    }

    if (isAddCeremonyDocumentationSuccess) {
      setProgress(progress + 33.33);
    }

    if (isAddCeremonyPackagesSuccess) {
      setOpen(false);
    }
  }, [
    isAddCeremonySuccess,
    isAddCeremonyDocumentationSuccess,
    isAddCeremonyPackagesSuccess,
    ceremony,
  ]);

  return (
    <Modal title="Tambah Upacara Agama" isOpen={open} setIsOpen={setOpen}>
      <CeremonyModalContent
        progress={progress}
        loading={isLoading}
        // CEREMONY
        ceremony={ceremony}
        ceremonyRequest={ceremonyRequest}
        handleCeremonySubmit={handleAddCeremony}
        // DOCUMENTATION
        ceremonyDocumentationRequest={ceremonyDocumentationRequest}
        handleCeremonyDocumentationSubmit={handleAddCeremonyDocumentation}
        // PACKAGE
        ceremonyPackagesRequest={ceremonyPackages ?? { packages: [] }}
        selectedCeremonyCategory={selectedCeremonyCategory}
        setProgress={setProgress}
        setSelectedCeremonyCategory={setSelectedCeremonyCategory}
        handleCeremonyPackagesSubmit={handleAddCeremonyPackeges}
      />
    </Modal>
  );
};

export default AddCeremonyModal;
