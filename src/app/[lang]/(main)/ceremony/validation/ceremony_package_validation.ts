import * as Yup from "yup";

const ceremonyPackagesValidation = Yup.object().shape({
  packages: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Nama Paket Upacara Agama harus diisi!"),
      price: Yup.number().required("Harga Paket Upacara Agama harus diisi!"),
      description: Yup.string().required("Deskripsi harus diisi!"),
    })
  ),
});

export default ceremonyPackagesValidation;
