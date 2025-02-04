import ArticleRequest from "@/data/models/article/request/article_request";
import ApiResponse from "@/data/models/base/api-base-response";
import { useCentralStore } from "@/store";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  UseMutateFunction,
  useMutation,
} from "react-query";
import {
  addArticle as addArticleBridge,
  deleteArticle as deleteArticleBridge,
  editArticle as editArticleBridge,
  useGetAllArticleQuery,
} from "./article_bridge";
import { statusMessage } from "@/utils";
import { AxiosError } from "axios";
import { Article } from "@/data/models/article/response/article";
import ListDataRequest from "@/data/models/base/list_data_request";

interface IUseArticle {
  addArticle: UseMutateFunction<
    ApiResponse<Article>,
    unknown,
    ArticleRequest,
    unknown
  >;
  allArticle: ApiResponse<Article[]> | undefined;
  refetchAllArticle: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<ApiResponse<Article[]>, unknown>>;
  isAllArticleLoading: boolean;
  isLoadingAddArticle: boolean;
  isAddArticleSuccess: boolean;
  isAddArticleError: boolean;
  article: Article | undefined;

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
    ApiResponse<Article>,
    unknown,
    {
      id: number | string;
      request: ArticleRequest;
    },
    unknown
  >;
  isLoadingEditArticle: boolean;
  isEditArticleSuccess: boolean;
  isEditArticleError: boolean;

  filter: ListDataRequest;
  setFilter: Dispatch<SetStateAction<ListDataRequest>>;
}

export const useArticle = (): IUseArticle => {
  const { setIsLoading } = useCentralStore();

  const [article, setArticle] = useState<Article>();

  const [filter, setFilter] = useState<ListDataRequest>({
    page: 1,
    limit: 10,
    search: "",
  });

  //GET ALL ARTICLE
  const {
    data: allArticle,
    isLoading: isAllArticleLoading,
    isError: isAllArticleError,
    error: errorAllArticle,
    refetch: refetchAllArticle,
  } = useGetAllArticleQuery(filter);

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
      window.location.reload();
    },
    onError: async (error: AxiosError<ApiResponse<Article>> | unknown) => {
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
      refetchAllArticle();

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
  const {
    mutate: editArticle,
    isLoading: isLoadingEditArticle,
    isSuccess: isEditArticleSuccess,
    isError: isEditArticleError,
  } = useMutation(editArticleBridge, {
    onSuccess: async (value) => {
      refetchAllArticle();
      statusMessage({ message: value.message, status: "success" });
      setIsLoading(false);
      window.location.reload();
    },
    onError: async (error: AxiosError<ApiResponse<Article>> | unknown) => {
      setIsLoading(false);
      statusMessage({ message: error, status: "error" });
    },
  });

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
    isAllArticleLoading,
    refetchAllArticle,
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
    isEditArticleSuccess,

    filter,
    setFilter,
  };
};
