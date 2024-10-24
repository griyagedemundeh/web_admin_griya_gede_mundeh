import ArticleRequest from "@/data/models/article/request/article_request";
import DetailArticleCategoryModal from "../../article-category/components/DetailArticleCategoryModal";
import { useCentralStore } from "@/store";
import { useArticle } from "@/hooks/article/use_article";
import { ReactElement, useEffect, useState } from "react";
import { urlToFile } from "@/utils";
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

interface DetailArticleModalProps {
  id: number | string;
  data: ArticleRequest;
  setOpen: (value: boolean) => void;
  setData: (value: ArticleRequest) => void;
  open: boolean;

  // CATEGORY
  selectedArticleCategory: DropdownFilterItemProps | undefined;
  setSelectedArticleCategory: (
    value: DropdownFilterItemProps | undefined
  ) => void;
}

const DetailArticleModal = ({
  data,
  id,
  //   setOpen,
  //   setData,
  //   open,
  selectedArticleCategory,
  setSelectedArticleCategory,
}: DetailArticleModalProps) => {
  const { setIsLoading, isLoading } = useCentralStore();
  const { editArticle, isEditArticleError, isEditArticleSucces } = useArticle();
  const [openDetail, setOpenDetail] = useState(false);

  const handleEditArticle = (article: ArticleRequest) => {
    setIsLoading(true);
    editArticle({ id, request: article });
  };

  const [articleCategories, setCategory] = useState<DropdownFilterItemProps[]>(
    []
  );

  const { allArticleCategory } = useArticleCategory();
  // Flag untuk memastikan kategori sudah dimuat
  const [isCategoryLoaded, setIsCategoryLoaded] = useState(false);

  const getFile = async () => {
    if (typeof data.thumbnail === "string" && data.thumbnail) {
      try {
        const file = await urlToFile({
          fileName: "thumbnail.png", // You can customize this
          url: data.thumbnail,
        });
        console.log("File created from URL:", file);
        return file;
      } catch (error) {
        console.error("Error converting URL to file:", error);
      }
    } else {
      console.warn("No valid thumbnail URL to convert.");
    }
  };

  useEffect(() => {
    getFile();
  }, [data.thumbnail]);

  // Fetch all categories once
  useEffect(() => {
    if (allArticleCategory?.data) {
      setCategory(
        allArticleCategory.data.map((category) => ({
          id: category.id,
          title: category.name,
        }))
      );
      setIsCategoryLoaded(true); // Set flag ketika kategori telah dimuat
    }
  }, [allArticleCategory?.data]);

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
          initialValues={data}
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
              onSubmit={() => {
                console.log(handleEditArticle);
                handleEditArticle(values);
              }}
            >
              <div>
                <div className="flex flex-col items-center w-full px-8 py-6 space-y-4">
                  <BigFileInput
                    //NEWWW
                    src={
                      typeof data.thumbnail === "string"
                        ? data.thumbnail
                        : data.thumbnail
                        ? URL.createObjectURL(data.thumbnail)
                        : ""
                    }
                    onChange={(file) => setFieldValue("thumbnail", file)}
                    // Handle file input correctly
                    // onChange={(e) => {
                    //   setFieldValue("thumbnail", e);
                    // }}
                    //////////////////////////
                    // src={data.thumbnail}
                    // onChange={(e) => {
                    //   setFieldValue("thumbnail", e);
                    // }}
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
                    items={articleCategories}
                    label="Kategori Artikel"
                    placeholder="Pilih Kategori Artikel"
                    // selectedItem={{ id: "", title: "" }}
                    //NEWWW
                    selectedItem={selectedArticleCategory}
                    className="w-full"
                    setSelectedItem={(e) => {
                      setSelectedArticleCategory(e);
                      setValues({
                        ...values,
                        articleCategoryId: e?.id as string,
                      });
                      console.log(e)
                    }}
                  />
                  <PrimaryTextEditor
                    label="Konten Artikel"
                    value={values.content}
                    onChange={handleChange("content")}
                  />
                </div>
                <div className="flex flex-row justify-end w-full px-6 pb-4 space-x-4">
                  <PrimaryWithIconButton
                    label="Simpan"
                    onClick={() => {
                      console.log(handleSubmit, values);
                      handleEditArticle(values);
                    }}
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
