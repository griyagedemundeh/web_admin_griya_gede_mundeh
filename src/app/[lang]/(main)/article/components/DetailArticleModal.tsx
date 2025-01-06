import ArticleRequest from "@/data/models/article/request/article_request";
import { useCentralStore } from "@/store";
import { useArticle } from "@/hooks/article/use_article";
import { useEffect, useState } from "react";
import Modal from "@/components/modal/Modal";
import { Form, Formik } from "formik";
import articleValidation from "../validation/article_validation";
import BigFileInput from "@/components/input/image/BigFileInput";
import PrimaryInput from "@/components/input/PrimaryInput";
import DropdownInput from "@/components/dropdown/DropdownInput";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";
import PrimaryTextEditor from "@/components/input/PrimaryTextEditor";
import PrimaryWithIconButton from "@/components/button/PrimaryWithIconButton";
import { CheckIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import IconBackgroundButton from "@/components/button/IconBackgroundButton";
import { useArticleCategory } from "@/hooks/article/use_article_category";
import ArticleCategory from "@/data/models/article/response/article_category";

interface DetailArticleModalProps {
  id: number | string;
  data: ArticleRequest;
  category: ArticleCategory | null;
}

const DetailArticleModal = ({
  data,
  id,
  category,
}: DetailArticleModalProps) => {
  const { setIsLoading, isLoading } = useCentralStore();
  const { editArticle, isEditArticleError, isEditArticleSuccess } =
    useArticle();
  const [openDetail, setOpenDetail] = useState(false);
  const { allArticleCategory } = useArticleCategory();

  const [articleRequest, setArticleRequest] = useState<ArticleRequest>({
    articleCategoryId: data.articleCategoryId,
    content: data.content,
    title: data.title,
    isPublish: data.isPublish ?? true,
  });

  const handleEditArticle = (article: ArticleRequest) => {
    setIsLoading(true);
    editArticle({ id, request: article });
  };

  const [categories, setCategories] = useState<DropdownFilterItemProps[]>([]);

  const [selectedArticleCategory, setSelectedArticleCategory] =
    useState<DropdownFilterItemProps>({
      id: category?.id ?? 0,
      title: category?.name ?? "",
    });

  useEffect(() => {
    if (allArticleCategory?.data) {
      setCategories(
        allArticleCategory.data.map((category) => ({
          id: category.id,
          title: category.name,
        }))
      );
    }
  }, [allArticleCategory?.data]);

  useEffect(() => {
    if (isEditArticleSuccess) {
      setOpenDetail(false);
    }

    if (isEditArticleError) {
      setOpenDetail(true);
    }
  }, [isEditArticleSuccess, isEditArticleError]);

  return (
    <>
      <IconBackgroundButton
        icon={PencilSquareIcon}
        colorBackground="emerald"
        className="bg-emerald-100"
        colorIcon="green"
        onClick={() => {
          setOpenDetail(true);
        }}
      />
      <Modal title="Edit Artikel" isOpen={openDetail} setIsOpen={setOpenDetail}>
        <Formik
          initialValues={articleRequest}
          onSubmit={handleEditArticle}
          validationSchema={articleValidation}
          suppressHydrationWarning={true}
        >
          {({
            errors,
            handleChange,
            handleSubmit,
            values,
            setFieldValue,
            setValues,
          }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditArticle(values);
              }}
            >
              <div>
                <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
                  <BigFileInput
                    src={data.thumbnail as string}
                    onChange={(file) => setFieldValue("thumbnail", file)}
                    label="Kover Artikel"
                  />
                  <PrimaryInput
                    label="Judul Artikel"
                    value={values.title}
                    className="w-full"
                    placeholder="Masukkan judul artikel"
                    error={errors.title ?? undefined}
                    onChange={handleChange("title")}
                  />
                  <DropdownInput
                    items={categories}
                    label="Kategori Artikel"
                    placeholder="Pilih Kategori Artikel"
                    selectedItem={selectedArticleCategory}
                    className="w-full"
                    setSelectedItem={(e) => {
                      setSelectedArticleCategory(e as DropdownFilterItemProps);
                      setValues({
                        ...values,
                        articleCategoryId: e?.id as string,
                      });
                    }}
                  />
                  <PrimaryTextEditor
                    label="Konten Artikel"
                    value={values.content}
                    onChange={handleChange("content")}
                    error={errors.content ?? undefined}
                  />
                </div>
                <div className="flex flex-row justify-end w-full px-6 pb-4 space-x-4">
                  <PrimaryWithIconButton
                    label="Simpan"
                    type="submit"
                    loading={isLoading}
                    icon={CheckIcon}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default DetailArticleModal;
