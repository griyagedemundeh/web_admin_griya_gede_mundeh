import React, { useCallback } from "react";

import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import History from "@tiptap/extension-history";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";

const ToolbarButton = ({
  icon,
  onClick,
  className,
  disabled,
}: {
  icon: any;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}) => (
  <div
    onClick={onClick}
    className={
      className +
      " p-2 rounded hover:bg-gray-200 focus:outline-none focus:bg-gray-200 hover:cursor-pointer"
    }
  >
    {icon}
  </div>
);

interface PrimaryTextEditorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const PrimaryTextEditor = ({
  label,
  onChange,
  value,
  error,
}: PrimaryTextEditorProps) => {
  const editor = useEditor({
    editable: true,
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Underline,
      Italic,
      History,
      BulletList,
      OrderedList,
      ListItem,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const updatedContent = editor.getHTML();
      onChange(updatedContent);
    },
  });

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  return (
    <div className="col-span-full">
      {label && (
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium leading-6 text-gray-900 mb-2"
        >
          {label}
        </label>
      )}
      <div className="scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-200 scrollbar-track-white">
        <div className="w-full mt-4 p-4 bg-white border border-gray-300 rounded-lg">
          {/* Toolbar */}
          <div className="flex space-x-2 border-b border-gray-300 pb-2 mb-2">
            <ToolbarButton
              icon={<b>B</b>}
              onClick={() => {
                editor?.chain().focus().toggleBold().run();
              }}
              className={editor?.isActive("bold") ? "bg-gray-200" : ""}
            />
            <ToolbarButton
              icon={<i>I</i>}
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={editor?.isActive("italic") ? "bg-gray-200" : ""}
            />
            <ToolbarButton
              icon={<u>U</u>}
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              className={editor?.isActive("underline") ? "bg-gray-200" : ""}
            />
            <ToolbarButton
              icon="🔗"
              onClick={setLink}
              className={editor?.isActive("link") ? "bg-gray-200" : ""}
            />
            <ToolbarButton
              icon="⭕"
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              className={editor?.isActive("bulletList") ? "bg-gray-200" : ""}
            />
            <ToolbarButton
              icon="🔢"
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              className={editor?.isActive("orderedList") ? "bg-gray-200" : ""}
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
      {error && <p className="text-red text-xs mt-2">{error}</p>}
    </div>
  );
};

export default PrimaryTextEditor;
