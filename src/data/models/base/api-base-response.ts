type MetaPage = {
  page: number;
  limit: number;
  isLastPage: boolean;
  total: number;
};

export default interface ApiResponse<T> {
  status: boolean;
  message: string[];
  data: T;
  metaPage?: MetaPage | undefined;
}
