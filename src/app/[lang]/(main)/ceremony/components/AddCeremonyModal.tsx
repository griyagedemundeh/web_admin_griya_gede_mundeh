import CeremonyPackage from "@/data/models/ceremonyPackage";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import React, { ReactElement, useEffect, useState } from "react";
import AddCeremonyModalContent from "./AddCeremonyModalContent";
import Modal from "@/components/modal/Modal";
import CeremonyRequest from "@/data/models/ceremony/request/ceremony_request";
import { useCentralStore } from "@/store";
import { useCeremony } from "@/hooks/ceremony/use_ceremony";
import CeremonyDocumentationRequest from "@/data/models/ceremony/request/ceremony_documentation_request";
import {
  CeremonyPackageRequest,
  CeremonyPackagesRequest,
} from "@/data/models/ceremony/request/ceremony_package_request";

interface AddCeremonyModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  progress: number;
  setProgress: (value: number) => void;
  selectedCeremonyCategory: DropdownFilterItemProps | undefined;
  setSelectedCeremonyCategory: (
    value: DropdownFilterItemProps | undefined
  ) => void;
}

const AddCeremonyModal = ({
  open,
  setOpen,
  progress,
  setProgress,
  selectedCeremonyCategory,
  setSelectedCeremonyCategory,
}: AddCeremonyModalProps): ReactElement => {
  const { setIsLoading, isLoading } = useCentralStore();
  const {
    addCeremony,
    isAddCeremonySuccess,
    ceremony,
    addCeremonyDocumentation,
    isAddCeremonyDocumentationSuccess,
    addCeremonyPackages,
    isAddCeremonyPackagesSuccess,
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

  const handleAddCeremonyPackeges = (
    ceremonyPackagesRequest: CeremonyPackagesRequest
  ) => {
    setIsLoading(true);
    addCeremonyPackages(ceremonyPackagesRequest);
  };

  const [ceremonyPackages, setCeremonyPackages] =
    useState<CeremonyPackagesRequest>();
  const [selectedCeremonyPackage, setSelectedCeremonyPackage] =
    useState<CeremonyPackageRequest>();

  const removeCeremonyPackage = () => {
    setCeremonyPackages({
      package:
        ceremonyPackages?.package?.filter(
          (item) => item.id !== selectedCeremonyPackage?.id
        ) ?? [],
    });
  };

  useEffect(() => {
    removeCeremonyPackage();
  }, [selectedCeremonyPackage]);

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
        package: [
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
      <AddCeremonyModalContent
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
        ceremonyPackagesRequest={ceremonyPackages ?? { package: [] }}
        selectedCeremonyCategory={selectedCeremonyCategory}
        setCeremonyPackagesRequest={setCeremonyPackages}
        setProgress={setProgress}
        setSelectedCeremonyCategory={setSelectedCeremonyCategory}
        setSelectedCeremonyPackageRequest={setSelectedCeremonyPackage}
        handleCeremonyPackagesSubmit={handleAddCeremonyPackeges}
      />
    </Modal>
  );
};

export default AddCeremonyModal;
