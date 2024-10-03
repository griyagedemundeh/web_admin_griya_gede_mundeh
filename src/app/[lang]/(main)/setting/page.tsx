"use client";

import { getDictionary, Locale } from "../../dictionaries";
import PrimaryCard from "@/components/card/PrimaryCard";
import PrimaryButton from "@/components/button/PrimaryButton";
import SettingTabs from "./components/SettingTabs";
import BigFileInput from "@/components/input/BigFileInput";
import PrimaryInput from "@/components/input/PrimaryInput";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import SwitchInput from "@/components/input/SwitchInput";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import {
  LinkIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import PrimaryTable from "@/components/table/PrimaryTable";
import SocialNetwork from "@/data/models/socialNetwork";
import AlertDangerModal from "@/components/modal/AlertDangerModal";
import AddCeremonyModal from "../ceremony/components/AddCeremonyModal";
import { socialNetwork } from "@/utils/dummyData";
import IconButton from "@/components/button/IconButton";
import SocialNetworkTable from "./components/SocialNetworkTable";

interface SocialMediaSettingContentProps {
  columns: ColumnDef<any>[];
  data: any;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  openDelete: boolean;
  setOpenDelete: Dispatch<SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const ProfileSettingsContent = () => (
  <form>
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-gray-900/10 md:grid-cols-3">
        <div className="grid grid-cols-1">
          <BigFileInput
            name="logo"
            label="Upload Logo Griya"
            onChange={(e) => {}}
            value={""}
          />
        </div>

        <div className="grid max-w-2xl gap-4 sm:grid-cols-6 md:col-span-2">
          <PrimaryInput
            value={""}
            name="name"
            label="Nama Griya"
            type="text"
            placeholder="Nama Griya"
            className="w-full sm:col-span-3"
            onChange={(e) => {}}
          />
          <PrimaryInput
            value={""}
            name="email"
            label="Email Griya"
            type="text"
            placeholder="griya@domain.com"
            className="w-full sm:col-span-3"
            onChange={(e) => {}}
          />
          <PrimaryInput
            value={""}
            name="phoneNumber"
            label="No. Telp Griya"
            type="text"
            placeholder="+62 819-xxxx-xxxx"
            className="w-full sm:col-span-3"
            onChange={(e) => {}}
          />
          <PrimaryInput
            value={""}
            name="address"
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

const SocialMediaSettingContent = ({
  columns,
  data,
  open,
  setOpen,
  openDelete,
  setOpenDelete,
  currentPage,
  setCurrentPage,
}: SocialMediaSettingContentProps) => (
  <>
    <SocialNetworkTable
      title="Daftar Sosial Media"
      mainActionTitle="Tambah Sosial Media"
      filters={
        <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center lg:w-6/12 w-full">
          <PrimaryInput
            onChange={(e) => {}}
            value={""}
            placeholder="Cari Sosial Media"
            className="w-full"
            trailing={
              <IconButton
                icon={MagnifyingGlassIcon}
                onClick={() => {}}
                className="absolute top-1 right-1"
              />
            }
          />
        </div>
      }
      onFilterReset={() => {}}
      mainActionOnClick={() => {
        setOpen(true);
      }}
      columns={columns}
      data={data ?? []}
      isLoading={false}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPage={5}
      limitPage={10}
      isCommon={true}
    />

    {/* Delete Dialog */}
    <AlertDangerModal
      onRightClick={() => {
        setOpenDelete(false);
      }}
      open={openDelete}
      setOpen={setOpenDelete}
      title="Hapus"
      description="Are you sure you want to deactivate your account? All of your data will be permanently removed from our servers forever. This action cannot be undone."
      rightButtonLabel="Lanjutkan"
      leftButtonLabel="Batal"
    />
  </>
);

const AdminProfileSettingContent = () => (
  <form>
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-gray-900/10 md:grid-cols-3">
        <div className="grid grid-cols-1">
          <BigFileInput
            name="logo"
            label="Upload Photo Profile"
            onChange={(e) => {}}
            value={""}
          />
        </div>

        <div className="grid max-w-2xl gap-4 sm:grid-cols-6 md:col-span-2">
          <PrimaryInput
            value={""}
            name="name"
            label="Nama Lengkap"
            type="text"
            placeholder="Nama Lengkap"
            className="w-full sm:col-span-2"
            onChange={(e) => {}}
          />
          <PrimaryInput
            value={""}
            name="email"
            label="Email"
            type="text"
            placeholder="admin@domain.com"
            className="w-full sm:col-span-2"
            onChange={(e) => {}}
          />
          <PrimaryInput
            value={""}
            name="phoneNumber"
            label="No. Handphone"
            type="text"
            placeholder="+62 819-xxxx-xxxx"
            className="w-full sm:col-span-2"
            onChange={(e) => {}}
          />
          <PrimaryInput
            value={""}
            name="password"
            label="Password"
            type="password"
            placeholder="Password saat ini"
            className="w-full sm:col-span-6"
            onChange={(e) => {}}
          />
          <PrimaryInput
            value={""}
            name="new-password"
            label="Password Baru"
            type="password"
            placeholder="Password Baru"
            className="w-full sm:col-span-6"
            onChange={(e) => {}}
          />
          <PrimaryInput
            value={""}
            name="address"
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
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState("profile-griya");

  const [data, setData] = useState(() => socialNetwork);

  const columns = useMemo<ColumnDef<SocialNetwork>[]>(
    () => [
      {
        header: "Icon Sosial Media",
        cell: (info) => (
          <div className="py-4 sm:pl-8 pr-3 text-sm font-medium text-gray-900">
            <div className="flex flex-row space-x-4 items-center">
              <Image
                alt={info.row.original.platformName}
                src={info.row.original.platformIconUrl}
                className="h-10 w-10 rounded-full bg-gray-50 object-cover"
                height={40}
                width={40}
                objectFit="cover"
              />
              <div>
                <p className="font-bold">{info.row.original.platformName}</p>
                {/* <p className="text-xs text-gray-500 text-ellipsis line-clamp-1">
                  {info.row.original.description}
                </p> */}
              </div>
            </div>
          </div>
        ),
      },
      {
        header: "Nama Platform",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {info.row.original.platformName}
          </div>
        ),
      },
      {
        header: "Username",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {info.row.original.platformProfile}
          </div>
        ),
      },
      {
        header: "Status",
        cell: (info) => (
          <SwitchInput
            label={
              info.row.original.status ? (
                <span className="font-medium text-gray-900">Aktif</span>
              ) : (
                <span className="font-medium text-gray-400">Non-Aktif</span>
              )
            }
            value={info.row.original.status}
            onChange={(e) => {}}
          />
        ),
      },
      {
        header: "Aksi",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="flex flex-row space-x-2">
              <IconBackgroundButton
                icon={PencilSquareIcon}
                colorBackground="emerald"
                className="bg-emerald-100"
                colorIcon="green"
                onClick={() => {
                  setOpenDetail(true);
                }}
              />

              <IconBackgroundButton
                icon={TrashIcon}
                colorBackground="rose"
                colorIcon="red"
                onClick={() => {
                  setOpenDelete(true);
                }}
              />
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const renderContent = () => {
    switch (activeTab) {
      case "profile-griya":
        return <ProfileSettingsContent />;
      case "social-media-griya":
        return (
          <SocialMediaSettingContent
            columns={columns}
            data={data}
            open={open}
            setOpen={setOpen}
            openDelete={openDelete}
            setOpenDelete={setOpenDelete}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        );
      case "profile-admin":
        return <AdminProfileSettingContent />;
      default:
        return <ProfileSettingsContent />;
    }
  };

  const renderFooterContent = () => {
    switch (activeTab) {
      case "profile-griya":
        return (
          <div className="my-4 flex items-center justify-end gap-x-6">
            <PrimaryButton
              label="Simpan"
              onClick={() => {}}
              className="rounded-md bg-primary1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary1"
            />
          </div>
        );
      case "profile-admin":
        return (
          <div className="my-4 flex items-center justify-end gap-x-6">
            <PrimaryButton
              label="Simpan"
              onClick={() => {}}
              className="rounded-md bg-primary1 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary1"
            />
          </div>
        );
    }
  };
  return (
    <PrimaryCard
      headerContent={
        <SettingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      }
      content={renderContent()}
      footerContent={renderFooterContent()}
    />
  );
}
