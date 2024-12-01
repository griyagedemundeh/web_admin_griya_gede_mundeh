import IconButton from "@/components/button/IconButton";
import OutlinePrimaryButton from "@/components/button/OutlinePrimaryButton";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";
import StorageKey from "@/constants/storage_key";
import MessageRequest from "@/data/models/consultation/message/request/message_request";
import Message from "@/data/models/consultation/message/response/message";
import Consultation from "@/data/models/consultation/response/consultation";
import { useCentralStore } from "@/store";
import { formatTimeAgo } from "@/utils";
import { supabase } from "@/utils/supabase";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";

import Image from "next/image";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";

interface IChatSectionProps {
  consultation: Consultation | undefined;
}

function ChatSection({ consultation }: IChatSectionProps) {
  const [chats, setChats] = useState<Message[]>([]);
  const { invoice, setInvoice } = useCentralStore();

  // Use a ref to track if invoice processing is in progress
  const isProcessingInvoice = useRef<boolean>(false);

  // Memoize initial message request to prevent unnecessary re-renders
  const initialMessageRequest = useMemo<MessageRequest>(
    () => ({
      consultationId: consultation?.consultationId ?? 0,
      isAdmin: true,
      createdAt: new Date().toISOString(),
      message: "",
      messageType: "default",
      invoiceId: null,
      userId: consultation?.userId ?? 0,
      ceremonyPackageId: consultation?.ceremonyPackageId,
      ceremonyServiceId: consultation?.ceremonyServiceId,
    }),
    [consultation]
  );

  const [messageRequest, setMessageRequest] = useState<MessageRequest>(
    initialMessageRequest
  );

  // Memoized getChats to prevent unnecessary recreations
  const getChats = useCallback(async () => {
    const { data: consultations } = await supabase
      .from(StorageKey.CEREMONY_CONSULTATION_MESSAGE)
      .select()
      .eq("consultationId", consultation?.consultationId)
      .order("id", { ascending: false });

    if (consultations?.length) {
      setChats(consultations);
    }
  }, [consultation?.consultationId]);

  // Fetch initial chats
  useEffect(() => {
    getChats();
  }, [getChats]);

  // Separate function to handle invoice sending with minimal state interactions
  const processInvoice = useCallback(async () => {
    // Prevent multiple simultaneous invoice processings
    if (isProcessingInvoice.current || invoice === undefined) return;

    try {
      isProcessingInvoice.current = true;

      const invoiceMessage: MessageRequest = {
        ...initialMessageRequest,
        invoiceId: invoice.id,
        messageType: "invoice",
        message: "Invoice sudah dibuat!",
        // address
      };

      // Immediately set invoice to undefined to prevent re-triggers
      setInvoice(undefined);

      await supabase
        .from(StorageKey.CEREMONY_CONSULTATION_MESSAGE)
        .insert(invoiceMessage);

      // Reset message request and refresh chats
      setMessageRequest(initialMessageRequest);
      await getChats();
    } catch (error) {
      console.error("Error processing invoice:", error);
    } finally {
      // Always reset the processing flag
      isProcessingInvoice.current = false;
    }
  }, [invoice, initialMessageRequest, setInvoice, getChats]);

  // Trigger invoice processing when invoice changes
  useEffect(() => {
    if (invoice !== undefined) {
      processInvoice();
    }
  }, [invoice, processInvoice]);

  // Memoized send message functions to prevent unnecessary recreations
  const sendMessage = useCallback(async () => {
    if (messageRequest.message.trim().length === 0) return;

    await supabase
      .from(StorageKey.CEREMONY_CONSULTATION_MESSAGE)
      .insert(messageRequest);

    setMessageRequest(initialMessageRequest);
    getChats();
  }, [messageRequest, getChats, initialMessageRequest]);

  return (
    <div className="w-1/2 flex flex-col" style={{ height: "40rem" }}>
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
              {chat.messageType === "default" && <p>{chat.message}</p>}
              {chat.messageType === "invoice" && (
                <div className="flex flex-col">
                  <div className="">
                    <p className="font-extrabold">Tagihan Upacara</p>
                    <p>{"Mebayuh Bali pak kadek"}</p>
                  </div>

                  <div className="my-4">
                    <p>💸Harga: Rp2.500.000</p>
                    <p>📅Tanggal dan Waktu: 23 Juli 2025 - 20.30</p>
                    <p>📍Lokasi: Jalan jalan</p>
                  </div>

                  <div>
                    <OutlinePrimaryButton label="Detail" onClick={() => {}} />
                  </div>
                </div>
              )}
            </div>
            <p
              className={`text-xs py-2 text-gray-500 ${
                !chat.isAdmin ? "" : "text-right"
              }`}
            >
              {formatTimeAgo(chat.createdAt)}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center border-t p-4 ">
        <PrimaryTextArea
          value={invoice ? "" : messageRequest.message}
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

export default ChatSection;