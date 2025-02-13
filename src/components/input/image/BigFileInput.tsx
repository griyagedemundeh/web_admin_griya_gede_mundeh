import { PhotoIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import BigImageCropper from "./BigImageCropper";

interface BigFileInputProps {
  name?: string;
  label?: string;
  src?: string;
  onChange?: (file: File) => void;
}

const BigFileInput = ({ onChange, src, label, name }: BigFileInputProps) => {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [error, setError] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setError(false);
    if (imgSrc) setImgSrc("");
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result?.toString() || "";
      const imageElement = new Image();
      imageElement.src = imageUrl;

      imageElement.onload = () => setImgSrc(imageUrl);
      imageElement.onerror = () => setError(true);
    };
    reader.readAsDataURL(file);
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    if (imgSrc) setImgSrc("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size / (1024 * 1024) > 5) {
      setError(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result?.toString() || "";
      const imageElement = new Image();
      imageElement.src = imageUrl;

      imageElement.onload = () => setImgSrc(imageUrl);
      imageElement.onerror = () => setError(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCrop = (blob: Blob) => {
    const file = new File([blob], "avatar.png", {
      type: blob.type,
      lastModified: Date.now(),
    });

    if (onChange) onChange(file);
  };

  let content;

  if (imgSrc) {
    content = (
      <div className="flex flex-col">
        {label ? (
          <label
            htmlFor="upload"
            className="block text-sm font-medium leading-6 text-gray-900 mb-2"
          >
            {label}
          </label>
        ) : null}
        <div className="flex flex-col items-center w-full">
          <BigImageCropper
            src={imgSrc}
            maxWidth={400}
            maxHeight={400}
            onCrop={handleCrop}
          />
          <div className="rounded-lg border border-gray-300 bg-gray-50 p-4 h-10 mt-2 w-full">
            <label
              htmlFor="upload"
              className="flex flex-row items-center justify-center h-full gap-2 cursor-pointer w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 fill-white stroke-primary1"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span
                className={`font-medium text-xs text-center ${
                  error ? "text-rose-500" : "text-gray-500"
                }`}
              >
                Pilih ulang
              </span>
            </label>
            <input
              id="upload"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={onSelectFile}
            />
          </div>
        </div>
      </div>
    );
  } else if (src) {
    content = (
      <div className="flex flex-col">
        {label ? (
          <label
            htmlFor="upload"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {label}
          </label>
        ) : null}
        <div className="flex flex-col items-center w-full">
          <img
            src={src}
            alt="Image"
            className="rounded-lg object-cover w-full"
          />
          <div className="rounded-lg border border-gray-300 bg-gray-50 p-4 h-10 mt-2">
            <label
              htmlFor="upload"
              className="flex flex-row items-center justify-center h-full gap-2 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 fill-white stroke-primary1"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span
                className={`font-medium text-xs text-center ${
                  error ? "text-rose-500" : "text-gray-500"
                }`}
              >
                Pilih ulang
              </span>
            </label>
            <input
              id="upload"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={onSelectFile}
            />
          </div>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="col-span-full w-full">
        {label ? (
          <label
            htmlFor="upload"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {label}
          </label>
        ) : null}
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-gray-50 w-full">
          <div className="text-center">
            <PhotoIcon
              aria-hidden="true"
              className="mx-auto h-12 w-12 text-gray-300"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="upload"
                className="relative cursor-pointer rounded-md bg-gray-50 font-semibold text-primary1 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary1 focus-within:ring-offset-2 hover:text-primary2"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <p>Unggah Gambar</p>
                <input
                  id="upload"
                  type="file"
                  className="sr-only"
                  accept="image/png, image/jpeg"
                  onChange={onSelectFile}
                />
              </label>
              <p className="pl-1">atau seret dan lepas</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF sampai dengan 5MB
            </p>
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default BigFileInput;
