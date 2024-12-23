import * as Yup from "yup";

const ceremonyCategoryValidation = Yup.object({
  name: Yup.string().required("Nama Kategori Upacara Agama harus diisi!"),
  description: Yup.string().required("Deskripsi harus diisi!"),
});

export default ceremonyCategoryValidation;
