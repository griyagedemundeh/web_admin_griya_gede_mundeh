import React, { useState } from "react";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import AlertDangerModal from "@/components/modal/AlertDangerModal";
import { useCentralStore } from "@/store";
import { useCeremony } from "@/hooks/ceremony/use_ceremony";

interface DeleteCeremonyModalProps {
  data: { id: number | string; name: string };
}

const DeleteCeremonyModal = ({ data }: DeleteCeremonyModalProps) => {
  const { setIsLoading } = useCentralStore();
  // const { deleteCeremonyCategory } = useCeremony();

  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = () => {
    setOpenDelete(false);
    setIsLoading(true);
    // deleteCeremonyCategory({ id: data.id });
  };

  return (
    <>
      <IconBackgroundButton
        icon={TrashIcon}
        colorBackground="rose"
        colorIcon="red"
        onClick={() => {
          setOpenDelete(true);
        }}
      />
      <AlertDangerModal
        onRightClick={() => {
          handleDelete();
        }}
        open={openDelete}
        setOpen={setOpenDelete}
        title="Hapus"
        description={`Apakah kamu yakin ingin menghapus Upacara Agama ${data.name}?`}
        rightButtonLabel="Lanjutkan"
        leftButtonLabel="Batal"
      />
    </>
  );
};

export default DeleteCeremonyModal;
