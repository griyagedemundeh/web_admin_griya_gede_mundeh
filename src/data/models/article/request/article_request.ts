type ArticleRequest = {
  articleCategoryId: number | string;
  title: string;
  thumbnail?: File | null | string;
  thumbnailUrl?: string;
  content: string;
  isPublish?: boolean;
};

export default ArticleRequest;
