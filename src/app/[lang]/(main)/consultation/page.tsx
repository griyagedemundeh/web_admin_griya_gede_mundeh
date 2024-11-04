"use client";

import { useEffect, useRef, useState } from "react";
import { Locale } from "../../dictionaries";
import PrimaryInput from "@/components/input/PrimaryInput";
import IconButton from "@/components/button/IconButton";
import { MagnifyingGlassIcon, PaperClipIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Images from "@/constants/images";
import {
  DocumentCheckIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import TransactionModal from "../transaction/components/TransactionModal";
import { supabase } from "@/utils/supabase";
import StorageKey from "@/constants/storage_key";
import Consultation from "@/data/models/consultation/response/consultation";
import Message from "@/data/models/consultation/message/response/message";
import MessageRequest from "@/data/models/consultation/message/request/message_request";
import { formatTimeAgo } from "@/utils";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";

export default function ConsultationPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const [open, setOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] =
    useState<Consultation>();
  const [consultations, setConsultations] = useState<Consultation[]>();

  const getConsultations = async () => {
    const { data: consultations } = await supabase
      .from(StorageKey.CONSULTATION)
      .select();

    if ((consultations?.length ?? 0) >= 1) {
      setConsultations(consultations as any);
    }
  };

  useEffect(() => {
    getConsultations();
  }, []);

  return (
    <>
      <div className="flex bg-white rounded-lg border">
        <Sidebar
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
            <InvoiceSection setOpen={setOpen} />
          </>
        )}
      </div>
      {/* Dialog Add Transaction*/}
      <TransactionModal
        open={open}
        setOpen={setOpen}
        title="Tambah Transaksi"
        bottomAction={
          <PrimaryWithIconButton
            label="Buat Invoice"
            onClick={() => {}}
            icon={DocumentCheckIcon}
          />
        }
      />
    </>
  );
}

function Sidebar({
  consultations,
  selectedConsultation,
  setSelectedConsultation,
}: {
  consultations: Consultation[] | undefined;
  selectedConsultation: Consultation | undefined;
  setSelectedConsultation: (value: Consultation) => void;
}) {
  return (
    <div className="w-1/4 border-r border-gray-300">
      <PrimaryInput
        onChange={(e) => {}}
        value={""}
        placeholder="Cari chat"
        className="m-4"
        trailing={
          <IconButton
            icon={MagnifyingGlassIcon}
            onClick={() => {}}
            className="absolute top-1 right-1"
          />
        }
      />
      <div
        className="mt-8 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-200 scrollbar-track-white"
        style={{ height: "30rem" }}
      >
        {consultations?.map((consultation, index) => (
          <div
            onClick={() => {
              setSelectedConsultation(consultation);
            }}
            key={`${consultation.id}`}
            className={` ${
              selectedConsultation?.id === consultation.id ? "bg-yellow-50" : ""
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
    </div>
  );
}

function ChatSection({
  consultation,
}: {
  consultation: Consultation | undefined;
}) {
  const [chats, setChats] = useState<Message[]>([]);

  const [messageRequest, setMessageRequest] = useState<MessageRequest>({
    consultationId: consultation?.consultationId ?? 0,
    isAdmin: true,
    createdAt: new Date().toISOString(),
    message: "",
    messageType: "default",
    userId: consultation?.userId ?? 0,
    ceremonyPackageId: consultation?.ceremonyPackageId,
    ceremonyServiceId: consultation?.ceremonyServiceId,
  });

  const getChats = async () => {
    const { data: consultations } = await supabase
      .from(StorageKey.CEREMONY_CONSULTATION_MESSAGE)
      .select()
      .eq("consultationId", consultation?.consultationId)
      .order("id", { ascending: false });

    if (consultations?.length) {
      setChats(consultations);
    }
  };

  useEffect(() => {
    getChats();
  }, [consultation?.consultationId, chats]);

  const sendMessage = async () => {
    if (messageRequest.message.trim().length === 0) return;

    await supabase
      .from(StorageKey.CEREMONY_CONSULTATION_MESSAGE)
      .insert(messageRequest);

    setMessageRequest((prev) => ({
      ...prev,
      message: "",
      createdAt: new Date().toISOString(),
    }));

    getChats();
  };

  return (
    <div className="w-1/2 flex flex-col" style={{ height: "36rem" }}>
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
      <div className="flex flex-col-reverse space-y-6 overflow-auto pl-4 pr-4 pt-4 bg-gray-50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-200 scrollbar-track-white">
        {chats.map((chat) => (
          <div key={chat.id} className="flex-col">
            <div
              className={`p-3 ${
                !chat.isAdmin
                  ? "bg-white ring-1 ring-inset ring-gray-300 mr-40 rounded-tr-xl rounded-br-xl rounded-bl-xl"
                  : "bg-primary1 ml-40 rounded-tl-xl rounded-br-xl rounded-bl-xl"
              }`}
            >
              {chat.message}
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

interface InvoiceSectionProps {
  setOpen: (value: boolean) => void;
}

function InvoiceSection({ setOpen }: InvoiceSectionProps) {
  return (
    <div className="w-1/4 p-4 border-l border-gray-300 rounded-tr-xl rounded-br-xl flex flex-col items-center justify-center">
      <Image
        alt=""
        src={Images.icEmptyInvoice}
        className="w-52"
        height={40}
        width={40}
      />
      <h3 className="text-lg font-bold">Sudah Deal?</h3>
      <p className="text-sm text-gray-500 mb-4">
        Ayo Buatkan Invoice Untuk User
      </p>
      <PrimaryWithIconButton
        label="Buat Invoice"
        className="w-full"
        onClick={() => {
          setOpen(true);
        }}
        icon={DocumentCheckIcon}
      />
    </div>
  );
}
