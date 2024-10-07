type Meta = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl?: null | string;
  previousPageUrl?: null | string;
};

export default interface ApiResponse<T> {
  status: boolean;
  message: string[];
  data: T;
  meta?: Meta | undefined;
}
