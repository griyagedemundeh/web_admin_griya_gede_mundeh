import ArticleCategoryRequest from "@/data/models/article/request/article_category_request";
import ArticleCategory from "@/data/models/article/response/article_category";
import ApiResponse from "@/data/models/base/api-base-response";
import { UseMutateFunction, useMutation } from "react-query";
import {
  addArticleCategory as addArticleCategoryBridge,
  deleteArticleCategory as deleteArticleCategoryBridge,
  editArticleCategory as editArticleCategoryBridge,
  useGetAllArticleCategoryQuery,
} from "./article_category_bridge";
import { useCentralStore } from "@/store";
import { useEffect } from "react";
import { statusMessage } from "@/utils";
import { AxiosError } from "axios";

interface IUseArticleCategory {
  addArticleCategory: UseMutateFunction<
    ApiResponse<ArticleCategory>,
    unknown,
    ArticleCategoryRequest,
    unknown
  >;
  editArticleCategory: UseMutateFunction<
    ApiResponse<ArticleCategory>,
    unknown,
    {
      id: number | string;
      request: ArticleCategoryRequest;
    },
    unknown
  >;

  deleteArticleCategory: UseMutateFunction<
    ApiResponse<null>,
    unknown,
    {
      id: number | string;
    },
    unknown
  >;
  allArticleCategory: ApiResponse<ArticleCategory[]> | undefined;
  isLoadingAddArticleCategory: boolean;
  isAddArticleCategorySucces: boolean;
  isAddArticleCategoryError: boolean;
  isLoadingEditArticleCategory: boolean;
  isEditArticleCategorySucces: boolean;
  isEditArticleCategoryError: boolean;
  isLoadingDeleteArticleCategory: boolean;
  isDeleteArticleCategorySuccess: boolean;
  isDeleteArticleCategoryError: boolean;
}

export const useArticleCategory = (): IUseArticleCategory => {
  const { setIsLoading } = useCentralStore();

  const {
    data: allArticleCategory,
    isLoading: isAllArticleCategoryLoading,
    isError: isAllArticleCategoryError,
    error: errorAllArticleCategory,
    refetch: refecthAllArticleCategory,
  } = useGetAllArticleCategoryQuery({ limit: 100, page: 1 });

  //ADD
  const {
    mutate: addArticleCategory,
    isLoading: isLoadingAddArticleCategory,
    isSuccess: isAddArticleCategorySucces,
    isError: isAddArticleCategoryError,
  } = useMutation(addArticleCategoryBridge, {
    onSuccess: async (value) => {
      statusMessage({ message: value.message, status: "success" });
      setIsLoading(false);
      window.location.reload();
    },
    onError: async (
      error: AxiosError<ApiResponse<ArticleCategory>> | unknown
    ) => {
      setIsLoading(false);
      statusMessage({ message: error, status: "error" });
    },
  });

  //EDIT
  const {
    mutate: editArticleCategory,
    isLoading: isLoadingEditArticleCategory,
    isSuccess: isEditArticleCategorySucces,
    isError: isEditArticleCategoryError,
  } = useMutation(editArticleCategoryBridge, {
    onSuccess: async (value) => {
      statusMessage({ message: value.message, status: "success" });

      setIsLoading(false);
      window.location.reload();
    },
    onError: async (
      error: AxiosError<ApiResponse<ArticleCategory>> | unknown
    ) => {
      setIsLoading(false);
      statusMessage({ message: error, status: "error" });
    },
  });

  //DELETE
  const {
    mutate: deleteArticleCategory,
    isLoading: isLoadingDeleteArticleCategory,
    isSuccess: isDeleteArticleCategorySuccess,
    isError: isDeleteArticleCategoryError,
  } = useMutation(deleteArticleCategoryBridge, {
    onSuccess: async (value) => {
      refecthAllArticleCategory();

      statusMessage({ message: value.message, status: "success" });
      setIsLoading(false);

      window.location.reload();
    },
    onError: async (error: AxiosError<ApiResponse<null>> | unknown) => {
      setIsLoading(false);
      statusMessage({ message: error, status: "error" });
    },
  });

  useEffect(() => {
    setIsLoading(isAllArticleCategoryLoading);

    if (isAllArticleCategoryError) {
      statusMessage({ message: errorAllArticleCategory, status: "error" });
    }
  }, [isAllArticleCategoryLoading, isAllArticleCategoryError]);

  return {
    addArticleCategory,
    allArticleCategory,
    isLoadingAddArticleCategory,
    isAddArticleCategorySucces,
    isAddArticleCategoryError,
    editArticleCategory,
    isEditArticleCategorySucces,
    isEditArticleCategoryError,
    isLoadingEditArticleCategory,
    deleteArticleCategory,
    isDeleteArticleCategorySuccess,
    isDeleteArticleCategoryError,
    isLoadingDeleteArticleCategory,
  };
};
