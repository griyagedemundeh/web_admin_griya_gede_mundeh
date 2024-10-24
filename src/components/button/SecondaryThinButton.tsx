import React, { ForwardRefExoticComponent, MouseEventHandler } from "react";

interface SecondaryThinButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon?: ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  className?: string;
  classNameIcon?: string;
  label?: string;
  unSubmit?: boolean;
}

const SecondaryThinButton = ({
  onClick,
  className,
  classNameIcon,
  icon: Icon,
  label,
  unSubmit,
}: SecondaryThinButtonProps) => {
  if (unSubmit) {
    return (
      <div
        onClick={(e: any) => {
          onClick(e);
        }}
        className={
          className +
          " py-1 bg-slate-50 w-full border-2 border-gray-300 flex flex-row justify-center items-center rounded-lg space-x-2 hover:cursor-pointer"
        }
      >
        {Icon ? (
          <Icon className={classNameIcon ?? "h-5 w-5"} color="gray" />
        ) : null}
        <p className="text-gray-500 text-xs">{label}</p>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={
        className +
        " py-1 bg-slate-50 w-full border-2 border-gray-300 flex flex-row justify-center items-center rounded-lg space-x-2"
      }
    >
      {Icon ? (
        <Icon className={classNameIcon ?? "h-5 w-5"} color="gray" />
      ) : null}
      <p className="text-gray-500 text-xs">{label}</p>
    </button>
  );
};

export default SecondaryThinButton;
