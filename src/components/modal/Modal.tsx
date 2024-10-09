import { ReactNode } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import IconButton from "../button/IconButton";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Divider from "../mini/Divider";

interface Modal {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  setIsOpen: (value: boolean) => void;
}

const Modal = ({ children, isOpen, setIsOpen, title }: Modal) => {
  return (
    <Dialog open={isOpen} onClose={setIsOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform rounded-xl bg-white pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 overflow-visible"
          >
            <div className="flex flex-row justify-between items-center px-6">
              <p className="font-bold">{title}</p>

              <IconButton
                icon={XMarkIcon}
                onClick={() => {
                  setIsOpen(false);
                }}
                classNameIcon="h-7 w-7"
              />
            </div>
            <Divider className="my-4" />
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
