import Images from "@/constants/images";
import Image from "next/image";
import React from "react";

interface LoginFormProps {
  t: any;
}

const LogoWithTitle = ({ t }: LoginFormProps) => {
  return (
    <div className="flex h-20 shrink-0 items-center space-x-4">
      <Image src={Images.icGriya} alt={t.title.griya} width={80} height={80} />
      <p className="font-bold">{t.title.griya}</p>
    </div>
  );
};

export default LogoWithTitle;
