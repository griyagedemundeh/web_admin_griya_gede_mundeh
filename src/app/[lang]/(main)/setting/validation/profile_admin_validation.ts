import * as Yup from "yup";

const profileAdminValidation = Yup.object({
  fullName: Yup.string().required("Nama Harus Diisi!"),
  email: Yup.string()
    .email("Format Email Tidak Valid!")
    .required("Email Harus Diisi!"),
  phoneNumber: Yup.string().required("Nomor Telepon Harus Diisi!"),
  oldPassword: Yup.string(),
  password: Yup.string(),
  passwordConfirm: Yup.string(),
});

export default profileAdminValidation;
