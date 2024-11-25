import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import PrimaryButton from "@/components/button/PrimaryButton";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import PrimaryInput from "@/components/input/PrimaryInput";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";
import PrimaryTextEditor from "@/components/input/PrimaryTextEditor";
import Modal from "@/components/modal/Modal";
import CeremonyHistory from "@/data/models/ceremony/response/ceremony_history";
import { formatDateIndonesia } from "@/utils";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import React, { useState } from "react";

interface CeremonyScheduleModalProps {
  title: string;
  ceremonyHistory: CeremonyHistory;
}

const CeremonyScheduleModal = ({
  title,
  ceremonyHistory,
}: CeremonyScheduleModalProps) => {
  const [openModalConfirmStatus, setOpenModalConfirmStatus] =
    useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState(false);

  return (
    <div>
      <IconBackgroundButton
        icon={InformationCircleIcon}
        colorBackground="blue"
        className="bg-blue-100"
        colorIcon="blue"
        onClick={() => {
          setOpenDetail(true);
        }}
      />
      <Modal title={title} isOpen={openDetail} setIsOpen={setOpenDetail}>
        <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
          <PrimaryInput
            label="Status Proses"
            value={ceremonyHistory.status ?? ""}
            className="w-full"
            disabled
          />
          <PrimaryInput
            label="Nama Upacara Agama"
            value={ceremonyHistory.title ?? ""}
            className="w-full"
            disabled
          />
          <PrimaryInput
            label="Tanggal Upacara"
            value={
              ceremonyHistory.createdAt
                ? formatDateIndonesia(ceremonyHistory.ceremonyDate)
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
            value={`${ceremonyHistory.ceremonyAddress}\n${
              ceremonyHistory.ceremonyAddressNote ?? ""
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
            value={ceremonyHistory.description}
            disabled
          />
          {ceremonyHistory.note && (
            <PrimaryTextArea
              value={`${ceremonyHistory.note}`}
              label="Catatan"
              disabled
              className="w-full"
            />
          )}

          {ceremonyHistory.status !== "completed" &&
            ceremonyHistory.status !== "cancel" && (
              <div className="flex flex-row justify-end w-full pt-2">
                <PrimaryWithIconButton
                  label="Selesai"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenModalConfirmStatus(true);
                  }}
                  icon={CheckCircleIcon}
                />
              </div>
            )}
        </div>
      </Modal>

      <Modal
        title={""}
        isOpen={openModalConfirmStatus}
        setIsOpen={setOpenModalConfirmStatus}
      >
        <div className="w-full flex flex-col justify-center items-center gap-y-4 p-4">
          {/* <Image
            alt=""
            src={Images.icEmptyceremonyHistory}
            className="w-72"
            height={40}
            width={40}
          /> */}
          <p></p>
          <SecondaryButton
            label="Batal"
            onClick={(e) => {
              e.preventDefault();
              setOpenModalConfirmStatus(false);
            }}
          />
          <PrimaryButton
            label="Ubah"
            // loading={isLoadingUpdateStatusceremonyHistory}
            onClick={(e) => {
              e.preventDefault();
              // updateStatusceremonyHistory({
              //   ceremonyHistoryId: ceremonyHistory.id,
              //   status: "success",
              // });
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CeremonyScheduleModal;
