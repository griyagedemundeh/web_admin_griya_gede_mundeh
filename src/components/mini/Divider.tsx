import React from "react";

interface DividerProps {
  height?: number;
  className?: string;
}

const Divider = ({ height, className }: DividerProps) => {
  return (
    <div
      className={"w-full bg-gray-300 " + className}
      style={{ height: height ?? 1 }}
    ></div>
  );
};

export default Divider;
