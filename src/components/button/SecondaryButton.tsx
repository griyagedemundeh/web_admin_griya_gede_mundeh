import React, { MouseEventHandler } from "react";

interface SecondaryButtonProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  unSubmit?: boolean;
}

const SecondaryButton = ({
  label,
  onClick,
  className,
  unSubmit,
}: SecondaryButtonProps) => {
  if (unSubmit) {
    return (
      <div
        onClick={(e: any) => {
          onClick(e);
        }}
        className={
          className +
          " rounded-md w-full bg-gray-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 hover:cursor-pointer"
        }
      >
        <p className="text-center">{label}</p>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={
        className +
        " rounded-md w-full bg-gray-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
      }
    >
      <p className="text-center">{label}</p>
    </button>
  );
};

export default SecondaryButton;
