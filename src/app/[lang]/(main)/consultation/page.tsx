"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Locale } from "../../dictionaries";
import { supabase } from "@/utils/supabase";
import StorageKey from "@/constants/storage_key";
import Consultation from "@/data/models/consultation/response/consultation";
import SidebarConsultation from "./components/SideBarConsultation";
import ChatSection from "./components/ChatSection";
import InvoiceSection from "./components/InvoiceSection";
import GeneralConsultation from "@/data/models/consultation/response/general_consultation";
import GeneralChatSection from "./components/GeneralChatSection";

export default function ConsultationPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const [selectedConsultation, setSelectedConsultation] =
    useState<Consultation>();
  const [consultations, setConsultations] = useState<Consultation[]>();

  const [selectedGeneralConsultation, setSelectedGeneralConsultation] =
    useState<GeneralConsultation>();
  const [generalConsultations, setGeneralConsultations] =
    useState<GeneralConsultation[]>();

  // Track if fetching is in progress to prevent multiple simultaneous fetches
  const [isFetchingConsultations, setIsFetchingConsultations] = useState(false);
  const [isFetchingGeneralConsultations, setIsFetchingGeneralConsultations] =
    useState(false);

  // Refs to manage mounted state and prevent memory leaks
  const isMounted = useRef(true);

  const fetchConsultations = useCallback(async () => {
    // Prevent multiple simultaneous fetches
    if (isFetchingConsultations) return;

    try {
      setIsFetchingConsultations(true);
      const { data, error } = await supabase
        .from(StorageKey.CEREMONY_CONSULTATION)
        .select();

      if (error) {
        console.error("Error fetching consultations:", error);
        return;
      }

      if (isMounted.current && data && data.length > 0) {
        setConsultations(data as Consultation[]);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setIsFetchingConsultations(false);
    }
  }, [isFetchingConsultations]);

  const fetchGeneralConsultations = useCallback(async () => {
    // Prevent multiple simultaneous fetches
    if (isFetchingGeneralConsultations) return;

    try {
      setIsFetchingGeneralConsultations(true);
      const { data, error } = await supabase
        .from(StorageKey.GENERAL_CONSULTATION)
        .select();

      if (error) {
        console.error("Error fetching general consultations:", error);
        return;
      }

      if (isMounted.current && data && data.length > 0) {
        setGeneralConsultations(data as GeneralConsultation[]);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setIsFetchingGeneralConsultations(false);
    }
  }, [isFetchingGeneralConsultations]);

  useEffect(() => {
    // Fetch initial data
    fetchConsultations();
    fetchGeneralConsultations();

    // Cleanup function
    return () => {
      isMounted.current = false;
    };
  }, []); // Empty dependency array means this runs only once on mount

  // Optional: Add polling with reduced frequency if needed
  useEffect(() => {
    const pollInterval = setInterval(() => {
      fetchConsultations();
      fetchGeneralConsultations();
    }, 10000); // 10 seconds, much less frequent than before

    return () => clearInterval(pollInterval);
  }, [
    consultations,
    generalConsultations,
    fetchConsultations,
    fetchGeneralConsultations,
  ]);

  const renderContent = () => {
    if (!selectedConsultation && !selectedGeneralConsultation) {
      return (
        <div className="flex flex-row flex-1 items-center justify-center">
          <p className="text-gray-400">
            Silahkan pilih Konsultasi yang ingin diproses!
          </p>
        </div>
      );
    }

    if (selectedConsultation) {
      return (
        <>
          <ChatSection consultation={selectedConsultation} />
          <InvoiceSection
            ceremonyServiceId={selectedConsultation?.ceremonyServiceId ?? 0}
            consultation={selectedConsultation}
          />
        </>
      );
    }

    return <GeneralChatSection consultation={selectedGeneralConsultation} />;
  };

  return (
    <div className="flex bg-white rounded-lg border">
      <SidebarConsultation
        consultations={consultations}
        selectedConsultation={selectedConsultation}
        setSelectedConsultation={setSelectedConsultation}
        // GENERAL
        generalConsultations={generalConsultations}
        selectedGeneralConsultation={selectedGeneralConsultation}
        setSelectedGeneralConsultation={setSelectedGeneralConsultation}
      />
      {renderContent()}
    </div>
  );
}
