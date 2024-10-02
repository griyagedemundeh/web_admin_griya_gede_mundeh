import * as Yup from "yup";

const MINIMAL_PASSWORD_LENGTH = 8;

const loginValidation = Yup.object({
  userIdentifier: Yup.string().required("Email/No.Handphone harus diisi!"),
  password: Yup.string()
    // .min(MINIMAL_PASSWORD_LENGTH, "Kata sandi masih kurang dari 8 karakter")
    // .matches(
    //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
    //   "Kata sandi tidak valid!"
    // )
    .required("Kata sandi harus diisi!"),
});

export default loginValidation;
