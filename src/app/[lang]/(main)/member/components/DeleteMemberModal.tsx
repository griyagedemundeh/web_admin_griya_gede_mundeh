import React, { useState } from "react";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import { TrashIcon } from "@heroicons/react/24/outline";
import AlertDangerModal from "@/components/modal/AlertDangerModal";
import { useCentralStore } from "@/store";
import { useMember } from "@/hooks/member/use_member";

interface DeleteMemberModalProps {
  data: { id: number | string; fullName: string };
}

const DeleteMemberModal = ({ data }: DeleteMemberModalProps) => {
  const { setIsLoading } = useCentralStore();
  const { deleteMember } = useMember({});

  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = () => {
    setOpenDelete(false);
    setIsLoading(true);
    // sesuaikan dengan Member
    deleteMember({ id: data.id });
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
        description={`Apakah kamu yakin ingin menghapus ${data.fullName}?`}
        rightButtonLabel="Lanjutkan"
        leftButtonLabel="Batal"
      />
    </>
  );
};

export default DeleteMemberModal;
