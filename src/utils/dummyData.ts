import Article from "@/data/models/article";
import Ceremony from "@/data/models/ceremony";
import User from "@/data/models/user";
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

export const users: User[] = [
  {
    name: "Mahesa Widiana",
    email: "kt.mahesa@gmail.com",
    phone: "085858603320",
    status: true,
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Bimo Adnyana",
    email: "bimo@gmail.com",
    phone: "0824237646883",
    status: true,
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Rafika Wardah",
    email: "fika@gmail.com",
    phone: "081231232445",
    status: false,
    avatarUrl: null,
  },
];

export const articles: Article[] = [
  {
    id: "1",
    kategori: "Kehidupan",
    postedDate: new Date(),
    status: true,
    thumbnailString:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    title:
      "Arti Mepamit, Upacara Adat Bali yang Dijalani Mahalini & Dinikahi Rizky Febian",
  },
  {
    id: "2",
    kategori: "Kehidupan",
    postedDate: new Date(),
    status: true,
    thumbnailString:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    title:
      "Arti Mepamit, Upacara Adat Bali yang Dijalani Mahalini & Dinikahi Rizky Febian",
  },
  {
    id: "3",
    kategori: "Kehidupan",
    postedDate: new Date(),
    status: true,
    thumbnailString:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    title:
      "Arti Mepamit, Upacara Adat Bali yang Dijalani Mahalini & Dinikahi Rizky Febian",
  },
  {
    id: "4",
    kategori: "Kehidupan",
    postedDate: new Date(),
    status: true,
    thumbnailString:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    title:
      "Arti Mepamit, Upacara Adat Bali yang Dijalani Mahalini & Dinikahi Rizky Febian",
  },
  {
    id: "5",
    kategori: "Kehidupan",
    postedDate: new Date(),
    status: true,
    thumbnailString:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    title:
      "Arti Mepamit, Upacara Adat Bali yang Dijalani Mahalini & Dinikahi Rizky Febian",
  },
];
