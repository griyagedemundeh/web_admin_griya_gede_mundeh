import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const CeremonyCard = () => {
  return (
    <div className="bg-white rounded-xl mx-auto my-4 hover:bg-yellow-50 hover:cursor-pointer flex-shrink-0 shadow-md">
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-row space-x-1 w-1/2 items-center">
            <MapPinIcon width={20} height={20} color="gray" />
            <p className="text-xs text-gray-500 text-ellipsis line-clamp-1">
              Jl. Kecubung, Semarapura Kelod, Klungkung
            </p>
          </div>
          <div className="text-sm text-blue-500 bg-blue-100 py-1 px-3 rounded-full border-2 border-blue-500 font-bold flex flex-row items-center">
            <div className="rounded-full h-2 w-2 bg-blue-500"></div>
            <p className="ml-1 text-xs">Diproses</p>
          </div>
        </div>
        <div className="mb-2 pt-4">
          <h2 className="text-sm font-semibold text-gray-700">I Gede Maja</h2>
          <p className="text-xl font-bold text-ellipsis line-clamp-1">
            Upacara Mecaru Bapak Andik
          </p>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <div className="flex items-center mr-4 space-x-1">
            <CalendarIcon height={16} width={16} color="gray" />
            <p className="text-xs">30 Juni 2024</p>
          </div>
          <div className="flex items-center mr-4 space-x-1">
            <ClockIcon height={16} width={16} color="gray" />
            <p className="text-xs">18:30 WITA</p>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-100 my-4" style={{ height: 2 }}></div>
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">12 Jam 45 Menit 30 Detik</span>
          <button className="bg-primary1 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-primary2 flex flex-row items-center">
            <p>Selengkapnya</p>
            <ChevronRightIcon height={20} width={20} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CeremonyCard;