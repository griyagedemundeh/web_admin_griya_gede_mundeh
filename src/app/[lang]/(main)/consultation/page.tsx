"use client";

import { useEffect, useState } from "react";
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
import Message from "@/data/models/consultation/message/response/message";

export default function ConsultationPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const [open, setOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<Message>();
  const [chats, setChats] = useState();

  const getChats = async () => {
    const { data: consultations } = await supabase
      .from(StorageKey.CEREMONY_CONSULTATION_MESSAGE)
      .select();

    if ((consultations?.length ?? 0) > 1) {
      setChats(consultations as any);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  // console.log("====================================");
  // console.log("DATA CHAT --->>>", chats);
  // console.log("====================================");

  return (
    <>
      <div className="flex bg-white rounded-lg border">
        <Sidebar />
        <ChatSection />
        <InvoiceSection setOpen={setOpen} />
      </div>
      {/* Dialog Add Transaction*/}
      {/* <TransactionModal
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
      /> */}
    </>
  );
}

function Sidebar() {
  const contacts = [
    { name: "Kadek Sumanggala", lastMessage: "Okok min, terimakasih" },
    { name: "Larry Witting", lastMessage: "Magn... etc" },
    { name: "Larry Witting", lastMessage: "Magn... etc" },
    { name: "Larry Witting", lastMessage: "Magn... etc" },
    { name: "Larry Witting", lastMessage: "Magn... etc" },
    { name: "Larry Witting", lastMessage: "Magn... etc" },
    { name: "Larry Witting", lastMessage: "Magn... etc" },
    { name: "Larry Witting", lastMessage: "Magn... etc" },
    { name: "Larry Witting", lastMessage: "Magn... etc" },
    { name: "Larry Witting", lastMessage: "Magn... etc" },
    { name: "Larry Witting", lastMessage: "Magn... etc" },
    { name: "Larry Witting", lastMessage: "Magn... etc" },
    { name: "Larry Witting", lastMessage: "Magn... etc" },
    { name: "Larry Witting", lastMessage: "Magn... etc" },
    { name: "Larry Witting", lastMessage: "Magn... etc" },
    { name: "Larry Witting", lastMessage: "Magn... etc" },
    // Add more contacts here
  ];

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
        {contacts.map((contact, index) => (
          <div
            key={contact.name}
            className={`  flex flex-row items-center space-x-4 hover:cursor-pointer hover:bg-yellow-50 p-4 rounded-lg`}
          >
            <Image
              alt=""
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="h-10 w-10 rounded-full bg-gray-50"
              height={40}
              width={40}
            />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{contact.name}</span>
              <span className="text-xs text-gray-500">
                {contact.lastMessage}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatSection() {
  const [messages] = useState([
    {
      sender: "user",
      content:
        "Hi, saya tertarik dengan paket 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet tenetur explicabo, commodi illo dolorum inventore a sunt accusantium amet nesciunt provident saepe velit doloremque neque veritatis! Adipisci molestias minus autem! ...",
    },
    {
      sender: "admin",
      content:
        "Halo kakak😊. Paket 2 ini mencakup Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet tenetur explicabo, commodi illo dolorum inventore a sunt accusantium amet nesciunt provident saepe velit doloremque neque veritatis! Adipisci molestias minus autem!...",
    },
    {
      sender: "user",
      content:
        "Ya, saya berminat menambahkan layanan dokumentasi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet tenetur explicabo, commodi illo dolorum inventore a sunt accusantium amet nesciunt provident saepe velit doloremque neque veritatis! Adipisci molestias minus autem!",
    },
    { sender: "admin", content: "Untuk total biaya ..." },
  ]);

  return (
    <div className="w-1/2 flex flex-col" style={{ height: "36rem" }}>
      <div className="flex flex-row items-center space-x-4 p-4 border-b border-gray-300">
        <Image
          alt=""
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="h-10 w-10 rounded-full bg-gray-50"
          height={40}
          width={40}
        />
        <div className="flex flex-col">
          <span className="font-semibold text-sm">{"Samy"}</span>
          <span className="text-xs text-gray-500">{"online"}</span>
        </div>
      </div>
      <div className="flex-grow space-y-10 overflow-auto pl-4 pr-4 pt-4 bg-gray-50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-200 scrollbar-track-white">
        {messages.map((message, index) => (
          <div key={index} className="flex-col">
            <div
              className={`p-3 ${
                message.sender === "admin"
                  ? "bg-white ring-1 ring-inset ring-gray-300 mr-40 rounded-tr-xl rounded-br-xl rounded-bl-xl"
                  : "bg-primary1 ml-40 rounded-tl-xl rounded-br-xl rounded-bl-xl"
              }`}
            >
              {message.content}
            </div>
            <p
              className={`text-xs py-2 text-gray-500 ${
                message.sender === "admin" ? "" : "text-right"
              }`}
            >
              13:30 WITA
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center border-t p-4 ">
        <PrimaryInput
          onChange={(e) => {}}
          value={""}
          placeholder="Ketik pesan..."
          className="w-full"
          trailing={
            <IconButton
              icon={PaperClipIcon}
              onClick={() => {}}
              className="absolute top-1 right-1"
            />
          }
        />
        <button className="ml-4 p-1 text-white rounded-full bg-primary1">
          <IconButton
            icon={PaperAirplaneIcon}
            onClick={() => {}}
            className="p-2"
            color="primary2"
            classNameIcon="text-white"
          />
        </button>
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
