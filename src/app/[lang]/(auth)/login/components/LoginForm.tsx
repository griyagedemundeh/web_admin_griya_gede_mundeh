"use client";

import PrimaryButton from "@/components/button/PrimaryButton";
import PrimaryInput from "@/components/input/PrimaryInput";
import Images from "@/constants/images";
import LoginRequest from "@/data/models/auth/request/login_request";
import { useAuth } from "@/hooks/auth/use_auth";
import { Form, Formik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import loginValidation from "../validation/login_validation";

interface LoginFormProps {
  t: any;
}

const LoginForm = ({ t }: LoginFormProps) => {
  const [request, setRequest] = useState<LoginRequest>({
    password: "",
    userIdentifier: "",
  });

  const { isLoadingLogin, login } = useAuth();

  const handleLogin = (requestLogin: LoginRequest) => {
    login(requestLogin);
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
            <Formik
              initialValues={request}
              onSubmit={handleLogin}
              validationSchema={loginValidation}
              suppressHydrationWarning={true}
            >
              {({ errors, handleChange, handleSubmit, values }) => (
                <Form>
                  <PrimaryInput
                    label={t.label.emailorPhone}
                    value={values.userIdentifier}
                    placeholder="Masukkan email/no.handphone anda"
                    error={errors.userIdentifier ?? undefined}
                    onChange={handleChange("userIdentifier")}
                  />
                  <div className="mt-4" />
                  <PrimaryInput
                    label={t.label.password}
                    value={values.password}
                    type="password"
                    placeholder="Masukkan password anda"
                    error={errors.password ?? undefined}
                    onChange={handleChange("password")}
                  />
                  <div className="mt-16" />
                  <PrimaryButton
                    label={t.label.login}
                    loading={isLoadingLogin}
                    onSubmit={handleSubmit}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
