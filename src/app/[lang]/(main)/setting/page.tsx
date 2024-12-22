"use client";

import { getDictionary, Locale } from "../../dictionaries";
import PrimaryCard from "@/components/card/PrimaryCard";
import PrimaryButton from "@/components/button/PrimaryButton";
import SettingTabs from "./components/SettingTabs";
import BigFileInput from "@/components/input/image/BigFileInput";
import PrimaryInput from "@/components/input/PrimaryInput";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";
import { ReactElement, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import ProfileGriyaRequest from "@/data/models/setting/request/profile_griya_request";
import { useSetting } from "@/hooks/setting/use_setting";
import { urlToFile } from "@/utils";
import profileGriyaValidation from "./validation/profile_griya_validation";
const ProfileSettingsContent = (): ReactElement => {
  const { profileGriya, updateProfileGriya, isLoadingUpdateProfileGriya } =
    useSetting();

  const [profileGriyaRequest, setProfileGriyaRequest] =
    useState<ProfileGriyaRequest>({
      about: "",
      address: "",
      email: "",
      mission: "",
      name: "",
      phoneNumber: "",
      vision: "",
      logo: undefined,
    });

  useEffect(() => {
    if (profileGriya?.data) {
      const {
        about,
        address,
        email,
        mission,
        name,
        phoneNumber,
        vision,
        logo,
      } = profileGriya.data;

      setProfileGriyaRequest({
        about: about ?? "",
        address: address ?? "",
        email: email ?? "",
        mission: mission ?? "",
        name: name ?? "",
        phoneNumber: phoneNumber ?? "",
        vision: vision ?? "",
        logo: undefined,
      });

      if (logo) {
        getFile(logo);
      }
    }
  }, [profileGriya]);

  const getFile = async (logoUrl: string) => {
    const file = await urlToFile({
      fileName: "thumbnail.png",
      url: logoUrl,
      mimeType: "image/png",
    });

    setProfileGriyaRequest((prev) => ({
      ...prev,
      logo: file,
    }));
  };

  const handleUpdateProfileGriya = (request: ProfileGriyaRequest) => {
    updateProfileGriya(request);
  };

  return (
    <Formik
      initialValues={profileGriyaRequest}
      onSubmit={handleUpdateProfileGriya}
      validationSchema={profileGriyaValidation}
      enableReinitialize
    >
      {({ errors, handleChange, handleSubmit, values, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <div className="space-y-12 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-gray-900/10 md:grid-cols-3">
              <div className="grid grid-cols-1">
                <BigFileInput
                  label="Upload Logo Griya"
                  onChange={(e) => {
                    setFieldValue("logo", e);
                  }}
                  src={profileGriya?.data.logo}
                />
              </div>

              <div className="grid max-w-2xl gap-4 sm:grid-cols-6 md:col-span-2">
                <PrimaryInput
                  value={values.name}
                  label="Nama Griya"
                  type="text"
                  placeholder="Nama Griya"
                  className="w-full sm:col-span-3"
                  onChange={handleChange("name")}
                  error={errors.name}
                />
                <PrimaryInput
                  value={values.email}
                  label="Email Griya"
                  type="text"
                  placeholder="griya@domain.com"
                  className="w-full sm:col-span-3"
                  onChange={handleChange("email")}
                  error={errors.email}
                />
                <PrimaryInput
                  value={values.phoneNumber}
                  label="No. Telp Griya"
                  type="text"
                  placeholder="+62 819-xxxx-xxxx"
                  className="w-full sm:col-span-3"
                  onChange={handleChange("phoneNumber")}
                  error={errors.phoneNumber}
                />
                <PrimaryInput
                  value={values.address}
                  label="Alamat Griya"
                  type="text"
                  placeholder="Jl. Denpasar-Gilimanuk"
                  className="w-full sm:col-span-3"
                  onChange={handleChange("address")}
                  error={errors.address}
                />
                <PrimaryTextArea
                  label="Tentang Griya"
                  value={values.about}
                  placeholder="Informasikan Sejarah Griya/Hal yang berhubungan dengan Griya"
                  onChange={handleChange("about")}
                  className="w-full sm:col-span-6"
                  error={errors.about}
                />
                <PrimaryTextArea
                  label="Visi Griya"
                  value={values.vision}
                  placeholder="Tuliskan Visi dari Griya"
                  onChange={handleChange("vision")}
                  className="w-full sm:col-span-6"
                  error={errors.vision}
                />
                <PrimaryTextArea
                  label="Misi Griya"
                  value={values.mission}
                  placeholder="Tuliskan Misi dari Griya"
                  onChange={handleChange("mission")}
                  className="w-full sm:col-span-6"
                  error={errors.mission}
                />
              </div>
            </div>
          </div>
          <div className="px-4 sm:px-6">
            <div className="my-4 flex items-center justify-end gap-x-6">
              <PrimaryButton
                label="Simpan"
                loading={isLoadingUpdateProfileGriya}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const SocialMediaSettingContent = () => (
  <div className="px-4 py-5 sm:p-6">
    <h3>Pengaturan Keamanan</h3>
    <p>Di sini Anda dapat mengubah pengaturan keamanan akun Anda.</p>
    {/* Tambahkan form atau komponen untuk pengaturan keamanan */}
  </div>
);

const AdminProfileSettingContent = () => (
  <form>
    <div className="space-y-12 px-4 py-5 sm:p-6">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-gray-900/10 md:grid-cols-3">
        <div className="grid grid-cols-1">
          <BigFileInput
            label="Upload Photo Profile"
            onChange={(e) => {}}
            src={""}
          />
        </div>

        <div className="grid max-w-2xl gap-4 sm:grid-cols-6 md:col-span-2">
          <PrimaryInput
            value={""}
            label="Nama Lengkap"
            type="text"
            placeholder="Nama Lengkap"
            className="w-full sm:col-span-2"
            onChange={(e) => {}}
          />
          <PrimaryInput
            value={""}
            label="Email"
            type="text"
            placeholder="admin@domain.com"
            className="w-full sm:col-span-2"
            onChange={(e) => {}}
          />
          <PrimaryInput
            value={""}
            label="No. Handphone"
            type="text"
            placeholder="+62 819-xxxx-xxxx"
            className="w-full sm:col-span-2"
            onChange={(e) => {}}
          />
          <PrimaryInput
            value={""}
            label="Password"
            type="password"
            placeholder="Password saat ini"
            className="w-full sm:col-span-6"
            onChange={(e) => {}}
          />
          <PrimaryInput
            value={""}
            label="Password Baru"
            type="password"
            placeholder="Password Baru"
            className="w-full sm:col-span-6"
            onChange={(e) => {}}
          />
          <PrimaryInput
            value={""}
            label="Konfirmasi Password Baru"
            type="password"
            placeholder="Konfirmasi Password Baru"
            className="w-full sm:col-span-6"
            onChange={(e) => {}}
          />
        </div>
      </div>
    </div>
  </form>
);

export default function SettingPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = getDictionary(lang);
  const [activeTab, setActiveTab] = useState("profile-griya");
  const renderContent = () => {
    switch (activeTab) {
      case "profile-griya":
        return <ProfileSettingsContent />;
      case "social-media-griya":
        return <SocialMediaSettingContent />;
      case "profile-admin":
        return <AdminProfileSettingContent />;
      default:
        return <ProfileSettingsContent />;
    }
  };
  return (
    <PrimaryCard
      headerContent={
        <SettingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      }
      content={renderContent()}
    />
  );
}
