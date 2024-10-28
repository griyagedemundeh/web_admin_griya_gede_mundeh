import ArticleCategory from "./article_category";

export type Article = {
  id: number;
  adminId: number;
  articleCategory: ArticleCategory | null;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  isPublish: boolean;
  createdAt: string;
  updatedAt: string;
};
