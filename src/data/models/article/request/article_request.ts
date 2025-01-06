type ArticleRequest = {
  articleCategoryId: number | string;
  title: string;
  thumbnail?: File | null | string | undefined;
  thumbnailUrl?: string;
  content: string;
  isPublish?: boolean;
};

export default ArticleRequest;
