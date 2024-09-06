import React, { ForwardRefExoticComponent, MouseEventHandler } from "react";

interface PrimaryWithIconButtonProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon: ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  className?: string;
}

const PrimaryWithIconButton = ({
  label,
  onClick,
  icon: Icon,
  className,
}: PrimaryWithIconButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={
        className +
        " inline-flex justify-center rounded-md bg-primary1 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary1 sm:col-start-2 space-x-2"
      }
    >
      <Icon aria-hidden="true" className="-mr-0.5 h-5 w-5" color="white" />
      <p>{label}</p>
    </button>
  );
};

export default PrimaryWithIconButton;
