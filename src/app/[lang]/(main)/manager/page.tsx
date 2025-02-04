"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { getDictionary, Locale } from "../../dictionaries";
import PrimaryInput from "@/components/input/PrimaryInput";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import IconButton from "@/components/button/IconButton";
import PrimaryTable from "@/components/table/PrimaryTable";
import { useAdmin } from "@/hooks/admin/use_admin";
import Admin from "@/data/models/admin/response/admin";
import DetailManagerModal from "./components/DetailManagerModal";
import AddManagerModal from "./components/AddManagerModal";
import AdminRequest from "@/data/models/admin/request/admin_request";
import Images from "@/constants/images";
import DeleteManagerModal from "./components/DeleteManagerModal";
import { useAuth } from "@/hooks/auth/use_auth";

export default function ManagerPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = getDictionary(lang);
  const [open, setOpen] = useState(false);

  const { allAdmin, refecthAllAdmin, filter, setFilter, isAllAdminLoading } =
    useAdmin();
  const { account } = useAuth();

  const [adminRequest, setAdminRequest] = useState<AdminRequest>({
    email: "",
    fullName: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    userId: 0,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [active, setActive] = useState<number>(1);

  const numberClick = (index: number) => {
    setActive(index);
    setFilter({ ...filter, page: index });
  };
  const nextClick = () => {
    if (active === allAdmin?.meta?.lastPage) return;
    setActive(active + 1);

    setFilter({ ...filter, page: active + 1 });
  };

  const prevClick = () => {
    if (active === 1) return;
    setActive(active - 1);

    setFilter({ ...filter, page: active - 1 });
  };

  useEffect(() => {
    setTimeout(() => {
      refecthAllAdmin();
    }, 1000);
  }, [filter, account?.role]);

  const columns = useMemo<ColumnDef<Admin>[]>(
    () => [
      {
        header: "Nama Pengelola",
        cell: (info) => (
          <div className="py-4 sm:pl-8 pr-3 text-sm font-medium text-gray-900">
            <div className="flex flex-row space-x-4 items-center">
              <Image
                alt={info.row.original?.user?.fullName}
                src={info.row.original?.user?.avatarUrl ?? Images.dummyProfile}
                className="h-10 w-10 rounded-full bg-gray-50 object-cover"
                height={40}
                width={40}
                objectFit="cover"
              />
              <p className="font-bold">
                {info.row.original?.user?.fullName ?? "-"}
              </p>
            </div>
          </div>
        ),
      },
      {
        header: "Email",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {info.row.original?.user?.email ?? "-"}
          </div>
        ),
      },
      {
        header: "No.Hp",
        cell: (info) => (
          <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {info.row.original?.user?.phoneNumber ?? "-"}
          </div>
        ),
      },
      // {
      //   header: "Status",
      //   cell: (info) => (
      //     <SwitchInput
      //       label={
      //         info.row.original?.user?.isActive ? (
      //           <span className="font-medium text-gray-900">Aktif</span>
      //         ) : (
      //           <span className="font-medium text-gray-400">Non-Aktif</span>
      //         )
      //       }
      //       value={info.row.original?.user?.isActive === 1}
      //       onChange={(e) => {}}
      //     />
      //   ),
      // },
      {
        header: "Aksi",
        cell: (info) => (
          <div className="relative">
            <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <div className="flex flex-row space-x-2">
                <DetailManagerModal
                  id={info.row.original?.id}
                  data={{
                    userId: info.row.original?.user?.id,
                    fullName: info.row.original?.user?.fullName,
                    phoneNumber: info.row.original?.user?.phoneNumber,
                    password: "",
                    passwordConfirm: "",
                    email: info.row.original?.user?.email,
                    emailVerified: info.row.original?.user?.emailVerified,
                  }}
                />
                {account?.role !== "admin" && (
                  <DeleteManagerModal
                    data={{
                      fullName: info.row.original?.user?.fullName,
                      id: info.row.original.id,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <h1 className="font-bold text-xl mb-8">Pengelola</h1>
      <PrimaryTable
        title="Daftar Pengelola"
        mainActionTitle="Tambah Pengelola"
        // onFilterReset={() => {}}
        filters={
          <div className="mt-4 sm:mt-0 sm:flex-none flex flex-row space-x-2 items-center flex-1 relative">
            {/* <PrimaryDatePicker
              setValue={(value) => {}}
              value={[new Date(), new Date()]}
            />

            <DropdownFilter
              label="Kategori"
              selectedItem={selectedCeremonyCategory}
              setSelectedItem={setSelectedCeremonyCategory}
              icon={TagIcon}
              items={categories}
            />

            <DropdownFilter
              label="Status"
              selectedItem={selectedStatusItem}
              setSelectedItem={setSelectedStatusItem}
              icon={CheckCircleIcon}
              items={status}
            /> */}

            <PrimaryInput
              onChange={(e) => {
                setFilter({ ...filter, search: e.target.value });
              }}
              value={filter.search ?? ""}
              placeholder="Cari Pengelola"
              className=""
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
        data={allAdmin?.data ?? []}
        isLoading={isAllAdminLoading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={allAdmin?.meta?.total}
        last={allAdmin?.meta?.lastPage}
        onNumberClick={numberClick}
        onNext={nextClick}
        onPrev={prevClick}
        active={active}
      />

      {/* Dialog Add Manager*/}
      <AddManagerModal open={open} setOpen={setOpen} data={adminRequest} />

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
    </div>
  );
}
