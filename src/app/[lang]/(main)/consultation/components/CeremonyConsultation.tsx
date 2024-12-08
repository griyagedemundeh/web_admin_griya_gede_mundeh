import Consultation from "@/data/models/consultation/response/consultation";
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
  return (
    <div
      className="overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-200 scrollbar-track-white"
      style={{ height: "30rem" }}
    >
      {consultations?.map((consultation, index) => (
        <div
          onClick={() => {
            setSelectedCeremonyConsultation(consultation);
          }}
          key={`${consultation.id}`}
          className={` ${
            selectedCeremonyConsultation?.id === consultation.id
              ? "bg-yellow-50"
              : ""
          }  flex flex-row items-center space-x-4 hover:cursor-pointer hover:bg-yellow-50 p-4 rounded-lg`}
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
        </div>
      ))}
    </div>
  );
};

export default CeremonyConsultation;
