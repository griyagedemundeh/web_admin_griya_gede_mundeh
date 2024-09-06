import Ceremony from "@/data/models/ceremony";
import DropdownFilterItemProps from "@/interfaces/DropdownFilterItem";

export const status: DropdownFilterItemProps[] = [
  {
    id: "1",
    title: "Aktif",
  },
  {
    id: "2",
    title: "Non-Aktif",
  },
];

export const categories: DropdownFilterItemProps[] = [
  {
    id: "1",
    title: "Dewa Yadnya",
  },
  {
    id: "2",
    title: "Manusa Yadnya",
  },
  {
    id: "3",
    title: "Pitra Yadnya",
  },
  {
    id: "4",
    title: "Rsi Yadnya",
  },
  {
    id: "5",
    title: "Butha Yadnya",
  },
];

export const ceremonies: Ceremony[] = [
  {
    title: "Mebayuh",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    kategori: "Dewa Yadnya",
    thumbnailUrl:
      "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/03/22/Pawai-Ogoh-Ogoh-Awal-Mula-Kedudukan-Dalam-Tradisi-Hindu-Bali-Serta-Pesan-Sosialnya-3506145498.jpg",
    status: true,
  },
  {
    title: "Melaspas",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    kategori: "Manusa Yadnya",
    thumbnailUrl:
      "https://awsimages.detik.net.id/community/media/visual/2024/05/05/potret-mahalini-dan-rizky-febian-gelar-upacara-adat-bali-jelang-pernikahan-6_169.jpeg?w=1200",
    status: false,
  },
  {
    title: "Melaspas",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    kategori: "Manusa Yadnya",
    thumbnailUrl:
      "https://awsimages.detik.net.id/community/media/visual/2024/05/05/potret-mahalini-dan-rizky-febian-gelar-upacara-adat-bali-jelang-pernikahan-6_169.jpeg?w=1200",
    status: false,
  },
  {
    title: "Melaspas",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    kategori: "Manusa Yadnya",
    thumbnailUrl:
      "https://awsimages.detik.net.id/community/media/visual/2024/05/05/potret-mahalini-dan-rizky-febian-gelar-upacara-adat-bali-jelang-pernikahan-6_169.jpeg?w=1200",
    status: false,
  },
  {
    title: "Melaspas",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    kategori: "Manusa Yadnya",
    thumbnailUrl:
      "https://awsimages.detik.net.id/community/media/visual/2024/05/05/potret-mahalini-dan-rizky-febian-gelar-upacara-adat-bali-jelang-pernikahan-6_169.jpeg?w=1200",
    status: false,
  },
];
