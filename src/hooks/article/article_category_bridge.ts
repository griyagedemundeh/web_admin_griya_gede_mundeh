import ArticleCategoryRequest from "@/data/models/article/request/article_category_request";
import ArticleCategory from "@/data/models/article/response/article_category";
import ApiResponse from "@/data/models/base/api-base-response";
import ListDataRequest from "@/data/models/base/list_data_request";

import { ArticleCategoryService } from "@/data/services/article/article_category_service";
import { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";

const articleService = new ArticleCategoryService();
const TAG_ERROR = "Error during :";

//CATEGORY
export const addArticleCategory = async (
  request: ArticleCategoryRequest
): Promise<ApiResponse<ArticleCategory>> => {
  const response = await articleService
    .addArticleCategory(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<ArticleCategory>> | unknown) => {
      console.error("=========================================");
      console.error(`${TAG_ERROR} ADD ARTICLE CATEGORY`, error);
      console.error("=========================================");
      throw error;
    });
  return response;
};

export const editArticleCategory = async ({
  id,
  request,
}: {
  id: number | string;
  request: ArticleCategoryRequest;
}): Promise<ApiResponse<ArticleCategory>> => {
  const response = await articleService
    .editArticleCategory({ id, request })
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<ArticleCategory>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} EDIT ARTICLE CATEGORY `, error);
      console.error("====================================");
      throw error;
    });

  return response;
};

export const deleteArticleCategory = async ({
  id,
}: {
  id: number | string;
}): Promise<ApiResponse<null>> => {
  const response = await articleService
    .deleteArticleCategory({ id })
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<null>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} DELETE ARTICLE CATEGORY`, error);
      console.error("====================================");
      throw error;
    });
  return response;
};

export const getAllArticleCategory = async (
  request: ListDataRequest
): Promise<ApiResponse<ArticleCategory[]>> => {
  const response = await articleService
    .getAllArticleCategory(request)
    .then(async (value) => {
      return value;
    })
    .catch((error: AxiosError<ApiResponse<ArticleCategory[]>> | unknown) => {
      console.error("====================================");
      console.error(`${TAG_ERROR} GET ALL ARTICLE CATEGORY `, error);
      console.error("====================================");
      throw error;
    });
  return response;
};

export const useGetAllArticleCategoryQuery = (
  request: ListDataRequest
): UseQueryResult<ApiResponse<ArticleCategory[]>, unknown> =>
  useQuery("allCeremonyCategory", () => getAllArticleCategory(request));
