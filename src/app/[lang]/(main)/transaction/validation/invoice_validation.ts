import * as Yup from "yup";

const invoiceValidation = Yup.object<InvoiceRequest>({
  memberId: Yup.number().required("Pengguna/Pemedek harus diisi!"),
  memberAddressId: Yup.number().required("Alamat pengguna harus diisi!"),
  adminId: Yup.number().required("Admin harus diisi!"),
  ceremonyDate: Yup.date().required("Tanggal upacara harus diisi!"),
  consultationId: Yup.string().optional().nullable(),
  ceremonyServiceId: Yup.number().required("Upacara Agama harus diisi!"),
  ceremonyPackageId: Yup.number().optional().nullable(),
  description: Yup.string().required("Deskripsi harus diisi!"),
  note: Yup.string()
    .optional()
    .max(500, "Catatan tidak boleh lebih dari 500 karakter"),
  totalPrice: Yup.string()
    .required("Total harga harus diisi!")
    .min(1, "Total harga tidak boleh kurang dari 0!"),
  isCash: Yup.boolean().required("Jenis pembayaran harus ditentukan!"),
  additionalTitle: Yup.string(),
});

export default invoiceValidation;
