type ArticleRequest = {
  articleCategoryId: number | string;
  title: string;
  thumbnail?: File | null | string;
  content: string;
  isPublish?: Boolean;
};

export default ArticleRequest;
