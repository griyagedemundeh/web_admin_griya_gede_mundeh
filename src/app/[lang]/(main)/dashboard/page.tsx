"use client";

import CeremonyCard from "@/components/card/CeremonyCard";
import { Locale } from "../../dictionaries";
import { useAuth } from "@/hooks/auth/use_auth";
import { useCeremonyHistory } from "@/hooks/ceremony/use_ceremony_history";
import Modal from "@/components/modal/Modal";
import PrimaryInput from "@/components/input/PrimaryInput";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import SecondaryWithIconButton from "@/components/button/SecondaryWithIconButton";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";
import PrimaryTextEditor from "@/components/input/PrimaryTextEditor";
import { formatDateIndonesia } from "@/utils";
import { useEffect, useState } from "react";
import AlertConfirmationModal from "@/components/modal/AlertConfirmationModal";
import { useCentralStore } from "@/store";
import CeremonyHistoryUpdateStatusRequest from "@/data/models/ceremony/request/ceremony_history_update_request";
import AlertDangerModal from "@/components/modal/AlertDangerModal";
import CeremonyHistory from "@/data/models/ceremony/response/ceremony_history";
import { Card, LineChart } from "@tremor/react";
import FilterInput from "@/components/input/FilterInput";
import Datepicker from "react-tailwindcss-datepicker";
import type { DateValueType } from "react-tailwindcss-datepicker";
import { Interval } from "@/types";
import { useStatistic } from "@/hooks/statistic/use_statistic";

export default function Dashboard({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { account } = useAuth();

  const {
    allCeremonyHistoryOnProgress,
    isAllCeremonyHistoryOnProgressLoading,
  } = useCeremonyHistory();

  const [openModalCompleteStatus, setOpenModalCompleteStatus] =
    useState<boolean>(false);
  const [openModalCancelStatus, setOpenModalCancelStatus] =
    useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState(false);

  const [ceremonyHistory, setCeremonyHistory] = useState<CeremonyHistory>();

  const { setIsLoading } = useCentralStore();

  const { updateStatusCeremonyHistory } = useCeremonyHistory();

  const updateStatus = (request: CeremonyHistoryUpdateStatusRequest) => {
    setIsLoading(true);

    updateStatusCeremonyHistory(request);
  };

  const intervals = [
    { name: "Bulan", value: "month" } as Interval,
    { name: "Minggu", value: "week" } as Interval,
    { name: "Hari", value: "day" } as Interval,
  ];

  const [orderStatFilter, setOrderStatFilter] = useState(intervals[1].value);
  const todayDate = new Date();
  const oneMonthPastDate = todayDate.setMonth(todayDate.getMonth() - 1);

  const [orderStatDate, setOrderStatDate] = useState<DateValueType>({
    startDate: new Date(oneMonthPastDate),
    endDate: new Date(),
  });

  const {
    transactionStatistic,
    setFilterTransaction,
    refetchTransactionStatistic,
  } = useStatistic();

  useEffect(() => {
    setFilterTransaction({
      interval: orderStatFilter as any,
      startDate: orderStatDate?.startDate!,
      endDate: orderStatDate?.endDate!,
    });

    refetchTransactionStatistic();
  }, [orderStatFilter, orderStatDate]);

  useEffect(() => {
    setIsLoading(isAllCeremonyHistoryOnProgressLoading);
  }, [isAllCeremonyHistoryOnProgressLoading, setIsLoading]);

  return (
    <div>
      <div>
        <h1 className="font-bold text-xl">
          Selamat Datang, {account?.fullName}🎉
        </h1>
        <p className="text-gray-500">
          {/* Lihat statistik transaksi dan acaramu disini. */}
          Lihat daftar Upacara Agama yang akan dilaksanakan.
        </p>
      </div>

      <div className="flex flex-row space-x-6 overflow-x-scroll w-full no-scrollbar mt-4">
        {(allCeremonyHistoryOnProgress?.data?.length ?? 0) > 0 ? (
          allCeremonyHistoryOnProgress?.data.map((item, index) => (
            <div
              key={item.id}
              onClick={() => {
                setCeremonyHistory(item);
                setIsLoading(true);

                setTimeout(() => {
                  setIsLoading(false);
                  setOpenDetail(true);
                }, 100);
              }}
              className="w-1/3"
            >
              <CeremonyCard ceremonyHistory={item} key={item.id} />
            </div>
          ))
        ) : (
          <div className="h-40 w-full flex items-center justify-center text-gray-400">
            Tidak ada Upacara Agama dalam proses
          </div>
        )}
      </div>

      <div className="mt-8">
        <Card>
          <div className="w-full grid grid-cols-2 gap-3">
            <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong col-span-1 mr-auto my-auto whitespace-nowrap">
              Transaksi
            </h3>
            <div className="ml-auto w-2/4 flex flex-col gap-y-3">
              <FilterInput
                props={{
                  value: orderStatFilter,
                  query: "",
                  label: "Interval",
                  setValue: setOrderStatFilter,
                  setQuery: () => {},
                  filter: intervals,
                  setPage: () => {},
                }}
              />

              <Datepicker
                popoverDirection="down"
                primaryColor={"amber"}
                displayFormat={"YYYY-MM-DD"}
                placeholder={"Filter by date"}
                value={orderStatDate}
                maxDate={new Date()}
                separator="-"
                onChange={(newValue: DateValueType) => {
                  console.log("====================================");
                  console.log("new value ===> ", newValue);
                  console.log("====================================");
                  setOrderStatDate(newValue);
                }}
                inputClassName="relative w-full rounded-md border border-secondary text-black text-sm bg-white px-2 py-1"
              />
            </div>
          </div>
          <div className="flex justify-between items-center gap-x-4">
            <LineChart
              className="w-8/12 mt-6"
              data={transactionStatistic?.data.statistics ?? []}
              categories={[
                "total_success_orders",
                "total_pending_orders",
                "total_cancel_orders",
              ]}
              colors={["emerald", "yellow", "rose"]}
              index="interval"
              curveType="natural"
              noDataText={"Tidak ada data"}
            />
            <div className="h-52 flex rounded-full overflow-hidden aspect-square border-[10px] border-primary1 mx-auto">
              <div className="m-auto">
                <div className="flex flex-col gap-y-1">
                  <p className="text-primary text-base">Total Transaksi</p>
                  <p
                    className="text-center truncate text-4xl font-bold text-primary"
                    title={`${transactionStatistic?.data.total ?? 0}`}
                  >
                    {`${transactionStatistic?.data.total ?? 0}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Modal
        title={ceremonyHistory?.title ?? "-"}
        isOpen={openDetail}
        setIsOpen={setOpenDetail}
      >
        <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
          <PrimaryInput
            label="Status Proses"
            value={ceremonyHistory?.status ?? ""}
            className="w-full"
            disabled
          />
          <PrimaryInput
            label="Nama Upacara Agama"
            value={ceremonyHistory?.title ?? ""}
            className="w-full"
            disabled
          />
          <PrimaryInput
            label="Tanggal Upacara"
            value={
              ceremonyHistory?.createdAt
                ? formatDateIndonesia(ceremonyHistory?.ceremonyDate)
                : "-"
            }
            className="w-full"
            disabled
          />
          <PrimaryInput
            label="Pemedek/Pengguna"
            value={ceremonyHistory?.ceremonyMember?.user?.fullName ?? ""}
            className="w-full"
            disabled
          />
          <PrimaryTextArea
            value={`${ceremonyHistory?.ceremonyAddress}\n${
              ceremonyHistory?.ceremonyAddressNote ?? ""
            }`}
            label="Alamat/Lokasi Upacara"
            disabled
            className="w-full"
          />
          <PrimaryInput
            label="Pengelola/Admin"
            value={ceremonyHistory?.ceremonyAdmin?.user?.fullName ?? ""}
            className="w-full"
            disabled
          />
          <PrimaryTextEditor
            label="Deskripsi Upacara"
            value={ceremonyHistory?.description ?? "-"}
            disabled
          />
          {ceremonyHistory?.note && (
            <PrimaryTextArea
              value={`${ceremonyHistory?.note}`}
              label="Catatan"
              disabled
              className="w-full"
            />
          )}

          <div className="flex flex-row justify-end w-full pt-2 space-x-2">
            {ceremonyHistory?.status !== "completed" &&
              ceremonyHistory?.status !== "cancel" && (
                <SecondaryWithIconButton
                  label="Batalkan"
                  className="bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-300"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenModalCancelStatus(true);
                  }}
                  icon={XCircleIcon}
                />
              )}

            {ceremonyHistory?.status !== "completed" &&
              ceremonyHistory?.status !== "cancel" && (
                <PrimaryWithIconButton
                  label="Selesai"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenModalCompleteStatus(true);
                  }}
                  icon={CheckCircleIcon}
                />
              )}
          </div>
        </div>
      </Modal>
      <AlertConfirmationModal
        onRightClick={() => {
          updateStatus({
            id: ceremonyHistory?.id ?? 0,
            status: "completed",
          });

          setOpenDetail(false);
          setOpenModalCompleteStatus(false);
        }}
        open={openModalCompleteStatus}
        setOpen={setOpenModalCompleteStatus}
        title="Selesaikan Upacara"
        description={`Apakah kamu yakin ingin mengubah status ${ceremonyHistory?.title}  ke SELSAI?\nPastikan jika Upacara Agama telah selesai terlaksana!`}
        rightButtonLabel="Lanjutkan"
        leftButtonLabel="Batal"
      />
      <AlertDangerModal
        onRightClick={() => {
          updateStatus({
            id: ceremonyHistory?.id ?? 0,
            status: "cancel",
          });
          setOpenDetail(false);
          setOpenModalCancelStatus(false);
        }}
        open={openModalCancelStatus}
        setOpen={setOpenModalCancelStatus}
        title="Batalkan Upacara"
        description={`Apakah kamu yakin ingin mengubah status ${ceremonyHistory?.title}  ke BATAL?\nPastikan jika pembatalan atas persetujuan Pemedek/Pengguna!`}
        rightButtonLabel="Lanjutkan"
        leftButtonLabel="Batal"
      />
    </div>
  );
}
