import React, { useState } from "react";
import ImageCropper from "./ImageCropper";

interface PhotoProfileInputProps {
  onclose?: () => void;
  src?: string;
  onChange?: (file: File) => void;
}

const PhotoProfileInput = ({
  onclose,
  onChange,
  src,
}: PhotoProfileInputProps) => {
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

    if (file.size / (1024 * 1024) > 2) {
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
      <div className="flex flex-col items-center">
        <ImageCropper
          src={imgSrc}
          maxWidth={300}
          maxHeight={300}
          onCrop={handleCrop}
          onclose={onclose}
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
    );
  } else if (src) {
    content = (
      <div className="flex flex-col items-center">
        <img
          src={src}
          alt="Image"
          className="w-28 h-28 rounded-full object-cover"
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
    );
  } else {
    content = (
      <div className="rounded-full border border-gray-300 bg-gray-50 p-4 w-28 h-28">
        <label
          htmlFor="upload"
          className="flex flex-col items-center justify-center h-full gap-2 cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 fill-white stroke-primary1"
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
            Upload photo
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
    );
  }

  return <>{content}</>;
};

export default PhotoProfileInput;
