"use client";

import { getDictionary, Locale } from "../../dictionaries";
import PrimaryCard from "@/components/card/PrimaryCard";
import PrimaryButton from "@/components/button/PrimaryButton";
import SettingTabs from "./components/SettingTabs";
import BigFileInput from "@/components/input/image/BigFileInput";
import PrimaryInput from "@/components/input/PrimaryInput";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";
import { useState } from "react";

const ProfileSettingsContent = () => (
  <form>
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-gray-900/10 md:grid-cols-3">
        <div className="grid grid-cols-1">
          <BigFileInput
            label="Upload Logo Griya"
            onChange={(e) => {}}
            value={""}
          />
        </div>

        <div className="grid max-w-2xl gap-4 sm:grid-cols-6 md:col-span-2">
          <PrimaryInput
            value={""}
            label="Nama Griya"
            type="text"
            placeholder="Nama Griya"
            className="w-full sm:col-span-3"
            onChange={(e) => {}}
          />
          <PrimaryInput
            value={""}
            label="Email Griya"
            type="text"
            placeholder="griya@domain.com"
            className="w-full sm:col-span-3"
            onChange={(e) => {}}
          />
          <PrimaryInput
            value={""}
            label="No. Telp Griya"
            type="text"
            placeholder="+62 819-xxxx-xxxx"
            className="w-full sm:col-span-3"
            onChange={(e) => {}}
          />
          <PrimaryInput
            value={""}
            label="Alamat Griya"
            type="text"
            placeholder="Jl. Denpasar-Gilimanuk"
            className="w-full sm:col-span-3"
            onChange={(e) => {}}
          />
          <PrimaryTextArea
            label="Tentang Griya"
            value={""}
            placeholder="Informasikan Sejarah Griya/Hal yang beruhubungan dengan Griya"
            onChange={() => {}}
            className="w-full sm:col-span-6"
          />
          <PrimaryTextArea
            label="Visi Griya"
            value={""}
            placeholder="Tuliskan Visi dari Griya"
            onChange={() => {}}
            className="w-full sm:col-span-6"
          />
          <PrimaryTextArea
            label="Misi Griya"
            value={""}
            placeholder="Tuliskan Misi dari Griya"
            onChange={() => {}}
            className="w-full sm:col-span-6"
          />
        </div>
      </div>
    </div>
  </form>
);

const SocialMediaSettingContent = () => (
  <div>
    <h3>Pengaturan Keamanan</h3>
    <p>Di sini Anda dapat mengubah pengaturan keamanan akun Anda.</p>
    {/* Tambahkan form atau komponen untuk pengaturan keamanan */}
  </div>
);

const AdminProfileSettingContent = () => (
  <form>
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-gray-900/10 md:grid-cols-3">
        <div className="grid grid-cols-1">
          <BigFileInput
            label="Upload Photo Profile"
            onChange={(e) => {}}
            value={""}
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
      footerContent={
        <div className="my-4 flex items-center justify-end gap-x-6">
          <PrimaryButton
            label="Simpan"
            onClick={() => {}}
            className="rounded-md bg-primary1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary1"
          />
        </div>
      }
    />
  );
}
