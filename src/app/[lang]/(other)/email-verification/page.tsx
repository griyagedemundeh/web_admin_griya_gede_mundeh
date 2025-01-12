"use client";

import PrimaryButton from "@/components/button/PrimaryButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import { appBaseUrl } from "@/configs/config";
import CookieKey from "@/constants/cookie_key";
import Images from "@/constants/images";
import Routes from "@/constants/routes";
import { useAuth } from "@/hooks/auth/use_auth";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const EmailVerificationPage = () => {
  const {
    resendEmailVerification,
    isLoadingResendEmailVerification,
    refetchCekStatusEmailVerification,
    isCekStatusEmailVerificationSuccess,
  } = useAuth();

  const handleResendEmailVerification = () => {
    resendEmailVerification();
  };

  useEffect(() => {
    const pollInterval = setInterval(() => {
      refetchCekStatusEmailVerification();
    }, 2000);

    if (isCekStatusEmailVerificationSuccess) {
      clearInterval(pollInterval);
    }

    return () => clearInterval(pollInterval);
  }, []);

  useEffect(() => {
    if (isCekStatusEmailVerificationSuccess) {
      setTimeout(() => {
        setCookie(CookieKey.EMAIL_VERIFIED, 1, {
          domain: appBaseUrl(),
        });
        window.location.href = Routes.dashboard;
      }, 2000);
    }
  }, [isCekStatusEmailVerificationSuccess]);

  const route = useRouter();

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
          <h1 className="font-bold">{"Griya Gede Mundeh"}</h1>
        </div>

        <div className="w-full mt-10">
          <div className="px-52 mb-10">
            <p className="text-center">
              Akun anda masih belum terverifikasi. Web akan otomatis menuju
              Dashboard apabila verifikasi berhasil
            </p>
          </div>
          <div className="px-52 flex flex-col space-y-4">
            <PrimaryButton
              label={"Kirim Verifikasi Email"}
              loading={isLoadingResendEmailVerification}
              onClick={() => {
                handleResendEmailVerification();
              }}
            />
            <SecondaryButton
              label={"Kembali Ke Login"}
              onClick={() => {
                route.push(Routes.login);
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default EmailVerificationPage;
