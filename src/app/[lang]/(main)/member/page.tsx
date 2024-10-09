"use client";

import {
  CheckCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { getDictionary, Locale } from "../../dictionaries";
import PrimaryInput from "@/components/input/PrimaryInput";
import Image from "next/image";
import DropdownFilter from "@/components/dropdown/DropdownFilter";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import IconButton from "@/components/button/IconButton";
import { status } from "@/utils/dummyData";
import PrimaryTable from "@/components/table/PrimaryTable";
import DummyUser from "@/data/models/user";
import Images from "@/constants/images";
import AddMemberModal from "./components/AddMemberModal";
import AdminRequest from "@/data/models/admin/request/admin_request";
import DetailMemberModal from "./components/DetailMemberModal";
import DeleteMemberModal from "./components/DeleteMemberModal";

export default function UserPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = getDictionary(lang);
  const [open, setOpen] = useState(false);
  const [selectedStatusItem, setSelectedStatusItem] =
    useState<DropdownFilterItemProps>();

  const [currentPage, setCurrentPage] = useState<number>(1);

  // Tolong sesuaikan dengan MemberRequest
  const [adminRequest, setAdminRequest] = useState<AdminRequest>({
    email: "",
    fullName: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
  });

  // Tolong ubah Dummy User ini pakai model Member
  const columns = useMemo<ColumnDef<DummyUser>[]>(
    () => [
      {
        header: "Nama Anggota",
        cell: (info) => (
          <div className="py-4 sm:pl-8 pr-3 text-sm font-medium text-gray-900">
            <div className="flex flex-row space-x-4 items-center">
              <Image
                alt={info.row.original.name}
                src={info.row.original.avatarUrl ?? Images.dummyProfile}
                className="h-10 w-10 rounded-full bg-gray-50 object-cover"
                height={40}
                width={40}
                objectFit="cover"
              />
              <p className="font-bold">{info.row.original.name}</p>
            </div>
          </div>
        ),
      },
      {
        header: "Email",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {info.row.original.email}
          </div>
        ),
      },
      {
        header: "No.Hp",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {info.row.original.phone}
          </div>
        ),
      },
      // {
      //   header: "Status",
      //   cell: (info) => (
      //     <SwitchInput
      //       label={
      //         info.row.original.status ? (
      //           <span className="font-medium text-gray-900">Aktif</span>
      //         ) : (
      //           <span className="font-medium text-gray-400">Non-Aktif</span>
      //         )
      //       }
      //       value={info.row.original.status}
      //       onChange={(e) => {}}
      //     />
      //   ),
      // },
      {
        header: "Aksi",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <div className="flex flex-row space-x-2">
              <DetailMemberModal
                // sesuaikan dengan id Member
                id={1}
                data={{
                  // Sesuaikan dengan Member
                  fullName: "",
                  phoneNumber: "",
                  password: "",
                  passwordConfirm: "",
                  email: "",
                }}
              />
              <DeleteMemberModal
                data={{
                  // sesuaikan dengan member
                  fullName: "",
                  id: "",
                }}
              />
            </div>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <h1 className="font-bold text-xl mb-8">Pengguna</h1>
      <PrimaryTable
        title="Daftar Pengguna"
        mainActionTitle="Tambah Pengguna"
        onFilterReset={() => {}}
        filters={
          <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center lg:w-8/12 w-full">
            <DropdownFilter
              label="Status"
              selectedItem={selectedStatusItem}
              setSelectedItem={setSelectedStatusItem}
              icon={CheckCircleIcon}
              items={status}
            />

            <PrimaryInput
              onChange={(e) => {}}
              value={""}
              placeholder="Cari Pengguna"
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
        mainActionOnClick={() => {
          setOpen(true);
        }}
        columns={columns}
        // Ubah [] dengan data allMember
        data={[]}
        isLoading={false}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={5}
        limitPage={10}
        isCommon={true}
      />

      {/* Dialog Add Member*/}
      {/* Tolong sesuaikan dengan MemberRequest */}
      <AddMemberModal open={open} setOpen={setOpen} data={adminRequest} />

      {/* Confirmation Dialog */}
      {/* <AlertConfirmationModal
        onRightClick={() => {
          setOpenActiveConfirmation(false);
        }}
        open={openActiveConfirmation}
        setOpen={setOpenActiveConfirmation}
        title="Konfirmasi"
        description="Apakah Anda yakin untuk menonaktifkan akun Katrina Hegmann?"
        rightButtonLabel="Lanjutkan"
        leftButtonLabel="Batal"
      /> */}
    </>
  );
}
