import React, { useState } from "react";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import AlertDangerModal from "@/components/modal/AlertDangerModal";
import { useCentralStore } from "@/store";
import { useCeremonyCategory } from "@/hooks/ceremony/use_ceremony_category";

interface DeleteCeremonyCategoryModalProps {
  data: { id: number | string; name: string };
}

const DeleteCeremonyCategoryModal = ({
  data,
}: DeleteCeremonyCategoryModalProps) => {
  const { setIsLoading } = useCentralStore();
  const { deleteCeremonyCategory } = useCeremonyCategory();

  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = () => {
    setOpenDelete(false);
    setIsLoading(true);
    deleteCeremonyCategory({ id: data.id });
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
        description={`Apakah kamu yakin ingin menghapus Kategori Upacara Agama ${data.name}?`}
        rightButtonLabel="Lanjutkan"
        leftButtonLabel="Batal"
      />
    </>
  );
};

export default DeleteCeremonyCategoryModal;
