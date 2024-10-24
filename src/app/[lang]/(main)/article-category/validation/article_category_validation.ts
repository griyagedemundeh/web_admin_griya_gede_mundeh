import * as Yup from "yup";

const articleCategoryValidation = Yup.object({
    name: Yup.string().required("Nama Kategori Artikel Harus Diisi")
});

export default articleCategoryValidation;