"use client";

import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import DropdownInput from "@/components/dropdown/DropdownInput";
import BigFileInput from "@/components/input/image/BigFileInput";
import PrimaryInput from "@/components/input/PrimaryInput";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import CeremonyPackage from "@/data/models/ceremonyPackage";
import IconButton from "@/components/button/IconButton";
import SecondaryThinButton from "@/components/button/SecondaryThinButton";
import PrimaryCurrencyInput from "@/components/input/PrimaryCurrencyInput";
import SecondaryWithIconButton from "@/components/button/SecondaryWithIconButton";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import { Form, Formik } from "formik";
import CeremonyRequest from "@/data/models/ceremony/request/ceremony_request";
import ceremonyValidation from "../validation/ceremony_validation";
import { useCeremonyCategory } from "@/hooks/ceremony/use_ceremony_category";
import PrimaryTextEditor from "@/components/input/PrimaryTextEditor";
import CeremonyDocumentationRequest from "@/data/models/ceremony/request/ceremony_documentation_request";

interface AddCeremonyModalProps {
  // PROGRESS
  progress: number;
  setProgress: (value: number) => void;
  loading: boolean;

  // CEREMONY
  ceremonyRequest: CeremonyRequest;
  handleCeremonySubmit: (ceremonyRequest: CeremonyRequest) => void;

  // DOCUMENTATION
  ceremonyDocumentationRequest: CeremonyDocumentationRequest;
  handleCeremonyDocumentationSubmit: (
    ceremonyDocumentationRequest: CeremonyDocumentationRequest
  ) => void;

  // CATEGORY
  selectedCeremonyCategory: DropdownFilterItemProps | undefined;
  setSelectedCeremonyCategory: (
    value: DropdownFilterItemProps | undefined
  ) => void;

  // PACKAGE
  ceremonyPackages: CeremonyPackage[];
  setCeremonyPackages: (value: CeremonyPackage[]) => void;
  setSelectedCeremonyPackage: (value: CeremonyPackage | undefined) => void;
}

const AddCeremonyModalContent = ({
  // PROGRESS
  progress,
  setProgress,

  // CEREMONY
  ceremonyRequest,
  handleCeremonySubmit,
  loading,

  // DOCUMENTATION
  ceremonyDocumentationRequest,
  handleCeremonyDocumentationSubmit,

  // CATEGORY
  selectedCeremonyCategory,
  setSelectedCeremonyCategory,

  // PACKAGE
  ceremonyPackages,
  setSelectedCeremonyPackage,
  setCeremonyPackages,
}: AddCeremonyModalProps) => {
  const { allCeremonyCategory } = useCeremonyCategory();

  const [categories, setCategories] = useState<DropdownFilterItemProps[]>([]);

  useEffect(() => {
    if (allCeremonyCategory?.data) {
      setCategories((prevCategories) =>
        prevCategories.concat(
          allCeremonyCategory.data.map((category) => ({
            id: category.id,
            title: category.name,
          }))
        )
      );
    }
  }, [allCeremonyCategory?.data]);

  return (
    <div>
      <div className="px-6">
        <div aria-hidden="true" className="mt-6">
          <div className="mb-4 hidden grid-cols-3 text-sm font-medium text-gray-600 sm:grid">
            <div className="text-primary1 text-xs"> Data Utama </div>
            <div
              className={
                progress > 50 && progress < 100
                  ? "text-primary1 text-center text-xs"
                  : "text-center text-xs"
              }
            >
              Gambar Sampul
            </div>
            <div
              className={
                progress > 90
                  ? "text-primary1 text-center text-xs"
                  : "text-center text-xs"
              }
            >
              Paket
            </div>
          </div>
          <div className="overflow-hidden rounded-full bg-gray-200">
            <div
              style={{ width: `${progress}%` }}
              className="h-2 rounded-full bg-primary1 transition duration-200 ease-linear transform"
            />
          </div>
        </div>
      </div>

      <div className="px-6 my-6 ">
        {/* CEREMONY */}
        {progress < 50 ? (
          <Formik
            initialValues={ceremonyRequest}
            onSubmit={handleCeremonySubmit}
            validationSchema={ceremonyValidation}
            suppressHydrationWarning={true}
          >
            {({ errors, handleChange, values, setValues, handleSubmit }) => (
              <Form>
                <div className="flex flex-col space-y-4">
                  <PrimaryInput
                    label="Nama Upacara"
                    value={values.title}
                    error={errors.title ?? undefined}
                    onChange={handleChange("title")}
                    placeholder="Masukkan nama upacara"
                  />

                  <DropdownInput
                    items={categories ?? []}
                    label="Kategori Upacara"
                    placeholder="Pilih Kategori Upacara"
                    selectedItem={selectedCeremonyCategory}
                    setSelectedItem={(e) => {
                      setSelectedCeremonyCategory(e);
                      setValues({
                        ...values,
                        ceremonyCategoryId: e?.id as string,
                      });
                    }}
                  />

                  <PrimaryTextArea
                    value={values.description}
                    error={errors.description ?? undefined}
                    onChange={handleChange("description")}
                    label="Deskripsi Upacara"
                    placeholder="Masukkan deskripsi singkat upacaramu disini"
                  />
                </div>
                <div className="flex flex-row justify-end mt-6 space-x-4">
                  <PrimaryWithIconButton
                    label="Selanjutnya"
                    loading={loading}
                    className={progress > 50 ? "w-full" : ""}
                    onClick={() => {
                      handleSubmit();
                    }}
                    icon={ChevronDoubleRightIcon}
                  />
                </div>
              </Form>
            )}
          </Formik>
        ) : null}

        {/* DOCUMENTATION */}
        {progress > 50 && progress < 90 ? (
          <Formik
            initialValues={ceremonyRequest}
            onSubmit={handleCeremonySubmit}
            validationSchema={ceremonyValidation}
            suppressHydrationWarning={true}
          >
            <Form>
              <BigFileInput onChange={(e) => {}} src="" />
              <div className="flex flex-row space-x-4 mt-6">
                {progress > 50 && !ceremonyRequest.title ? (
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
              </div>
            </Form>
          </Formik>
        ) : null}

        {progress > 90 ? (
          <div className="flex flex-col">
            {ceremonyPackages.map((ceremonyPackage, index) => (
              <div key={ceremonyPackage.id} className="mb-6">
                <div className="flex flex-row justify-between">
                  <p className="capitalize font-bold mb-4">Paket {index + 1}</p>

                  {ceremonyPackages.length > 1 ? (
                    <IconButton
                      icon={TrashIcon}
                      onClick={() => {
                        setSelectedCeremonyPackage(ceremonyPackage);
                      }}
                      color="red"
                    />
                  ) : null}
                </div>
                <div className="flex flex-col space-y-4">
                  <PrimaryInput
                    label="Nama Paket"
                    value={ceremonyPackage.title}
                    onChange={(e) => {}}
                    placeholder="Masukkan nama paket"
                  />

                  <PrimaryCurrencyInput
                    label="Harga Paket"
                    setValue={(e) => {}}
                    value=""
                    placeholder="Masukkan harga paket"
                  />

                  <PrimaryTextEditor
                    label="Deskripsi Paket"
                    onChange={(e) => {}}
                    value={ceremonyPackage.description}
                  />

                  {ceremonyPackages[ceremonyPackages.length - 1] ===
                  ceremonyPackage ? (
                    <SecondaryThinButton
                      onClick={() => {
                        setCeremonyPackages(
                          ceremonyPackages.concat([
                            {
                              id: `${new Date()}`,
                              title: "",
                              description: "",
                              price: "0",
                            },
                          ])
                        );
                      }}
                      label="Klik disini untuk tambah jenis paket"
                      icon={PlusIcon}
                    />
                  ) : null}
                </div>
              </div>
            ))}
            <div className="flex flex-row space-x-4 mt-6">
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
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AddCeremonyModalContent;
