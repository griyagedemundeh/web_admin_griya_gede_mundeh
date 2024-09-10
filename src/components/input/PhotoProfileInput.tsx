import React from "react";

const PhotoProfileInput = () => {
  return (
    <div className="rounded-full border border-gray-300 bg-gray-50 p-4 w-28 h-28">
      <label
        htmlFor="upload"
        className="flex flex-col items-center justify-center h-full gap-2 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 fill-white stroke-primary1"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span className="text-gray-600 font-medium text-xs text-center">
          Upload photo
        </span>
      </label>
      <input id="upload" type="file" alt="image" className="hidden" />
    </div>
  );
};

export default PhotoProfileInput;
