import PhotoProfileInput from "@/components/input/PhotoProfileInput";
import PrimaryInput from "@/components/input/PrimaryInput";
import SwitchInput from "@/components/input/SwitchInput";
import PrimaryModal from "@/components/modal/PrimaryModal";
import React, { ReactElement } from "react";

interface ManagerModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  activeManager?: boolean;
  setActiveManager?: (value: boolean) => void;
  bottomAction: ReactElement;
}

const ManagerModal = ({
  open,
  setOpen,
  title,
  activeManager,
  setActiveManager,
  bottomAction,
}: ManagerModalProps) => {
  return (
    <PrimaryModal
      open={open}
      setOpen={setOpen}
      title={title}
      content={
        <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
          <PhotoProfileInput />
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
          {activeManager !== undefined && (
            <SwitchInput
              className="self-start pt-2"
              label={
                <span className="font-medium text-gray-500">
                  Aktif/Non-Aktif
                </span>
              }
              value={activeManager ?? false}
              onChange={(e) => {
                if (setActiveManager) {
                  setActiveManager(e);
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

export default ManagerModal;
