import * as Yup from "yup";

const ceremonyValidation = Yup.object({
  title: Yup.string().required("Nama Upacara Agama harus diisi!"),
  ceremonyCategoryId: Yup.string().required(
    "Nama Kategori Upacara Agama harus diisi!"
  ),
  description: Yup.string().required("Deskripsi harus diisi!"),
});

export default ceremonyValidation;
