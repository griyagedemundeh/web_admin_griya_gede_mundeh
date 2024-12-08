import Consultation from "@/data/models/consultation/response/consultation";
import { useState } from "react";
import CeremonyConsultation from "./CeremonyConsultation";
import PrimaryInput from "@/components/input/PrimaryInput";
import IconButton from "@/components/button/IconButton";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import GeneralConsultationSection from "./GeneralConsultation";
import GeneralConsultation from "@/data/models/consultation/response/general_consultation";

const tabOptions = [
  { name: "Upacara Agama", value: "ceremony-consultation" },
  { name: "Umum", value: "general-consultation" },
];

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

  // GENERAL
  generalConsultations: GeneralConsultation[] | undefined;
  selectedGeneralConsultation: GeneralConsultation | undefined;
  setSelectedGeneralConsultation: (
    value: GeneralConsultation | undefined
  ) => void;
}) {
  const [activeTab, setActiveTab] = useState("ceremony-consultation");
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
        return <div></div>;
    }
  };

  return (
    <div className="w-1/4 border-r border-gray-300">
      <div className="p-[1.12rem]">
        <PrimaryInput
          onChange={(e) => {}}
          value={""}
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
                  onClick={() => {
                    setActiveTab(tab.value);

                    if (tab.value === "general-consultation") {
                      setSelectedConsultation(undefined);
                    }

                    if (tab.value === "ceremony-consultation") {
                      setSelectedGeneralConsultation(undefined);
                    }
                  }}
                  aria-current={activeTab === tab.value ? "page" : undefined}
                  className={classNames(
                    activeTab === tab.value
                      ? "border-primary1 text-primary1"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 px-1 py-2 text-sm font-medium cursor-pointer w-full text-center"
                  )}
                >
                  {tab.name}
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
