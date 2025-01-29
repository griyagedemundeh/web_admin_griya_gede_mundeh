"use client";

import { getDictionary, Locale } from "../../dictionaries";

import Image from "next/image";

import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import PrimaryTable from "@/components/table/PrimaryTable";
import Images from "@/constants/images";
import AddMemberModal from "./components/AddMemberModal";
import DetailMemberModal from "./components/DetailMemberModal";
import DeleteMemberModal from "./components/DeleteMemberModal";
import MemberRequest from "@/data/models/member/request/member_request";
import Member from "@/data/models/member/response/member";
import { useMember } from "@/hooks/member/use_member";
import { useAuth } from "@/hooks/auth/use_auth";

export default function UserPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = getDictionary(lang);
  const [open, setOpen] = useState(false);

  const { allMember } = useMember({});
  const { account } = useAuth();

  const [currentPage, setCurrentPage] = useState<number>(1);

  // Tolong sesuaikan dengan MemberRequest
  const [memberRequest, setMemberRequest] = useState<MemberRequest>({
    email: "",
    fullName: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    address: "",
    emailVerified: 0,
  });

  // Tolong ubah Dummy User ini pakai model Member
  const columns = useMemo<ColumnDef<Member>[]>(
    () => [
      {
        header: "Nama Anggota",
        cell: (info) => (
          <div className="py-4 sm:pl-8 pr-3 text-sm font-medium text-gray-900">
            <div className="flex flex-row space-x-4 items-center">
              <Image
                alt={info.row.original.user.fullName}
                src={info.row.original.user.avatarUrl ?? Images.dummyProfile}
                className="h-10 w-10 rounded-full bg-gray-50 object-cover"
                height={40}
                width={40}
                objectFit="cover"
              />
              <p className="font-bold">
                {info.row.original.user.fullName ?? "-"}
              </p>
            </div>
          </div>
        ),
      },
      {
        header: "Email",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {info.row.original.user.email ?? "-"}
          </div>
        ),
      },
      {
        header: "No.Hp",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {info.row.original.user.phoneNumber ?? "-"}
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
                id={info.row.original.id} // Ensure info.row.original has an id
                data={{
                  // Sesuaikan dengan Member
                  fullName: info.row.original.user.fullName,
                  phoneNumber: info.row.original.user.phoneNumber,
                  password: "",
                  passwordConfirm: "",
                  email: info.row.original.user.email,
                  address: info.row.original.memberAddress[0].address,
                  emailVerified: info.row.original.user.emailVerified ?? 0,
                }}
              />
              {account?.role === "superAdmin" ? (
                <DeleteMemberModal
                  data={{
                    // sesuaikan dengan member
                    fullName: info.row.original.user.fullName,
                    id: info.row.original.id,
                  }}
                />
              ) : null}
            </div>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <h1 className="font-bold text-xl mb-8">Anggota</h1>
      <PrimaryTable
        title="Daftar Anggota"
        mainActionTitle={
          account?.role === "superAdmin" ? "Tambah Anggota" : undefined
        }
        // onFilterReset={() => {}}
        // filters={
        //   <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center lg:w-8/12 w-full">
        //     <DropdownFilter
        //       label="Status"
        //       selectedItem={selectedStatusItem}
        //       setSelectedItem={setSelectedStatusItem}
        //       icon={CheckCircleIcon}
        //       items={status}
        //     />

        //     <PrimaryInput
        //       onChange={(e) => {}}
        //       value={""}
        //       placeholder="Cari Anggota"
        //       className="w-full"
        //       trailing={
        //         <IconButton
        //           icon={MagnifyingGlassIcon}
        //           onClick={() => {}}
        //           className="absolute top-1 right-1"
        //         />
        //       }
        //     />
        //   </div>
        // }
        mainActionOnClick={() => {
          if (account?.role === "superAdmin") {
            setOpen(true);
          }
        }}
        columns={columns}
        data={allMember?.data ?? []}
        isLoading={false}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={5}
        limitPage={10}
        isCommon={true}
      />

      {/* Dialog Add Member*/}
      {/* Tolong sesuaikan dengan MemberRequest */}
      <AddMemberModal open={open} setOpen={setOpen} data={memberRequest} />

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
