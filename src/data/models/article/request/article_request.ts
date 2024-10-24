type ArticleRequest = {
    articleCategoryId: number | string;
    title: string;
    thumbnail?: File | null;
        // thumbnail?: string;
    content: string;
    isPublish?: Boolean
};

export default ArticleRequest;