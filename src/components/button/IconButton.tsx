import React, { ForwardRefExoticComponent, MouseEventHandler } from "react";

interface PrimaryWithIconButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon: ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  className?: string;
  classNameIcon?: string;
}

const IconButton = ({
  icon: Icon,
  onClick,
  className,
  classNameIcon,
}: PrimaryWithIconButtonProps) => {
  return (
    <button
      className={
        className + " hover:cursor-pointer hover:bg-gray-200 rounded-full p-1"
      }
      onClick={onClick}
    >
      <Icon
        aria-hidden="true"
        className={classNameIcon ?? "h-5 w-5"}
        color="gray"
      />
    </button>
  );
};

export default IconButton;
