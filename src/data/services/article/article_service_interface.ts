import ArticleRequest from "@/data/models/article/request/article_request";
import { ArticleinList } from "@/data/models/article/response/article";
import ApiResponse from "@/data/models/base/api-base-response";
import ListDataRequest from "@/data/models/base/list_data_request";

export interface IArticleService {
  // Article
  addArticle(request: ArticleRequest): Promise<ApiResponse<ArticleinList>>;

  getAllArticle(
    request: ListDataRequest
  ): Promise<ApiResponse<ArticleinList[]>>;

  deleteArticle({ id }: { id: number | string }): Promise<ApiResponse<null>>;

  //edit
  editArticle({
    id,
    request,
  }: {
    id: number | string;
    request: ArticleRequest;
  }): Promise<ApiResponse<ArticleinList>>;
  
}