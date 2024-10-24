import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import AlertDangerModal from "@/components/modal/AlertDangerModal";
import { useArticle } from "@/hooks/article/use_article";
import { useCentralStore } from "@/store";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface DeleteArticleModalProps {
  data: { id: number | string; title: string };
}

const DeleteArticleModal = ({ data }: DeleteArticleModalProps) => {
  const { setIsLoading } = useCentralStore();
  const { deleteArticle } = useArticle();

  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = () => {
    setOpenDelete(false);
    setIsLoading(true);
    deleteArticle({ id: data.id });
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
        description={`Apakah kamu yakin ingin menghapus Artikel ${data.title}?`}
        rightButtonLabel="Lanjutkan"
        leftButtonLabel="Batal"
      />
    </>
  );
};

export default DeleteArticleModal;
