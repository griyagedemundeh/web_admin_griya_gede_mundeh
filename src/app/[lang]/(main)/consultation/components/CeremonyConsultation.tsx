import StorageKey from "@/constants/storage_key";
import Consultation from "@/data/models/consultation/response/consultation";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import React from "react";

interface ICeremonyConsultationProps {
  consultations: Consultation[] | undefined;
  selectedCeremonyConsultation: Consultation | undefined;
  setSelectedCeremonyConsultation: (consultation: Consultation) => void;
}

const CeremonyConsultation = ({
  consultations,
  selectedCeremonyConsultation,
  setSelectedCeremonyConsultation,
}: ICeremonyConsultationProps) => {
  const updateRead = async (consultation: Consultation) => {
    try {
      await supabase
        .from(StorageKey.CEREMONY_CONSULTATION)
        .update({
          ...consultation,
          isRead: true,
          updatedAt: new Date().toISOString(),
        })
        .eq("consultationId", consultation.consultationId)
        .eq("isRead", false);
    } catch (error) {
      console.error("Error processing update read:", error);
    }
  };

  return (
    <div
      className="overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-200 scrollbar-track-white"
      style={{ height: "30rem" }}
    >
      {consultations?.map((consultation, index) => (
        <div
          onClick={async () => {
            setSelectedCeremonyConsultation(consultation);
            await updateRead(consultation);
          }}
          key={`${consultation.id}`}
          className={` ${
            selectedCeremonyConsultation?.id === consultation.id
              ? "bg-yellow-50"
              : ""
          }  flex flex-row items-center space-x-4 hover:cursor-pointer hover:bg-yellow-50 px-4 py-6 relative border-b-2`}
        >
          <Image
            alt=""
            src={consultation?.userPhoto ?? ""}
            className="h-10 w-10 rounded-full bg-gray-50"
            height={40}
            width={40}
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm">
              {consultation.userName}
            </span>
            <span className="text-xs text-gray-500">
              Konsultasi untuk{""}
              <b className="ml-1">{consultation.ceremonyName}</b>
            </span>
          </div>

          {!consultation.isRead && (
            <div
              className="bg-rose-600 py-1 px-2 rounded-full absolute top-1 right-2 text-white"
              style={{ fontSize: 8 }}
            >
              Ada Pesan Baru
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CeremonyConsultation;
