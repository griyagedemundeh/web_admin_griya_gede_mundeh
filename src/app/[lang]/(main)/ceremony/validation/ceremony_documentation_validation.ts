import * as Yup from "yup";

const ceremonyDocumentationValidation = Yup.object({
  ceremonyServiceId: Yup.string().required("ID Upacara Agama harus diisi!"),
});

export default ceremonyDocumentationValidation;
