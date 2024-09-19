import { PhotoIcon } from "@heroicons/react/20/solid";
import React, { ChangeEventHandler } from "react";

interface BigFileInputProps {
  label?: string;
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const BigFileInput = ({ onChange, value, label }: BigFileInputProps) => {
  return (
    <div className="col-span-full">
      {label ? (
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      ) : null}
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-gray-50">
        <div className="text-center">
          <PhotoIcon
            aria-hidden="true"
            className="mx-auto h-12 w-12 text-gray-300"
          />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-gray-50 font-semibold text-primary1 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary1 focus-within:ring-offset-2 hover:text-primary2"
            >
              <span>Unggah Gambar</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                value={value}
                onChange={onChange}
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
};

export default BigFileInput;
