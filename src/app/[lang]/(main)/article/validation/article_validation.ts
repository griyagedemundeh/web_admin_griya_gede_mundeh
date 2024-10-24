import * as Yup from "yup";

const articleValidation = Yup.object({
    title: Yup.string().required("Nama Artikel Harus Diisi!"),
    articleCategoryId: Yup.string().required("Nama Kategori Artikel Harus Diisi!"),
    desccription: Yup.string().required("Deskripsi Harus Diisi!")
});

export default articleValidation;