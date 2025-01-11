import React, { MouseEventHandler } from "react";

interface SecondaryButtonProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  unSubmit?: boolean;
  loading?: boolean;
}

const SecondaryButton = ({
  label,
  onClick,
  className,
  unSubmit,
  loading,
}: SecondaryButtonProps) => {
  if (unSubmit) {
    return (
      <div
        onClick={(e: any) => {
          onClick(e);
        }}
        className={
          className +
          " rounded-md w-full bg-gray-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 hover:cursor-pointer flex flex-row justify-center space-x-2"
        }
      >
        <p className="text-center">{label}</p>
        {loading && (
          <svg
            className="animate-spin h-5 w-5 text-current"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
            />
          </svg>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={
        className +
        " rounded-md w-full bg-gray-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 flex flex-row justify-center space-x-2"
      }
    >
      <p className="text-center">{label}</p>
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-current"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
};

export default SecondaryButton;
