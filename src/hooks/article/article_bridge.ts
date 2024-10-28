import ArticleRequest from "@/data/models/article/request/article_request";
import { Article } from "@/data/models/article/response/article";
import ApiResponse from "@/data/models/base/api-base-response";
import ListDataRequest from "@/data/models/base/list_data_request";
import { ArticleService } from "@/data/services/article/article_service";
import { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";

const articleService = new ArticleService();
const TAG_ERROR = "Error During: ";

export const addArticle = async (
  request: ArticleRequest
): Promise<ApiResponse<Article>> => {
  console.log(request);
  const response = await articleService
    .addArticle(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<Article>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} ADD ARTICLE `, error);
      console.error("====================================");
      throw error;
    });
  return response;
};

export const getAllArticle = async (
  request: ListDataRequest
): Promise<ApiResponse<Article[]>> => {
  const response = await articleService
    .getAllArticle(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<Article[]>> | unknown) => {
      console.error("================================");
      console.error(`${TAG_ERROR} GET ALL ARTICLE`, error);
      console.error("================================");
      throw error;
    });
  return response;
};

export const useGetAllArticleQuery = (
  request: ListDataRequest
): UseQueryResult<ApiResponse<Article[]>, unknown> =>
  useQuery("allArticle", () => getAllArticle(request));

//DELETE
export const deleteArticle = async ({
  id,
}: {
  id: number | string;
}): Promise<ApiResponse<null>> => {
  const response = await articleService
    .deleteArticle({ id })
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<null>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} DELETE ARTICLE`, error);
      console.error("====================================");
      throw error;
    });
  return response;
};

//EDIT
export const editArticle = async ({
  id,
  request,
}: {
  id: number | string;
  request: ArticleRequest;
}): Promise<ApiResponse<Article>> => {
  const response = await articleService
    .editArticle({ id, request })
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<Article>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} EDIT ARTICLE `, error);
      console.error("====================================");
      throw error;
    });
  return response;
};
