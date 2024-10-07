import React, { useState } from "react";
import ImageCropper from "./ImageCropper";

interface PhotoProfileInputProps {
  onclose: () => void;
  isNull: boolean;
  onChange?: (file: File) => void;
}

const PhotoProfileInput = ({
  isNull,
  onclose,
  onChange,
}: PhotoProfileInputProps) => {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [error, setError] = useState(false);

  //   const UploadI = new UpdateImage();

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    setError(false);
    e.preventDefault();

    if (imgSrc) setImgSrc("");
    const file = e.dataTransfer.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      //check img
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e: any) => {
        if (error) setError(true);

        setImgSrc(imageUrl);
      });
    });
    reader.readAsDataURL(file);
  };

  const onSelectFile = (e: any) => {
    setError(false);

    if (imgSrc) setImgSrc("");
    const file = e.target.files?.[0];

    if (!file) return;

    // Check if file is selected
    if (file) {
      // Check file size
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeInMB > 2) {
        setError(true);
        return;
      }
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      //check img
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e: any) => {
        if (error) setError(true);

        // console.log(e.currentTarget);
        setImgSrc(imageUrl);
      });
    });
    reader.readAsDataURL(file);
  };

  const handleCrop = async (blob: any) => {
    const file = new File([blob], "avatar.png", {
      lastModified: new Date().getTime(),
      type: blob.type,
    });

    if (onChange) {
      onChange(file);
    }
  };

  return (
    <>
      {imgSrc ? (
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
                className={`font-medium text-xs text-center error ${
                  error ? "text-rose-500" : "text-gray-500"
                }`}
              >
                Pilih ulang
              </span>
            </label>
            <input
              id="upload"
              type="file"
              alt="image"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={onSelectFile}
            />
          </div>
        </div>
      ) : (
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
              className={`font-medium text-xs text-center error ${
                error ? "text-rose-500" : "text-gray-500"
              }`}
            >
              Upload photo
            </span>
          </label>
          <input
            id="upload"
            type="file"
            alt="image"
            className="hidden"
            accept="image/png, image/jpeg"
            onChange={onSelectFile}
          />
        </div>
      )}
    </>
  );
};

export default PhotoProfileInput;
