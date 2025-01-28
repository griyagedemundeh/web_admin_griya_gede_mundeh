"use client";

import SecondaryButton from "@/components/button/SecondaryButton";
import { useRouter } from "next/navigation";
import React from "react";

const ForbiddenPage = () => {
  const route = useRouter();

  return (
    <div className="h-screen flex justify-center items-center flex-col space-y-4">
      <p>Anda tidak memiliki akses ke halaman yang anda inginkan</p>
      <div className="w-20">
        <SecondaryButton
          label={"Kembali"}
          className="w-20"
          onClick={() => {
            route.back();
          }}
        />
      </div>
    </div>
  );
};

export default ForbiddenPage;
