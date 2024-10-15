import PrimaryInput from "@/components/input/PrimaryInput";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import { PencilIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import Modal from "@/components/modal/Modal";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import { useCentralStore } from "@/store";
import CeremonyRequest from "@/data/models/ceremony/request/ceremony_request";
import { useCeremony } from "@/hooks/ceremony/use_ceremony";
import { urlToFile } from "@/utils";
import CeremonyModalContent from "./CeremonyModalContent";
import CeremonyDocumentationRequest from "@/data/models/ceremony/request/ceremony_documentation_request";
import { CeremonyPackagesRequest } from "@/data/models/ceremony/request/ceremony_package_request";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import CeremonyCategory from "@/data/models/ceremony/response/ceremony_category";
import CeremonyDocumentation from "@/data/models/ceremony/response/ceremony_documentation";

interface DetailCeremonyModalProps {
  id: number | string;
  data: CeremonyRequest;
  category: CeremonyCategory;
  documentation: CeremonyDocumentation;
}

const DetailCeremonyModal = ({
  data,
  id,
  category,
  documentation,
}: DetailCeremonyModalProps) => {
  const [open, setOpen] = useState(false);
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
    useState<DropdownFilterItemProps>({
      id: category.id,
      title: category.name,
    });

  const [ceremonyRequest, setCeremonyRequest] = useState<CeremonyRequest>({
    title: data.title,
    ceremonyCategoryId: data.ceremonyCategoryId,
    description: data.description,
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

  const getFile = async () => {
    const file = await urlToFile({
      fileName: "avatar.png",
      url: documentation.photo as string,
    });

    setCeremonyDocumentationRequest({
      ...ceremonyDocumentationRequest,
      ceremonyServiceId: ceremony?.id as number,
      photo: file,
      photoUrl: documentation.photo,
    });
  };

  useEffect(() => {
    getFile();

    if (isAddCeremonySuccess) {
      setProgress(progress + 33.33);
      setCeremonyRequest({
        ceremonyCategoryId: ceremony?.ceremonyCategoryId ?? "",
        description: ceremony?.description ?? "",
        title: ceremony?.title ?? "",
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
    documentation,
  ]);

  return (
    <>
      <IconBackgroundButton
        icon={PencilSquareIcon}
        colorBackground="emerald"
        className="bg-emerald-100"
        colorIcon="green"
        onClick={() => {
          setOpen(true);
        }}
      />
      <Modal title="Tambah Upacara Agama" isOpen={open} setIsOpen={setOpen}>
        <CeremonyModalContent
          isDetail={true}
          loading={isLoading}
          progress={progress}
          setProgress={setProgress}
          // CATEGORY
          selectedCeremonyCategory={selectedCeremonyCategory}
          setSelectedCeremonyCategory={(value) => {
            setSelectedCeremonyCategory(value as DropdownFilterItemProps);
          }}
          // CEREMONY
          ceremony={ceremony}
          ceremonyRequest={ceremonyRequest}
          handleCeremonySubmit={handleAddCeremony}
          // DOCUMENTATION
          ceremonyDocumentationRequest={ceremonyDocumentationRequest}
          handleCeremonyDocumentationSubmit={handleAddCeremonyDocumentation}
          // PACKAGE
          ceremonyPackagesRequest={ceremonyPackages ?? { package: [] }}
          handleCeremonyPackagesSubmit={handleAddCeremonyPackeges}
        />
      </Modal>
    </>
  );
};

export default DetailCeremonyModal;
