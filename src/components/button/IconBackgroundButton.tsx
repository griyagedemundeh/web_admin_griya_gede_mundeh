import React, { ForwardRefExoticComponent, MouseEventHandler } from "react";

interface IconBackgroundButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon: ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  className?: string;
  classNameIcon?: string;
  colorIcon?: string;
  colorBackground?: string;
}

const IconBackgroundButton = ({
  icon: Icon,
  onClick,
  className,
  classNameIcon,
  colorBackground,
  colorIcon,
}: IconBackgroundButtonProps) => {
  return (
    <button
      className={
        className +
        ` p-2 bg-${colorBackground}-100 rounded-lg hover:bg-${colorBackground}-200`
      }
      onClick={onClick}
    >
      <Icon
        color={colorIcon}
        height={22}
        width={22}
        className={classNameIcon}
      />
    </button>
  );
};

export default IconBackgroundButton;
