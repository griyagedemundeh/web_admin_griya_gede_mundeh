import IconButton from "@/components/button/IconButton";
import OutlinePrimaryButton from "@/components/button/OutlinePrimaryButton";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";
import StorageKey from "@/constants/storage_key";
import MessageRequest from "@/data/models/consultation/message/request/message_request";
import Message from "@/data/models/consultation/message/response/message";
import Consultation from "@/data/models/consultation/response/consultation";
import { useCentralStore } from "@/store";
import { formatDateIndonesia, formatRupiah, formatTimeAgo } from "@/utils";
import { supabase } from "@/utils/supabase";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import DetailTransactionModal from "../../transaction/components/DetailTransactionModal";
import ApiResponse from "@/data/models/base/api-base-response";
import Invoice from "@/data/models/transaction/response/invoice";
import { TransactionService } from "@/data/services/transaction/transaction_service";
import { AxiosError } from "axios";

interface IChatSectionProps {
  consultation: Consultation | undefined;
}

function ChatSection({ consultation }: IChatSectionProps) {
  const [chats, setChats] = useState<Message[]>([]);
  const { invoice, setInvoice } = useCentralStore();
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [detailInvoice, setDetailInvoice] = useState<Invoice>();

  // Use a ref to track if invoice processing is in progress
  const isProcessingInvoice = useRef<boolean>(false);

  // Memoize initial message request to prevent unnecessary re-renders
  const initialMessageRequest = useMemo<MessageRequest>(
    () => ({
      consultationId: consultation?.consultationId as number,
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
    // If no consultation ID, reset chats to an empty array
    if (!consultation?.consultationId) {
      setChats([]);
      return;
    }

    const { data: consultations } = await supabase
      .from(StorageKey.CEREMONY_CONSULTATION_MESSAGE)
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

  // Separate function to handle invoice sending with minimal state interactions
  const processInvoice = useCallback(async () => {
    // Prevent multiple simultaneous invoice processings
    if (isProcessingInvoice.current || invoice === undefined) return;

    try {
      isProcessingInvoice.current = true;

      const invoiceMessage: MessageRequest = {
        ...messageRequest,
        consultationId: consultation?.consultationId as number,
        invoiceId: invoice.id,
        messageType: "invoice",
        message: "Invoice sudah dibuat!",
        ceremonyDate: invoice.invoiceCeremonyHistory.ceremonyDate,
        address: invoice.invoiceCeremonyHistory.ceremonyAddress,
        paymentUrl: invoice.paymentUrl ?? "",
        title: invoice.invoiceCeremonyHistory.title,
        totalPrice: `${invoice.totalPrice}`,
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
  }, [
    invoice,
    initialMessageRequest,
    setInvoice,
    getChats,
    consultation?.consultationId,
  ]);

  // Trigger invoice processing when invoice changes
  useEffect(() => {
    if (invoice !== undefined) {
      processInvoice();
    }
  }, [invoice]);

  // Memoized send message functions to prevent unnecessary recreations
  const sendMessage = useCallback(async () => {
    if (messageRequest.message.trim().length === 0) return;

    await supabase.from(StorageKey.CEREMONY_CONSULTATION_MESSAGE).insert({
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

  const getDetailInvoice = async ({
    id,
  }: {
    id: string;
  }): Promise<ApiResponse<Invoice>> => {
    const authService = new TransactionService();
    const TAG_ERROR = "Error during :";

    setIsLoading(true);

    const response = await authService
      .getDetailInvoice({ id })
      .then(async (value) => {
        setOpenDetail(true);
        return value;
      })
      .catch((error: AxiosError<ApiResponse<Invoice>> | unknown) => {
        console.error("========================");
        console.error(`${TAG_ERROR} GET Detail INVOICE `, error);
        console.error("========================");
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
    return response;
  };

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
                    <p>{chat.title}</p>
                  </div>

                  <div className="my-4">
                    <p>
                      💸Harga: {formatRupiah(parseInt(chat.totalPrice ?? "0"))}
                    </p>
                    <p>
                      📅Tanggal dan Waktu:
                      {formatDateIndonesia(chat.ceremonyDate ?? "")}
                    </p>
                    <p>📍Lokasi: {chat.address}</p>
                  </div>

                  <div key={chat.id}>
                    <DetailTransactionModal
                      key={chat.id}
                      title={`Detail - ${chat?.invoiceId}`}
                      invoice={detailInvoice}
                      open={openDetail}
                      setOpen={setOpenDetail}
                      child={
                        <OutlinePrimaryButton
                          label="Detail"
                          key={chat.id}
                          loading={isLoading}
                          onClick={async () => {
                            const response = await getDetailInvoice({
                              id: chat?.invoiceId ?? "",
                            });
                            setDetailInvoice(response.data);
                          }}
                        />
                      }
                    />
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

export default ChatSection;
