import * as Yup from "yup";

const editArticleCategoryValidation = Yup.object({
    name: Yup.string().required("Nama Kategori Artikel Harus Diisi")
});

export default editArticleCategoryValidation;