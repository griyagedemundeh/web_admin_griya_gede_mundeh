import React, { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
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
import { CeremonyPackage } from "@/data/models/ceremony/response/ceremony_package";

interface DetailCeremonyModalProps {
  id: number | string;
  data: CeremonyRequest;
  category: CeremonyCategory;
  documentation: CeremonyDocumentation;
  packages: CeremonyPackage[];
}

const DetailCeremonyModal = ({
  data,
  id,
  category,
  documentation,
  packages,
}: DetailCeremonyModalProps) => {
  const [open, setOpen] = useState(false);
  const { setIsLoading, isLoading } = useCentralStore();
  const [progress, setProgress] = useState<number>(33.33);
  const {
    editCeremony,
    editCeremonyDocumentation,
    editCeremonyPackages,
    deleteCeremonyPackage,
    addCeremonyDocumentation,
  } = useCeremony({});

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
      ceremonyServiceId: id as number,
      photo: null,
    });

  const handleEditCeremony = (ceremonyRequest: CeremonyRequest) => {
    setIsLoading(true);
    editCeremony({ id: id, request: ceremonyRequest });
  };

  const handleEditCeremonyDocumentation = (
    ceremonyDocumentationRequest: CeremonyDocumentationRequest
  ) => {
    setIsLoading(true);

    if (documentation.id !== "") {
      editCeremonyDocumentation({
        id: documentation.id,
        request: ceremonyDocumentationRequest,
      });
      return;
    }

    addCeremonyDocumentation(ceremonyDocumentationRequest);
  };

  const handleEditCeremonyPackeges = (
    ceremonyPackagesRequest: CeremonyPackagesRequest
  ) => {
    setIsLoading(true);
    editCeremonyPackages(ceremonyPackagesRequest);
  };

  const [ceremonyPackages, setCeremonyPackages] =
    useState<CeremonyPackagesRequest>({ packages: [] });

  const getFile = async () => {
    const file = await urlToFile({
      fileName: "avatar.png",
      url: documentation.photo as string,
      mimeType: "image/png",
    });

    setCeremonyDocumentationRequest({
      ...ceremonyDocumentationRequest,
      ceremonyServiceId: id as number,
      photo: file,
      photoUrl: documentation.photo,
    });
  };

  useEffect(() => {
    getFile();

    setCeremonyPackages({
      packages: packages as any,
    });
  }, []);

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
      <Modal title="Detail Upacara Agama" isOpen={open} setIsOpen={setOpen}>
        <CeremonyModalContent
          isDetail={true}
          ceremonyId={id}
          loading={isLoading}
          progress={progress}
          setProgress={setProgress}
          // CATEGORY
          selectedCeremonyCategory={selectedCeremonyCategory}
          setSelectedCeremonyCategory={(value) => {
            setSelectedCeremonyCategory(value as DropdownFilterItemProps);
          }}
          // CEREMONY
          ceremonyRequest={ceremonyRequest}
          handleCeremonySubmit={handleEditCeremony}
          // DOCUMENTATION
          ceremonyDocumentationRequest={ceremonyDocumentationRequest}
          handleCeremonyDocumentationSubmit={handleEditCeremonyDocumentation}
          // PACKAGE
          ceremonyPackagesRequest={
            ceremonyPackages?.packages?.length > 0
              ? ceremonyPackages
              : {
                  packages: [
                    {
                      name: "",
                      price: 0,
                      description: "",
                      ceremonyServiceId: id as number,
                    },
                  ],
                }
          }
          handleCeremonyPackagesSubmit={handleEditCeremonyPackeges}
          deleteCeremonyPackage={async (id) => {
            deleteCeremonyPackage({ id: id });
          }}
        />
      </Modal>
    </>
  );
};

export default DetailCeremonyModal;
