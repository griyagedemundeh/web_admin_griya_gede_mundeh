import React, { MouseEventHandler } from "react";

interface PrimaryButtonProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const PrimaryButton = ({ label, onClick }: PrimaryButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md w-full bg-primary1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary1"
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
