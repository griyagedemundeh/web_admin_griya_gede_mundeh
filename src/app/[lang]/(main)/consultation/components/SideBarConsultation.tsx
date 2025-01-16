import { useCallback, useEffect, useRef, useState } from "react";
import Consultation from "@/data/models/consultation/response/consultation";
import CeremonyConsultation from "./CeremonyConsultation";
import PrimaryInput from "@/components/input/PrimaryInput";
import IconButton from "@/components/button/IconButton";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import GeneralConsultationSection from "./GeneralConsultation";
import GeneralConsultation from "@/data/models/consultation/response/general_consultation";
import StorageKey from "@/constants/storage_key";
import { supabase } from "@/utils/supabase";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function SidebarConsultation({
  consultations,
  selectedConsultation,
  setSelectedConsultation,
  generalConsultations,
  selectedGeneralConsultation,
  setSelectedGeneralConsultation,
}: {
  consultations: Consultation[] | undefined;
  selectedConsultation: Consultation | undefined;
  setSelectedConsultation: (value: Consultation | undefined) => void;
  generalConsultations: GeneralConsultation[] | undefined;
  selectedGeneralConsultation: GeneralConsultation | undefined;
  setSelectedGeneralConsultation: (
    value: GeneralConsultation | undefined
  ) => void;
}) {
  const [activeTab, setActiveTab] = useState("ceremony-consultation");
  const [isFetchingIndicator, setIsFetchingIndicator] =
    useState<boolean>(false);
  const [tabOptions, setTabOptions] = useState([
    { name: "Upacara Agama", value: "ceremony-consultation", isNew: false },
    { name: "Umum", value: "general-consultation", isNew: false },
  ]);

  const isMounted = useRef(true);

  const fetchIndicator = useCallback(async () => {
    if (isFetchingIndicator) return;
    setIsFetchingIndicator(true);

    try {
      const [ceremonyResponse, generalResponse] = await Promise.all([
        supabase
          .from(StorageKey.CEREMONY_CONSULTATION_INDICATOR)
          .select()
          .eq("id", 1)
          .single(),
        supabase
          .from(StorageKey.GENERAL_CONSULTATION_INDICATOR)
          .select()
          .eq("id", 1)
          .single(),
      ]);

      if (isMounted.current) {
        setTabOptions([
          {
            name: "Upacara Agama",
            value: "ceremony-consultation",
            isNew: ceremonyResponse.data?.isNew ?? false,
          },
          {
            name: "Umum",
            value: "general-consultation",
            isNew: generalResponse.data?.isNew ?? false,
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching indicators:", error);
    } finally {
      setIsFetchingIndicator(false);
    }
  }, []);

  useEffect(() => {
    fetchIndicator();
    return () => {
      isMounted.current = false;
    };
  }, [fetchIndicator]);

  useEffect(() => {
    const pollInterval = setInterval(fetchIndicator, 3000);
    return () => clearInterval(pollInterval);
  }, [fetchIndicator]);

  const renderContent = () => {
    switch (activeTab) {
      case "ceremony-consultation":
        return (
          <CeremonyConsultation
            consultations={consultations}
            selectedCeremonyConsultation={selectedConsultation}
            setSelectedCeremonyConsultation={setSelectedConsultation}
          />
        );
      case "general-consultation":
        return (
          <GeneralConsultationSection
            consultations={generalConsultations}
            selectedGeneralConsultation={selectedGeneralConsultation}
            setSelectedGeneralConsultation={setSelectedGeneralConsultation}
          />
        );
      default:
        return null;
    }
  };

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
    if (tabValue === "general-consultation") {
      setSelectedConsultation(undefined);
    } else if (tabValue === "ceremony-consultation") {
      setSelectedGeneralConsultation(undefined);
    }
  };

  return (
    <div className="w-1/4 border-r border-gray-300">
      <div className="p-[1.12rem]">
        <PrimaryInput
          onChange={(e) => {}}
          value=""
          placeholder="Cari chat"
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
      <div className="px-4 w-full border-t-[1.5px] pt-2 border-gray-300">
        <div className="hidden sm:block">
          <div className="border-gray-200">
            <nav aria-label="Tabs" className="-mb-px flex space-x-8">
              {tabOptions.map((tab) => (
                <a
                  key={tab.value}
                  onClick={() => handleTabClick(tab.value)}
                  aria-current={activeTab === tab.value ? "page" : undefined}
                  className={classNames(
                    activeTab === tab.value
                      ? "border-primary1 text-primary1"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 px-1 py-2 text-sm font-medium cursor-pointer w-full text-center relative"
                  )}
                >
                  <p>{tab.name}</p>
                  {tab.isNew && (
                    <div className="absolute top-0 right-0 h-2 w-2 bg-rose-500 rounded-full"></div>
                  )}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {renderContent()}
    </div>
  );
}

export default SidebarConsultation;
