import React, { useState } from "react";
import { useAdmin } from "@/hooks/admin/use_admin";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import AlertDangerModal from "@/components/modal/AlertDangerModal";
import { useCentralStore } from "@/store";

interface DeleteManagerModalProps {
  data: { id: number | string; fullName: string };
}

const DeleteManagerModal = ({ data }: DeleteManagerModalProps) => {
  const { setIsLoading } = useCentralStore();
  const { deleteAdmin } = useAdmin();

  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = () => {
    setOpenDelete(false);
    setIsLoading(true);
    deleteAdmin({ id: data.id });
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
        description={`Apakah kamu yakin ingin menghapus admin ${data.fullName}?`}
        rightButtonLabel="Lanjutkan"
        leftButtonLabel="Batal"
      />
    </>
  );
};

export default DeleteManagerModal;
