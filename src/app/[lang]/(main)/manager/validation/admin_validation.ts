import * as Yup from "yup";

const MINIMAL_PASSWORD_LENGTH = 8;

const adminValidation = Yup.object({
  fullName: Yup.string().required("Nama lengkap harus diisi!"),
  phoneNumber: Yup.string()
    .required("No Hp harus diisi!")
    .min(10, "No Hp minimal 10 digit!"),
  email: Yup.string()
    .email("Email tidak valid!")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Email tidak valid!"
    ),
  password: Yup.string()
    .min(MINIMAL_PASSWORD_LENGTH, "Kata sandi masih kurang dari 8 karakter")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
      "Kata sandi tidak valid!"
    )
    .required("Kata sandi harus diisi!"),
  password_confirmation: Yup.string()
    .min(
      MINIMAL_PASSWORD_LENGTH,
      "Konfirmasi Kata sandi masih kurang dari 8 karakter!"
    )
    .oneOf(
      [Yup.ref("password")],
      "Konfirmasi Kata Sandi dengan Kata Sandi tidak sama!"
    )
    .required("Konfirmasi Kata sandi harus diisi!"),
});

export default adminValidation;
