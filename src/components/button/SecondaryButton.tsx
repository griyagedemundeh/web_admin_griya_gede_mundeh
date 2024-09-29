import React, { MouseEventHandler } from "react";

interface SecondaryButtonProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const SecondaryButton = ({
  label,
  onClick,
  className,
}: SecondaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={
        "rounded-md w-full bg-gray-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
      }
    >
      <p>{label}</p>
    </button>
  );
};

export default SecondaryButton;
