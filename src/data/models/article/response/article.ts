import ArticleCategory from "./article_category";

// export type Article = {
//   id: number | string;
//   title: string;
//   thumbnail: File | null;
//   // thumbnail: string;
//   slug?: string;
//   content?: string;
//   isPublish: Boolean;
//   // createdAt?: Date | string;
//   // updateAt?: string | Date;
// };

//Article Documentation
export type ArticleDocumentation = {
  thumbnail: string;
  id: number | string;
  createdAt?: Date | string;
  updateAt?: string | Date;
}

export type ArticleinList = {
  id: number| string;
  title: string;
  slug?: string;
  content?: string;
  // thumbnail: File | null;
  // thumbnail: string;
  articleCategory: ArticleCategory[];
  articleDocumentation: ArticleDocumentation[];
  createdAt?: Date | string;
}
