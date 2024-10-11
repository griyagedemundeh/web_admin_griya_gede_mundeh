"use client";

import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import DropdownInput from "@/components/dropdown/DropdownInput";
import BigFileInput from "@/components/input/BigFileInput";
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

interface AddCeremonyModalProps {
  progress: number;
  setProgress: (value: number) => void;
  ceremonyRequest: CeremonyRequest;
  handleCeremonySubmit: (ceremonyRequest: CeremonyRequest) => void;
  ceremonyCategories: DropdownFilterItemProps[];
  selectedCeremonyCategory: DropdownFilterItemProps | undefined;
  setSelectedCeremonyCategory: (
    value: DropdownFilterItemProps | undefined
  ) => void;
  ceremonyPackages: CeremonyPackage[];
  setCeremonyPackages: (value: CeremonyPackage[]) => void;
  setSelectedCeremonyPackage: (value: CeremonyPackage | undefined) => void;
}

const AddCeremonyModalContent = ({
  progress,
  setProgress,
  ceremonyRequest,
  handleCeremonySubmit,
  ceremonyCategories,
  selectedCeremonyCategory,
  setSelectedCeremonyCategory,
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
        {progress < 50 ? (
          <Formik
            initialValues={ceremonyRequest}
            onSubmit={handleCeremonySubmit}
            validationSchema={ceremonyValidation}
            suppressHydrationWarning={true}
          >
            {({ errors, handleChange, handleSubmit, values }) => (
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
                    setSelectedItem={setSelectedCeremonyCategory}
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
                    className={progress > 50 ? "w-full" : ""}
                    onClick={() => {
                      setProgress(progress + 33.33);
                    }}
                    icon={ChevronDoubleRightIcon}
                  />
                </div>
              </Form>
            )}
          </Formik>
        ) : null}
        {progress > 50 && progress < 90 ? (
          <div>
            <BigFileInput onChange={(e) => {}} value={""} />
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

        {progress > 90 ? (
          <div className="flex flex-col">
            {ceremonyPackages.map((ceremonyPackage, index) => (
              <div key={ceremonyPackage.id}>
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

                  <PrimaryTextEditor />

                  {/* <div className="col-span-full">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                    >
                      Deskripsi Paket
                    </label>
                    <div className="scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-200 scrollbar-track-white">
                      <div className="w-full mt-4 p-4 bg-white border border-gray-300 rounded-lg">
                        
                        <div className="flex space-x-2 border-b border-gray-300 pb-2 mb-2">
                          <ToolbarButton
                            icon={<b>B</b>}
                            onClick={() => {
                              editor?.chain().focus().toggleBold().run();
                            }}
                            className={
                              editor?.isActive("bold") ? "bg-gray-200" : ""
                            }
                          />
                          <ToolbarButton
                            icon={<i>I</i>}
                            onClick={() =>
                              editor?.chain().focus().toggleItalic().run()
                            }
                            className={
                              editor?.isActive("italic") ? "bg-gray-200" : ""
                            }
                          />
                          <ToolbarButton
                            icon={<u>U</u>}
                            onClick={() =>
                              editor?.chain().focus().toggleUnderline().run()
                            }
                            className={
                              editor?.isActive("underline") ? "bg-gray-200" : ""
                            }
                          />
                          <ToolbarButton
                            icon="🔗"
                            onClick={setLink}
                            className={
                              editor?.isActive("link") ? "bg-gray-200" : ""
                            }
                          />
                          <ToolbarButton
                            icon="⭕"
                            onClick={() =>
                              editor?.chain().focus().toggleBulletList().run()
                            }
                            className={
                              editor?.isActive("bulletList")
                                ? "bg-gray-200"
                                : ""
                            }
                          />
                          <ToolbarButton
                            icon="🔢"
                            onClick={() =>
                              editor?.chain().focus().toggleOrderedList().run()
                            }
                            className={
                              editor?.isActive("orderedList")
                                ? "bg-gray-200"
                                : ""
                            }
                          />
                          <ToolbarButton
                            icon="↶"
                            onClick={() => editor?.chain().focus().undo().run()}
                            disabled={!editor?.can().undo()}
                          />
                          <ToolbarButton
                            icon="↷"
                            onClick={() => editor?.chain().focus().redo().run()}
                            disabled={!editor?.can().redo()}
                          />
                        </div>

                       
                        <EditorContent
                          editor={editor}
                          className="p-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary1 overflow-hidden"
                        />
                      </div>
                    </div>
                  </div> */}
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
