type ArticleCategory = {
  name: string;
  id: number | string;
  isActive?: boolean | number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export default ArticleCategory;
