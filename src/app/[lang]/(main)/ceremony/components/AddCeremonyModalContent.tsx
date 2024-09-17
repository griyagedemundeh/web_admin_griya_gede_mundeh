"use client";

import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import Undo from "@ckeditor/ckeditor5-undo/src/undo";

import { PlusIcon } from "@heroicons/react/20/solid";
import DropdownInput from "@/components/dropdown/DropdownInput";
import BigFileInput from "@/components/input/BigFileInput";
import PrimaryInput from "@/components/input/PrimaryInput";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";
import CurrencyInput from "react-currency-input-field";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import CeremonyPackage from "@/data/models/ceremonyPackage";
import IconButton from "@/components/button/IconButton";
import SecondaryThinButton from "@/components/button/SecondaryThinButton";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import {
  EditorContent,
  EditorProvider,
  useCurrentEditor,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface AddCeremonyModalProps {
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

const ToolbarButton = ({
  icon,
  onClick,
  className,
}: {
  icon: any;
  onClick: () => void;
  className: string;
}) => (
  <button
    onClick={onClick}
    className={className + " p-2 rounded hover:bg-gray-100 focus:outline-none"}
  >
    {icon}
  </button>
);

const AddCeremonyModalContent = ({
  progress,
  setProgress,
  ceremonyCategories,
  selectedCeremonyCategory,
  setSelectedCeremonyCategory,
  ceremonyPackages,
  setSelectedCeremonyPackage,
  setCeremonyPackages,
}: AddCeremonyModalProps) => {
  const { editor } = useCurrentEditor();
  // const editor = useEditor();

  // if (!editor) {
  //   return null;
  // }

  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
  ];

  const content = `
  <h2>
    Hi there,
  </h2>
  <p>
    this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
  </p>
  <ul>
    <li>
      That’s a bullet list with one …
    </li>
    <li>
      … or two list items.
    </li>
  </ul>
  <p>
    Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
  </p>
  <pre><code class="language-css">body {
    display: none;
  }</code></pre>
  <p>
    I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
  </p>
  <blockquote>
    Wow, that’s amazing. Good work, boy! 👏
    <br />
    — Mom
  </blockquote>
  `;

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
          <div className="flex flex-col space-y-4">
            <PrimaryInput
              name="Nama Upacara"
              value={""}
              onChange={(e) => {}}
              placeholder="Masukkan nama upacara"
            />

            <DropdownInput
              items={ceremonyCategories}
              label="Kategori Upacara"
              placeholder="Pilih Kategori Upacara"
              selectedItem={selectedCeremonyCategory}
              setSelectedItem={setSelectedCeremonyCategory}
            />

            <PrimaryTextArea
              value={""}
              onChange={(e) => {}}
              name="Deskripsi Upacara"
              placeholder="Masukkan deskripsi singkat upacaramu disini"
            />
          </div>
        ) : null}
        {progress > 50 && progress < 90 ? (
          <BigFileInput onChange={(e) => {}} value={""} />
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
                    name="Nama Paket"
                    value={ceremonyPackage.title}
                    onChange={(e) => {}}
                    placeholder="Masukkan nama paket"
                  />

                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Harga Paket
                    </label>
                    <CurrencyInput
                      id="input-example"
                      name="input-name"
                      placeholder="Masukkan harga paket"
                      defaultValue={parseInt(ceremonyPackage.price, 10)}
                      prefix="Rp"
                      className="block w-full mt-2 rounded-md border-0 py-1.5 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary1 sm:text-sm sm:leading-6 placeholder:text-xs bg-gray-50"
                      decimalsLimit={2}
                      onValueChange={(value, name, values) =>
                        console.log(value, name, values)
                      }
                    />
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-gray-900 mb-2"
                    >
                      Deskripsi Paket
                    </label>
                    <div className="scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-200 scrollbar-track-white">
                      <div className="w-full mt-4 p-4 bg-white border border-gray-300 rounded-lg">
                        {/* Toolbar */}
                        {/* <div className="flex space-x-2 border-b border-gray-300 pb-2 mb-2">
                          <ToolbarButton icon={<b>B</b>} onClick={() => {}} />
                          <ToolbarButton icon={<i>I</i>} onClick={() => {}} />
                          <ToolbarButton icon={<u>U</u>} onClick={() => {}} />
                          <ToolbarButton icon="🔗" onClick={() => {}} />
                          <ToolbarButton icon="•" onClick={() => {}} />
                          <ToolbarButton icon="↶" onClick={() => {}} />
                          <ToolbarButton icon="↷" onClick={() => {}} />
                        </div> */}

                        {/* Editable content area */}
                        {/* <div
                          contentEditable
                          className="h-48 p-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary1"
                          dangerouslySetInnerHTML={{ __html: "" }}
                          onInput={(e) => {}}
                        ></div> */}
                        {/* <EditorContent editor={editor}  /> */}
                        <EditorProvider
                          slotBefore={
                            !editor ? null : (
                              <div className="flex space-x-2 border-b border-gray-300 pb-2 mb-2">
                                <ToolbarButton
                                  icon={<b>B</b>}
                                  onClick={() =>
                                    editor.chain().focus().toggleBold().run()
                                  }
                                  disabled={
                                    !editor
                                      .can()
                                      .chain()
                                      .focus()
                                      .toggleBold()
                                      .run()
                                  }
                                  className={
                                    editor.isActive("bold") ? "bg-gray-100" : ""
                                  }
                                />
                                <ToolbarButton
                                  icon={<i>I</i>}
                                  onClick={() =>
                                    editor.chain().focus().toggleItalic().run()
                                  }
                                  disabled={
                                    !editor
                                      .can()
                                      .chain()
                                      .focus()
                                      .toggleItalic()
                                      .run()
                                  }
                                  className={
                                    editor.isActive("italic")
                                      ? "bg-gray-100"
                                      : ""
                                  }
                                />
                                <ToolbarButton
                                  icon={<u>U</u>}
                                  onClick={() =>
                                    editor.chain().focus().toggleStrike().run()
                                  }
                                  disabled={
                                    !editor
                                      .can()
                                      .chain()
                                      .focus()
                                      .toggleStrike()
                                      .run()
                                  }
                                  className={
                                    editor.isActive("strike")
                                      ? "bg-gray-100"
                                      : ""
                                  }
                                />
                                <ToolbarButton
                                  icon="🔗"
                                  onClick={() => {}}
                                  className={
                                    editor.isActive("bold") ? "bg-gray-100" : ""
                                  }
                                />
                                <ToolbarButton
                                  icon="•"
                                  onClick={() =>
                                    editor
                                      .chain()
                                      .focus()
                                      .toggleBulletList()
                                      .run()
                                  }
                                  className={
                                    editor.isActive("bulletList")
                                      ? "bg-gray-100"
                                      : ""
                                  }
                                />
                                <ToolbarButton
                                  icon="123"
                                  onClick={() =>
                                    editor
                                      .chain()
                                      .focus()
                                      .toggleOrderedList()
                                      .run()
                                  }
                                  className={
                                    editor.isActive("orderedList")
                                      ? "bg-gray-100"
                                      : ""
                                  }
                                />
                                <ToolbarButton
                                  icon="↶"
                                  onClick={() =>
                                    editor.chain().focus().undo().run()
                                  }
                                  disabled={
                                    !editor.can().chain().focus().undo().run()
                                  }
                                />
                                <ToolbarButton
                                  icon="↷"
                                  onClick={() =>
                                    editor.chain().focus().redo().run()
                                  }
                                  disabled={
                                    !editor.can().chain().focus().redo().run()
                                  }
                                />
                              </div>
                            )
                          }
                          extensions={extensions}
                          content={content}
                        ></EditorProvider>
                      </div>
                    </div>
                  </div>
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
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AddCeremonyModalContent;
