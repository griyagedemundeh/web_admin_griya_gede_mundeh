import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import AlertDangerModal from "@/components/modal/AlertDangerModal";
import { useArticleCategory } from "@/hooks/article/use_article_category";
import { useCentralStore } from "@/store";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface DeleteArticleCategoryModalProps {
  data: { id: number | string; name: string };
}

const DeleteArticleCategoryModal = ({
  data,
}: DeleteArticleCategoryModalProps) => {
  const { setIsLoading } = useCentralStore();
  const { deleteArticleCategory } = useArticleCategory();

  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = () => {
    setOpenDelete(false);
    setIsLoading(true);
    deleteArticleCategory({ id: data.id });
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
        description={`Apakah kamu yakin ingin menghapus Kategori Artikel ${data.name}?`}
        rightButtonLabel="Lanjutkan"
        leftButtonLabel="Batal"
      />
    </>
  );
};

export default DeleteArticleCategoryModal;
