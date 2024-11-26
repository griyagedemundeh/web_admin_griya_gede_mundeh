import React, { useState } from "react";
import Modal from "@/components/modal/Modal";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import { DocumentCheckIcon } from "@heroicons/react/20/solid";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Invoice from "@/data/models/transaction/response/invoice";
import PrimaryInput from "@/components/input/PrimaryInput";
import { formatDateIndonesia, formatRupiah } from "@/utils";
import PrimaryTextArea from "@/components/input/PrimaryTextArea";
import PrimaryTextEditor from "@/components/input/PrimaryTextEditor";
import Images from "@/constants/images";
import Image from "next/image";
import { useTransaction } from "@/hooks/transaction/use_transaction";

interface DetailTransactionModalProps {
  title: string;
  invoice: Invoice;
}

const DetailTransactionModal = ({
  title,
  invoice,
}: DetailTransactionModalProps) => {
  const [openPayment, setOpenPayment] = useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState(false);

  const { updateStatusInvoice, isLoadingUpdateStatusInvoice } =
    useTransaction();

  return (
    <div>
      <IconBackgroundButton
        icon={InformationCircleIcon}
        colorBackground="blue"
        className="bg-blue-100"
        colorIcon="blue"
        onClick={() => {
          setOpenDetail(true);
        }}
      />
      <Modal title={title} isOpen={openDetail} setIsOpen={setOpenDetail}>
        <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
          <PrimaryInput
            label="Status Pembayaran"
            value={invoice.status ?? ""}
            className="w-full"
            disabled
          />
          <PrimaryInput
            label="Metode Pembayaran"
            value={invoice.paymentMethod ?? "-"}
            className="w-full"
            disabled
          />
          {invoice.invoiceCeremonyHistory?.ceremonyPackage?.name && (
            <PrimaryInput
              label="Paket"
              value={invoice.invoiceCeremonyHistory?.ceremonyPackage?.name}
              className="w-full"
              disabled
            />
          )}
          <PrimaryInput
            label="Total Harga"
            value={formatRupiah(invoice?.totalPrice) ?? ""}
            className="w-full"
            disabled
          />
          {/* 
          <PrimaryInput
            label="Tanggal Upacara"
            value={
              invoice?.createdAt
                ? formatDateIndonesia(
                    invoice?.createdAt
                  )
                : "-"
            }
            className="w-full"
            disabled
          /> */}

          {/* <PrimaryTextArea
            value={`${invoice.invoiceCeremonyHistory.ceremonyAddress}\n${
              invoice.invoiceCeremonyHistory.ceremonyAddressNote ?? ""
            }`}
            label="Alamat/Lokasi Upacara"
            disabled
            className="w-full"
          /> */}
          {/* <PrimaryTextEditor
            label="Deskripsi Upacara"
            value={invoice.invoiceCeremonyHistory.description}
            disabled
          />
          {invoice.invoiceCeremonyHistory.note && (
            <PrimaryTextArea
              value={`${invoice.invoiceCeremonyHistory.note}`}
              label="Catatan"
              disabled
              className="w-full"
            />
          )} */}

          <PrimaryInput
            label="Tanggal Pembuatan Invoice"
            value={
              invoice.createdAt ? formatDateIndonesia(invoice.createdAt) : "-"
            }
            className="w-full"
            disabled
          />
          <PrimaryInput
            label="Tanggal Dibayar/Lunas"
            value={
              invoice.paidAt
                ? formatDateIndonesia(invoice.paidAt)
                : "Belum Bayar/Belum Lunas"
            }
            className="w-full"
            disabled
          />

          {invoice.status === "pending" && (
            <div className="flex flex-row justify-end w-full pt-2">
              <PrimaryWithIconButton
                label="Bayar Sekarang"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenPayment(true);
                }}
                icon={DocumentCheckIcon}
              />
            </div>
          )}
        </div>
      </Modal>

      <Modal
        title={"Pembayaran"}
        isOpen={openPayment}
        setIsOpen={setOpenPayment}
      >
        {invoice.paymentUrl ? (
          <iframe
            src={invoice.paymentUrl}
            className="h-[550px] w-full"
            title={`Pembayaran untuk Invoice: ${invoice.id}`}
            onChange={(e) => {
              console.log("====================================");
              console.log("e ---> ", e.target);
              console.log("====================================");
            }}
          ></iframe>
        ) : (
          <div className="w-full flex flex-col justify-center items-center gap-y-4 p-4">
            <Image
              alt=""
              src={Images.icEmptyInvoice}
              className="w-72"
              height={40}
              width={40}
            />
            <PrimaryWithIconButton
              label="Sudah Bayar"
              loading={isLoadingUpdateStatusInvoice}
              onClick={(e) => {
                e.preventDefault();
                updateStatusInvoice({
                  invoiceId: invoice.id,
                  status: "success",
                });
              }}
              icon={DocumentCheckIcon}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DetailTransactionModal;
