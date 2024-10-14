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

import IconButton from "@/components/button/IconButton";
import SecondaryThinButton from "@/components/button/SecondaryThinButton";
import PrimaryCurrencyInput from "@/components/input/PrimaryCurrencyInput";
import SecondaryWithIconButton from "@/components/button/SecondaryWithIconButton";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import { FieldArray, Form, Formik } from "formik";
import CeremonyRequest from "@/data/models/ceremony/request/ceremony_request";
import ceremonyValidation from "../validation/ceremony_validation";
import { useCeremonyCategory } from "@/hooks/ceremony/use_ceremony_category";
import PrimaryTextEditor from "@/components/input/PrimaryTextEditor";
import CeremonyDocumentationRequest from "@/data/models/ceremony/request/ceremony_documentation_request";
import ceremonyDocumentationValidation from "../validation/ceremony_documentation_validation";
import {
  CeremonyPackageRequest,
  CeremonyPackagesRequest,
} from "@/data/models/ceremony/request/ceremony_package_request";
import { Ceremony } from "@/data/models/ceremony/response/ceremony";
import ceremonyPackagesValidation from "../validation/ceremony_package_validation";

interface AddCeremonyModalProps {
  // PROGRESS
  progress: number;
  setProgress: (value: number) => void;
  loading: boolean;

  // CEREMONY
  ceremony: Ceremony | undefined;
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
  ceremonyPackagesRequest: CeremonyPackagesRequest;
  setCeremonyPackagesRequest: (value: CeremonyPackagesRequest) => void;
  setSelectedCeremonyPackageRequest: (
    value: CeremonyPackageRequest | undefined
  ) => void;
  handleCeremonyPackagesSubmit: (
    ceremonyPackagesRequest: CeremonyPackagesRequest
  ) => void;
}

const AddCeremonyModalContent = ({
  // PROGRESS
  progress,
  setProgress,

  // CEREMONY
  ceremony,
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
  ceremonyPackagesRequest,
  setSelectedCeremonyPackageRequest,
  setCeremonyPackagesRequest,
  handleCeremonyPackagesSubmit,
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
              Paket (Opsional)
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
              <Form
                onSubmit={() => {
                  handleCeremonySubmit(values);
                }}
              >
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
            initialValues={ceremonyDocumentationRequest}
            onSubmit={handleCeremonyDocumentationSubmit}
            validationSchema={ceremonyDocumentationValidation}
            suppressHydrationWarning={true}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <Form
                onSubmit={() => {
                  handleCeremonyDocumentationSubmit(values);
                }}
              >
                <BigFileInput
                  onChange={(e) => {
                    setFieldValue("photo", e);
                  }}
                />
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

        {progress > 90 ? (
          <Formik
            initialValues={ceremonyPackagesRequest}
            validationSchema={ceremonyPackagesValidation}
            onSubmit={handleCeremonyPackagesSubmit}
          >
            {({ values, errors, handleSubmit, handleChange }) => (
              <Form
                onSubmit={() => {
                  handleSubmit();
                }}
              >
                <FieldArray name="package">
                  {({ remove, push }) => (
                    <div className="flex flex-col">
                      {values.package.map((ceremonyPackage, index) => (
                        <div key={ceremonyPackage.id} className="mb-6">
                          <div className="flex justify-between">
                            <p className="capitalize font-bold mb-4">
                              Paket {index + 1}
                            </p>
                            {values.package.length > 1 && (
                              <IconButton
                                icon={TrashIcon}
                                onClick={() => remove(index)}
                                color="red"
                              />
                            )}
                          </div>

                          <div className="flex flex-col space-y-4">
                            <PrimaryInput
                              label="Nama Paket"
                              value={values.package[index].name}
                              error={(errors?.package?.[index] as any)?.name}
                              onChange={handleChange(`package.${index}.name`)}
                              placeholder="Masukkan nama paket"
                            />

                            <PrimaryCurrencyInput
                              label="Harga Paket"
                              value={values.package[index].price}
                              error={(errors?.package?.[index] as any)?.price}
                              setValue={handleChange(`package.${index}.price`)}
                              placeholder="Masukkan harga paket"
                            />

                            <PrimaryTextEditor
                              label="Deskripsi Paket"
                              value={values.package[index].description}
                              error={
                                (errors?.package?.[index] as any)?.description
                              }
                              onChange={handleChange(
                                `package.${index}.description`
                              )}
                            />
                          </div>

                          {/* Add button to add more packages */}
                          {index === values.package.length - 1 && (
                            <SecondaryThinButton
                              className="mt-2"
                              onClick={() =>
                                push({
                                  id: `${new Date()}`,
                                  name: "",
                                  description: "",
                                  price: 0,
                                  ceremonyServiceId: ceremony?.id ?? "",
                                })
                              }
                              label="Klik disini untuk tambah jenis paket"
                              icon={PlusIcon}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>

                {/* Buttons */}
                <div className="flex flex-row space-x-4 mt-6">
                  <PrimaryWithIconButton
                    label="Selanjutnya"
                    className={progress > 50 ? "w-full" : ""}
                    loading={loading}
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
      </div>
    </div>
  );
};

export default AddCeremonyModalContent;
