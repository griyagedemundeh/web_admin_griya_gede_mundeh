import CeremonyHistory from "@/data/models/ceremony/response/ceremony_history";
import { formatDateOnly, formatTimeOnly, getCountdown } from "@/utils";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import React, { ReactElement, useEffect, useState } from "react";

interface ICeremonyCardProps {
  ceremonyHistory: CeremonyHistory;
}

const CountDown = ({ date }: { date: string }): ReactElement => {
  const [countDown, setCountDown] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown(getCountdown(date));

      if (countDown === "Hari Ini") {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countDown, date]);

  return <p className="font-semibold">{countDown}</p>;
};

const CeremonyCard = ({ ceremonyHistory }: ICeremonyCardProps) => {
  let statusColor: string;
  let bgColor: string;
  let borderColor: string;
  let dotColor: string;

  switch (ceremonyHistory.status) {
    case "onProgress":
      statusColor = "primary1"; // Text color
      bgColor = "yellow-300"; // Background color
      borderColor = "primary1"; // Border color
      dotColor = "primary1"; // Dot color
      break;
    case "onGoing":
      statusColor = "blue"; // Text color
      bgColor = "blue-100"; // Background color
      borderColor = "blue-500"; // Border color
      dotColor = "blue-500"; // Dot color
      break;
    default:
      statusColor = "gray"; // Default text color
      bgColor = "gray-100"; // Default background color
      borderColor = "gray-400"; // Default border color
      dotColor = "gray-400"; // Default dot color
  }

  return (
    <div className="bg-white rounded-xl mx-auto my-4 hover:bg-yellow-50 hover:cursor-pointer flex-shrink-0 shadow-md w-1/3">
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-row space-x-1 w-1/2 items-center">
            <MapPinIcon width={20} height={20} color="gray" />
            <p className="text-xs text-gray-500 text-ellipsis line-clamp-1 w-64">
              {ceremonyHistory.ceremonyAddress}
            </p>
          </div>
          <div
            className={`text-sm text-${statusColor}-500 bg-${bgColor} py-1 px-3 rounded-full border-2 border-${borderColor} font-bold flex flex-row items-center`}
          >
            <div className={`rounded-full h-2 w-2 bg-${dotColor}`}></div>
            <p className="ml-1 text-xs">{ceremonyHistory.status}</p>
          </div>
        </div>
        <div className="mb-2 pt-4">
          <h2 className="text-sm font-semibold text-gray-700">
            {ceremonyHistory.ceremonyMember.user.fullName}
          </h2>
          <p className="text-xl font-bold text-ellipsis line-clamp-1">
            {ceremonyHistory.title}
          </p>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <div className="flex items-center mr-4 space-x-1">
            <CalendarIcon height={16} width={16} color="gray" />
            <p className="text-xs">
              {formatDateOnly(ceremonyHistory.ceremonyDate)}
            </p>
          </div>
          <div className="flex items-center mr-4 space-x-1">
            <ClockIcon height={16} width={16} color="gray" />
            <p className="text-xs">
              {formatTimeOnly(ceremonyHistory.ceremonyDate)}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-100 my-4" style={{ height: 2 }}></div>
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <CountDown date={ceremonyHistory.ceremonyDate} />
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
