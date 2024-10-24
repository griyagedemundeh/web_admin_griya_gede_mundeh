import ArticleRequest from "@/data/models/article/request/article_request";
import { IArticleService } from "./article_service_interface";
import ApiResponse from "@/data/models/base/api-base-response";
import { create } from "domain";
import { AxiosError, AxiosResponse } from "axios";
import api from "@/configs/api";
import ListDataRequest from "@/data/models/base/list_data_request";
import { ArticleinList } from "@/data/models/article/response/article";
import { headers } from "next/headers";

export class ArticleService implements IArticleService {
  BASE_ENDPOINT: string = "admin/article";

  async addArticle(
    request: ArticleRequest
  ): Promise<ApiResponse<ArticleinList>> {
    const uri = `${this.BASE_ENDPOINT}/create`;

    const data = new FormData();
    data.append("title", request.title);
    data.append("content", request.content);
    data.append("thumbnail", request.thumbnail as File);
    data.append("isPublish", String(request.isPublish));
    data.append("articleCategoryId", String(request.articleCategoryId));

    try {
      const response: AxiosResponse<ApiResponse<ArticleinList>> =
        await api.post(uri, data, {
          //Headers
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      return response.data;
    } catch (error: AxiosError<ApiResponse<ArticleinList>> | any) {
      console.error("====================================");
      console.error("ERROR ADD ARTICLE --> ", error.response.data.message);
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  async getAllArticle(
    request: ListDataRequest
  ): Promise<ApiResponse<ArticleinList[]>> {
    const uri = `article`;

    try {
      const response: AxiosResponse<ApiResponse<ArticleinList[]>> =
        await api.get(uri, { params: request });

      return response.data;
      console.log("jalan", response.data);
    } catch (error: AxiosError<ApiResponse<ArticleinList[]>> | any) {
      console.error("==================================");
      console.error("ERROR GET ALL ARTICLE-->", error.response.data.message);
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  async deleteArticle({
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
      console.error("ERROR DELETE ARTICLE --> ", error.response.data.message);
      console.error("====================================");
      throw error.response.data.message;
    }
  }

  //EDIT
  async editArticle({
    id,
    request,
  }: {
    id: number | string;
    request: ArticleRequest;
  }): Promise<ApiResponse<ArticleinList>> {
    const uri = `${this.BASE_ENDPOINT}/${id}`;

    const data = new FormData();
    data.append("title", request.title);
    data.append("content", request.content);
    data.append("thumbnail", request.thumbnail as File);
    data.append("isPublish", String(request.isPublish));
    data.append("articleCategoryId", String(request.articleCategoryId));

    try {
      const response: AxiosResponse<ApiResponse<ArticleinList>> =
        await api.patch(uri, data, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        });
        
      return response.data;
    } catch (error: AxiosError<ApiResponse<ArticleinList>> | any) {
      console.error("====================================");
      console.error("ERROR EDIT ARTICLE --> ", error.response.data.message);
      console.error("====================================");
      throw error.response.data.message;
    }
  }
}
