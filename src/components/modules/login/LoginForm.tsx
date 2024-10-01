"use client";

import PrimaryButton from "@/components/button/PrimaryButton";
import PrimaryInput from "@/components/input/PrimaryInput";
import Images from "@/constants/images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface LoginFormProps {
  t: any;
}

const LoginForm = ({ t }: LoginFormProps) => {
  const router = useRouter();
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [emailValue, setEmailValue] = useState<string>("");

  const login = () => {
    document.cookie = "isLogin=true; max-age=36000";

    setTimeout(() => {}, 1000);

    router.push("/dashboard");
  };

  return (
    <main className="h-screen w-screen flex flex-row p-16 justify-between space-x-6">
      <div className="p-8 bg-primary1 flex justify-center items-center rounded-3xl w-1/2">
        <Image
          src={Images.authIllustration}
          alt=""
          className="w-3/4"
          width={100}
          height={100}
        />
      </div>
      <div className="p-8 w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-row items-center space-x-4 justify-center">
          <Image src={Images.icGriya} alt="" width={90} height={90} />
          <h1 className="font-bold">{t.title.griya}</h1>
        </div>

        <div className="w-full mt-10">
          <div className="px-52">
            <PrimaryInput
              label={t.label.emailorPhone}
              value={emailValue}
              onChange={(e) => {
                setEmailValue(e.target.value);
              }}
            />
            <div className="mt-4" />
            <PrimaryInput
              label={t.label.password}
              value={passwordValue}
              type="password"
              onChange={(e) => {
                setPasswordValue(e.target.value);
              }}
            />
            <div className="mt-16" />
            <PrimaryButton
              label={t.label.login}
              onClick={() => {
                login();
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
