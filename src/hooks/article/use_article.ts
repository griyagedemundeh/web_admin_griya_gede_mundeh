import ArticleRequest from "@/data/models/article/request/article_request";
import { ArticleinList } from "@/data/models/article/response/article";
import ApiResponse from "@/data/models/base/api-base-response";
import { useCentralStore } from "@/store";
import { useEffect, useState } from "react";
import { UseMutateFunction, useMutation, UseMutationResult } from "react-query";
import {
  addArticle as addArticleBridge,
  deleteArticle as deleteArticleBridge,
  editArticle as editArticleBridge,
  useGetAllArticleQuery,
} from "./article_bridge";
import { statusMessage } from "@/utils";
import { AxiosError } from "axios";
import { error } from "console";

interface IUseArticle {
  addArticle: UseMutateFunction<
    ApiResponse<ArticleinList>,
    unknown,
    ArticleRequest,
    unknown
  >;
  allArticle: ApiResponse<ArticleinList[]> | undefined;
  isLoadingAddArticle: boolean;
  isAddArticleSuccess: boolean;
  isAddArticleError: boolean;
  article: ArticleinList | undefined;

  //DELETE
  deleteArticle: UseMutateFunction<
    ApiResponse<null>,
    unknown,
    {
      id: number | string;
    },
    unknown
  >;
  isLoadingDeleteArticle: boolean;
  isDeleteArticleSuccess: boolean;
  isDeleteArticleError: boolean;

  //EDIT
  editArticle: UseMutateFunction<
    ApiResponse<ArticleinList>,
    unknown,
    {
      id: number | string;
      request: ArticleRequest;
    },
    unknown
  >;
  isLoadingEditArticle: boolean;
  isEditArticleSucces: boolean;
  isEditArticleError: boolean;
}

export const useArticle = (): IUseArticle => {
  const { setIsLoading } = useCentralStore();

  const [article, setArticle] = useState<ArticleinList>();

  //GET ALL ARTICLE
  const {
    data: allArticle,
    isLoading: isAllArticleLoading,
    isError: isAllArticleError,
    error: errorAllArticle,
    refetch: refecthAllArticle,
  } = useGetAllArticleQuery({ limit: 100, page: 1 });

  //ADD
  const {
    mutate: addArticle,
    isLoading: isLoadingAddArticle,
    isError: isAddArticleError,
    isSuccess: isAddArticleSuccess,
  } = useMutation(addArticleBridge, {
    onSuccess: async (value) => {
      setArticle(value.data);
      statusMessage({ message: value.message, status: "success" });
      setIsLoading(false);
    },
    onError: async (
      error: AxiosError<ApiResponse<ArticleinList>> | unknown
    ) => {
      setIsLoading(false);
      statusMessage({ message: error, status: "error" });
    },
  });

  //DELETE
  const {
    mutate: deleteArticle,
    isLoading: isLoadingDeleteArticle,
    isSuccess: isDeleteArticleSuccess,
    isError: isDeleteArticleError,
  } = useMutation(deleteArticleBridge, {
    onSuccess: async (value) => {
      refecthAllArticle();

      statusMessage({ message: value.message, status: "success" });
      setIsLoading(false);
      window.location.reload();
    },
    onError: async (error: AxiosError<ApiResponse<null>> | unknown) => {
      setIsLoading(false);
      statusMessage({ message: error, status: "error" });
    },
  });

  //EDIT
  const{
    mutate: editArticle,
    isLoading: isLoadingEditArticle,
    isSuccess: isEditArticleSucces,
    isError: isEditArticleError
  } = useMutation(editArticleBridge, {
    onSuccess: async(value) => {
      refecthAllArticle();
      statusMessage({message: value.message, status: "success"});
      setIsLoading(false);
    },
    onError: async(error: AxiosError<ApiResponse<ArticleinList>> | unknown) => {
      setIsLoading(false);
      statusMessage({message: error, status: "error"});
    },
  })

  useEffect(() => {
    setIsLoading(isAllArticleLoading);

    if (isAllArticleError) {
      statusMessage({ message: errorAllArticle, status: "error" });
    }
  }, [isAllArticleLoading, isAllArticleError]);
  return {
    // ADD
    addArticle,
    allArticle,
    isLoadingAddArticle,
    isAddArticleSuccess,
    isAddArticleError,
    article,
    //DELETE
    deleteArticle,
    isLoadingDeleteArticle,
    isDeleteArticleSuccess,
    isDeleteArticleError,
    //EDIT
    editArticle,
    isLoadingEditArticle,
    isEditArticleError,
    isEditArticleSucces
  };
};
