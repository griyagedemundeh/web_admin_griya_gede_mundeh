import * as Yup from "yup";

const articleValidation = Yup.object({
  title: Yup.string().required("Nama Artikel Harus Diisi!"),
  articleCategoryId: Yup.string().required("Kategori Artikel Harus Diisi!"),
  content: Yup.string().required("Konten Artikel Harus Diisi!"),
  isPublish: Yup.bool(),
});

export default articleValidation;
