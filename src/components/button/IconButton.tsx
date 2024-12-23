import React, { ForwardRefExoticComponent, MouseEventHandler } from "react";

interface PrimaryWithIconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon: ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  className?: string;
  classNameIcon?: string;
  color?: string;
  type?: "submit" | "reset" | "button" | undefined;
}

const IconButton = ({
  icon: Icon,
  onClick,
  className,
  classNameIcon,
  color,
  type,
}: PrimaryWithIconButtonProps) => {
  return (
    <button
      type={type}
      className={
        className +
        ` hover:cursor-pointer hover:bg-${
          color ?? "gray"
        }-200 rounded-full p-1 aspect-square`
      }
      onClick={onClick}
    >
      <Icon
        aria-hidden="true"
        className={classNameIcon + "  h-5 w-5"}
        color={color ?? "gray"}
      />
    </button>
  );
};

export default IconButton;
