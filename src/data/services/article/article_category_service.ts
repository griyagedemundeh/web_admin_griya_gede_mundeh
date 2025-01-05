import api from "@/configs/api";
import ApiResponse from "@/data/models/base/api-base-response";
import { AxiosError, AxiosResponse } from "axios";
import ListDataRequest from "@/data/models/base/list_data_request";
import { IArticleCategoryService } from "./article_category_service_interface";
import ArticleCategory from "@/data/models/article/response/article_category";
import ArticleCategoryRequest from "@/data/models/article/request/article_category_request";

export class ArticleCategoryService implements IArticleCategoryService {
  BASE_ENDPOINT = "/admin/article/category";

  async addArticleCategory(
    request: ArticleCategoryRequest
  ): Promise<ApiResponse<ArticleCategory>> {
    const uri = `${this.BASE_ENDPOINT}/create`;

    const data = new FormData();
    data.append("name", request.name);
    try {
      const response: AxiosResponse<ApiResponse<ArticleCategory>> =
        await api.post(uri, data);

      return response.data;
    } catch (error: AxiosError<ApiResponse<ArticleCategory>> | any) {
      console.error("====================================");
      console.error(
        "ERROR ADD ARTICLE CATEGORY --> ",
        error.response.data.message
      );
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  async deleteArticleCategory({
    id,
  }: {
    id: number | string;
  }): Promise<ApiResponse<null>> {
    const uri = `${this.BASE_ENDPOINT}/${id}`;

    try {
      const response: AxiosResponse<ApiResponse<null>> = await api.delete(uri);

      return response.data;
    } catch (error: AxiosError<ApiResponse<null>> | any) {
      console.error("====================================");
      console.error(
        "ERROR DELETE ARTICLE CATEGORY --> ",
        error.response.data.message
      );
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  async editArticleCategory({
    id,
    request,
  }: {
    id: number | string;
    request: ArticleCategoryRequest;
  }): Promise<ApiResponse<ArticleCategory>> {
    const uri = `${this.BASE_ENDPOINT}/${id}`;
    const data = new FormData();
    data.append("name", request.name);
    data.append("isActive", "true");
    try {
      const response: AxiosResponse<ApiResponse<ArticleCategory>> =
        await api.patch(uri, data);

      return response.data;
    } catch (error: AxiosError<ApiResponse<ArticleCategory>> | any) {
      console.error("====================================");
      console.error(
        "ERROR EDIT ARTICLE CATEGORY --> ",
        error.response.data.message
      );
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  async getAllArticleCategory(
    request: ListDataRequest
  ): Promise<ApiResponse<ArticleCategory[]>> {
    const uri = `article/category`;

    try {
      const response: AxiosResponse<ApiResponse<ArticleCategory[]>> =
        await api.get(uri, {
          params: request,
        });

      return response.data;
    } catch (error: AxiosError<ApiResponse<ArticleCategory[]>> | any) {
      console.error("====================================");
      console.error(
        "ERROR GET ARTICLE CATEGORY --> ",
        error.response.data.message
      );
      console.error("====================================");
      throw error.response.data.message;
    }
  }
}
