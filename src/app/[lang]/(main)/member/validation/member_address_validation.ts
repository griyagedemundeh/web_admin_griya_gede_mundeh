import MemberAddressRequest from "@/data/models/member/request/member_address_request";

import * as Yup from "yup";

const memberAddressValidation = Yup.object<MemberAddressRequest>({
  address: Yup.string().required("Alamat Pengguna/Pemedek harus diisi!"),
  addressAlias: Yup.string()
    .max(255, "Alias Alamat Pengguna/Pemedek maksimal 255 karakter!")
    .required("Alias Alamat Pengguna/Pemedek harus diisi!"),
  addressNote: Yup.string().max(
    500,
    "Alias Alamat Pengguna/Pemedek maksimal 500 karakter!"
  ),
});

export default memberAddressValidation;
