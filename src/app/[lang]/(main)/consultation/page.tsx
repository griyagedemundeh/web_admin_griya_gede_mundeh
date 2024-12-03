"use client";

import { useEffect, useState } from "react";
import { Locale } from "../../dictionaries";
import { supabase } from "@/utils/supabase";
import StorageKey from "@/constants/storage_key";
import Consultation from "@/data/models/consultation/response/consultation";
import SidebarConsultation from "./components/SideBarConsultation";
import ChatSection from "./components/ChatSection";
import InvoiceSection from "./components/InvoiceSection";

export default function ConsultationPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const [selectedConsultation, setSelectedConsultation] =
    useState<Consultation>();
  const [consultations, setConsultations] = useState<Consultation[]>();

  useEffect(() => {
    supabase
      .from(StorageKey.CEREMONY_CONSULTATION)
      .select()
      .then((val) => {
        if ((val.data?.length ?? 0) >= 1) {
          setConsultations(val.data as any);
        }
      });
  }, [consultations]);

  return (
    <div className="flex bg-white rounded-lg border">
      <SidebarConsultation
        consultations={consultations}
        selectedConsultation={selectedConsultation}
        setSelectedConsultation={setSelectedConsultation}
      />
      {!selectedConsultation ? (
        <div className="flex flex-row flex-1 items-center justify-center">
          <p className="text-gray-400">
            Silahkan pilih Konsultasi yang ingin diproses!
          </p>
        </div>
      ) : (
        <>
          <ChatSection consultation={selectedConsultation} />
          <InvoiceSection
            ceremonyServiceId={selectedConsultation?.ceremonyServiceId ?? 0}
          />
        </>
      )}
    </div>
  );
}
