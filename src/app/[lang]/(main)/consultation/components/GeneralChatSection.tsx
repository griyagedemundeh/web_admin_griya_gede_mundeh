import IconButton from "@/components/button/IconButton";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";
import StorageKey from "@/constants/storage_key";
import { formatTimeAgo } from "@/utils";
import { supabase } from "@/utils/supabase";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useEffect, useState, useCallback, useMemo } from "react";
import GeneralConsultation from "@/data/models/consultation/response/general_consultation";
import GeneralMessage from "@/data/models/consultation/message/response/general_message";
import GeneralMessageRequest from "@/data/models/consultation/message/request/general_message_request";

interface IGeneralChatSectionProps {
  consultation: GeneralConsultation | undefined;
}

function GeneralChatSection({ consultation }: IGeneralChatSectionProps) {
  const [chats, setChats] = useState<GeneralMessage[]>([]);

  // Memoize initial message request to prevent unnecessary re-renders
  const initialMessageRequest = useMemo<GeneralMessageRequest>(
    () => ({
      userId: consultation?.userId ?? 0,
      createdAt: new Date().toISOString(),
      consultationId: consultation?.consultationId ?? 0,
      message: "",
      isAdmin: true,
    }),
    [consultation]
  );

  const [messageRequest, setMessageRequest] = useState<GeneralMessageRequest>(
    initialMessageRequest
  );

  // Memoized getChats to prevent unnecessary recreations
  const getChats = useCallback(async () => {
    // If no consultation ID, reset chats to an empty array
    if (!consultation?.consultationId) {
      setChats([]);
      return;
    }

    const { data: consultations } = await supabase
      .from(StorageKey.GENERAL_CONSULTATION_MESSAGE)
      .select()
      .eq("consultationId", consultation.consultationId)
      .order("id", { ascending: false });

    // Always set the chats state, even if it's an empty array
    setChats(consultations || []);
  }, [consultation?.consultationId]);

  // Fetch initial chats
  useEffect(() => {
    getChats();
  }, [consultation?.consultationId, chats]);

  // Memoized send message functions to prevent unnecessary recreations
  const sendMessage = useCallback(async () => {
    if (messageRequest.message.trim().length === 0) return;

    await supabase.from(StorageKey.GENERAL_CONSULTATION_MESSAGE).insert({
      ...messageRequest,
      consultationId: consultation?.consultationId,
    });

    setMessageRequest(initialMessageRequest);
    getChats();
  }, [
    messageRequest,
    getChats,
    initialMessageRequest,
    consultation?.consultationId,
  ]);

  return (
    <div className="w-3/4 flex flex-col" style={{ height: "40rem" }}>
      <div className="flex flex-row items-center space-x-4 p-4 border-b border-gray-300">
        <Image
          alt={consultation?.userName ?? ""}
          src={consultation?.userPhoto ?? ""}
          className="h-10 w-10 rounded-full bg-gray-50"
          height={40}
          width={40}
        />
        <div className="flex flex-col">
          <span className="font-semibold text-sm">
            {consultation?.userName}
          </span>
        </div>
      </div>
      <div className="flex flex-col-reverse space-y-6 overflow-auto pl-4 pr-4 pt-4 bg-gray-50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-200 scrollbar-track-white h-full">
        {chats.map((chat) => (
          <div key={chat.id} className="flex-col">
            <div
              className={`p-3 ${
                !chat.isAdmin
                  ? "bg-white ring-1 ring-inset ring-gray-300 mr-40 rounded-tr-xl rounded-br-xl rounded-bl-xl"
                  : "bg-primary1 ml-40 rounded-tl-xl rounded-br-xl rounded-bl-xl text-white"
              }`}
            >
              {<p>{chat.message}</p>}
            </div>
            <p
              className={`text-xs py-2 text-gray-500 ${
                !chat.isAdmin ? "" : "text-right"
              }`}
            >
              {formatTimeAgo(chat.createdAt.toString())}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center border-t p-4 ">
        <PrimaryTextArea
          value={messageRequest.message}
          className="w-full"
          placeholder="Ketik pesan..."
          rows={2}
          onChange={(e) => {
            setMessageRequest({ ...messageRequest, message: e.target.value });
          }}
        />
        <div className="ml-4 p-1 text-white rounded-full bg-primary1">
          <IconButton
            icon={PaperAirplaneIcon}
            onClick={sendMessage}
            className="p-2"
            color="primary2"
            classNameIcon="text-white"
          />
        </div>
      </div>
    </div>
  );
}

export default GeneralChatSection;
