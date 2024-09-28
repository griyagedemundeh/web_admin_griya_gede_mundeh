"use client";

import { useState } from "react";
import { Locale } from "../../dictionaries";
import PrimaryInput from "@/components/input/PrimaryInput";
import IconButton from "@/components/button/IconButton";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function ConsultationPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <div>
      <div className="p-2">
        <div className="flex bg-white shadow-lg rounded-lg">
          <Sidebar />
          <ChatSection />
          <InvoiceSection />
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  const contacts = [
    { name: "Kadek Sumanggala", lastMessage: "Okok min, terimakasih" },
    { name: "Larry Witting", lastMessage: "Magn... etc" },
    // Add more contacts here
  ];

  return (
    <div className="w-1/4 border-r border-gray-300 p-4">
      <PrimaryInput
        onChange={(e) => {}}
        value={""}
        placeholder="Cari chat"
        className="mb-6"
        trailing={
          <IconButton
            icon={MagnifyingGlassIcon}
            onClick={() => {}}
            className="absolute top-1 right-1"
          />
        }
      />
      <div className=" mt-12">
        {contacts.map((contact, index) => (
          <div
            key={contact.name}
            className="flex flex-row items-center space-x-4 hover:cursor-pointer hover:bg-yellow-50 hover:text-primary1 p-4 rounded-lg"
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
    { sender: "user", content: "Hi, saya tertarik dengan paket 2 ..." },
    { sender: "admin", content: "Halo kakak😊. Paket 2 ini mencakup ..." },
    {
      sender: "user",
      content: "Ya, saya berminat menambahkan layanan dokumentasi.",
    },
    { sender: "admin", content: "Untuk total biaya ..." },
  ]);

  return (
    <div className="w-1/2 flex flex-col p-4">
      <div className="flex-grow space-y-4 overflow-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.sender === "admin"
                ? "bg-blue-100 text-left"
                : "bg-gray-100 text-right"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="flex items-center border-t pt-4">
        <input
          type="text"
          placeholder="Ketik pesan..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <button className="ml-4 p-2 bg-green-500 text-white rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
}

function InvoiceSection() {
  return (
    <div className="w-1/4 bg-gray-50 p-4">
      <h3 className="text-lg font-bold mb-4">Sudah Deal?</h3>
      <p className="text-sm text-gray-500 mb-4">
        Ayo Buatkan Invoice Untuk User
      </p>
      <button className="w-full py-2 bg-orange-500 text-white rounded-lg">
        Buat Invoice
      </button>
    </div>
  );
}
