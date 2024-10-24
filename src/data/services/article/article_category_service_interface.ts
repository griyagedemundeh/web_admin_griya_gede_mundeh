import ArticleCategoryRequest from "@/data/models/article/request/article_category_request";
import ArticleCategory from "@/data/models/article/response/article_category";
import ApiResponse from "@/data/models/base/api-base-response";
import ListDataRequest from "@/data/models/base/list_data_request";

export interface IArticleCategoryService {
  addArticleCategory(
    request: ArticleCategoryRequest
  ): Promise<ApiResponse<ArticleCategory>>;

  deleteArticleCategory({
    id,
  }: {
    id: number | string;
  }): Promise<ApiResponse<null>>;

  editArticleCategory({
    id,
    request,
  }: {
    id: number | string;
    request: ArticleCategoryRequest;
  }): Promise<ApiResponse<ArticleCategory>>;

  getAllArticleCategory(
    request: ListDataRequest
  ): Promise<ApiResponse<ArticleCategory[]>>;
}
