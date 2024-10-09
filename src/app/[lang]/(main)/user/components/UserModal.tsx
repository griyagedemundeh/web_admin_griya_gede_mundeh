import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import PhotoProfileInput from "@/components/input/PhotoProfileInput";
import PrimaryInput from "@/components/input/PrimaryInput";
import SwitchInput from "@/components/input/SwitchInput";
import PrimaryModal from "@/components/modal/PrimaryModal";
import { MapPinIcon } from "@heroicons/react/20/solid";
import React, { ReactElement } from "react";

interface UserModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  activeUser?: boolean;
  setActiveUser?: (value: boolean) => void;
  bottomAction: ReactElement;
  isForDetail?: boolean;
}

const UserModal = ({
  open,
  setOpen,
  title,
  activeUser,
  setActiveUser,
  bottomAction,
  isForDetail,
}: UserModalProps) => {
  return (
    <PrimaryModal
      open={open}
      setOpen={setOpen}
      title={title}
      content={
        <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
          {/* <PhotoProfileInput /> */}
          <PrimaryInput
            label="Nama Lengkap"
            onChange={(e) => {}}
            value={""}
            className="w-full"
          />
          <PrimaryInput
            label="Email"
            onChange={(e) => {}}
            value={""}
            className="w-full"
            type="email"
          />
          <PrimaryInput
            label="No.Handphone"
            onChange={(e) => {}}
            value={""}
            className="w-full"
          />

          {isForDetail && (
            <div className="flex flex-row space-x-2 items-end w-full">
              <PrimaryInput
                label="Alamat Utama"
                onChange={(e) => {}}
                value={""}
                className="w-full"
              />

              <IconBackgroundButton
                icon={MapPinIcon}
                onClick={() => {}}
                colorIcon="white"
                className="bg-gray-300 hover:bg-gray-200"
              />
            </div>
          )}

          <PrimaryInput
            label="Alamat Utama"
            onChange={(e) => {}}
            value={""}
            className="w-full"
          />
          <PrimaryInput
            label="Password"
            onChange={(e) => {}}
            value={""}
            type="password"
            className="w-full"
          />
          <PrimaryInput
            label="Konfirmasi Password"
            onChange={(e) => {}}
            value={""}
            type="password"
            className="w-full"
          />
          {activeUser !== undefined && (
            <SwitchInput
              className="self-start pt-2"
              label={
                <span className="font-medium text-gray-500">
                  Aktif/Non-Aktif
                </span>
              }
              value={activeUser ?? false}
              onChange={(e) => {
                if (setActiveUser) {
                  setActiveUser(e);
                }
              }}
            />
          )}
        </div>
      }
      bottomAction={bottomAction}
    />
  );
};

export default UserModal;
