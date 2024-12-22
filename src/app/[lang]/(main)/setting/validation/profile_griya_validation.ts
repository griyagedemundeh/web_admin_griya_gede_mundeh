import * as Yup from "yup";

const profileGriyaValidation = Yup.object({
  name: Yup.string().required("Nama Harus Diisi!"),
  email: Yup.string()
    .email("Format Email Tidak Valid!")
    .required("Email Harus Diisi!"),
  phoneNumber: Yup.string().required("Nomor Telepon Harus Diisi!"),
  logo: Yup.mixed().nullable().notRequired(),
  address: Yup.string().required("Alamat Harus Diisi!"),
  about: Yup.string().required("Deskripsi Harus Diisi!"),
  vision: Yup.string().required("Visi Harus Diisi!"),
  mission: Yup.string().required("Misi Harus Diisi!"),
});

export default profileGriyaValidation;
