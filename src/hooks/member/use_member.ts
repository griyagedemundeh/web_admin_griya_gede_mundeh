import ApiResponse from "@/data/models/base/api-base-response";
import MemberRequest from "@/data/models/member/request/member_request";
import Member from "@/data/models/member/response/member";
import { useCentralStore } from "@/store";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  UseMutateFunction,
  useMutation,
} from "react-query";
import {
  addMember as addMemberBridge,
  deleteMember as deleteMemberBridge,
  editMember as editMemberBridge,
  createMemberAddress as createMemberAddressBridge,
  useGetAllMemberQuery,
  useGetMemberAddressQuery,
} from "./member_bridge";
import { showToast } from "@/utils";
import { AxiosError } from "axios";
import { useEffect } from "react";
import User from "@/data/models/user/response/user";
import MemberAddress from "@/data/models/user/response/address";
import Address from "@/data/models/member/response/address";
import MemberAddressRequest from "@/data/models/member/request/member_address_request";

interface IUseMember {
  addMember: UseMutateFunction<
    ApiResponse<Member>,
    unknown,
    MemberRequest,
    unknown
  >;

  editMember: UseMutateFunction<
    ApiResponse<User | MemberAddress>,
    unknown,
    {
      id: number | string;
      request: MemberRequest;
    },
    unknown
  >;
  deleteMember: UseMutateFunction<
    ApiResponse<null>,
    unknown,
    {
      id: number | string;
    },
    unknown
  >;
  allMember: ApiResponse<Member[]> | undefined;
  allAddress: ApiResponse<Address[]> | undefined;
  refecthAllAddress: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<ApiResponse<Address[]>, unknown>>;
  createMemberAddress: UseMutateFunction<
    ApiResponse<MemberAddress>,
    unknown,
    MemberAddressRequest,
    unknown
  >;

  isLoadingAddMember: boolean;
  isAddMemberSuccess: boolean;
  isAddMemberError: boolean;
  isLoadingEditMember: boolean;
  isEditMemberSuccess: boolean;
  isEditMemberError: boolean;
  isLoadingDeleteMember: boolean;
  isDeleteMemberSuccess: boolean;
  isDeleteMemberError: boolean;

  isLoadingCreateMemberAddress: boolean;
  isCreateMemberAddressSuccess: boolean;
  isCreateMemberAddressError: boolean;
}

export const useMember = ({
  userId,
}: {
  userId?: number | string;
}): IUseMember => {
  const { setIsLoading } = useCentralStore();

  //get all list member
  const {
    data: allMember,
    isLoading: isAllMemberLoading,
    isError: isAllMemberError,
    error: errorAllMember,
    refetch: refecthAllMember,
  } = useGetAllMemberQuery({ limit: 100, page: 1 });

  const {
    data: allAddress,
    isLoading: isAllAddressLoading,
    isError: isAllAddressError,
    error: errorAllAddress,
    refetch: refecthAllAddress,
  } = useGetMemberAddressQuery({ userId: userId ?? 0 });

  // ADD
  const {
    mutate: addMember,
    isLoading: isLoadingAddMember,
    isSuccess: isAddMemberSuccess,
    isError: isAddMemberError,
  } = useMutation(addMemberBridge, {
    onSuccess: async (value) => {
      value.message.forEach((message) => {
        showToast({ status: "success", message: message });
      });

      setIsLoading(false);
      window.location.reload();
    },
    onError: async (error: AxiosError<ApiResponse<Member>> | unknown) => {
      setIsLoading(false);
      if (error instanceof Array) {
        error.forEach((message) => {
          showToast({ status: "error", message: `${message}` });
        });
        return;
      }
      showToast({ status: "error", message: `${error}` });
    },
  });

  // EDIT
  const {
    mutate: editMember,
    isLoading: isLoadingEditMember,
    isSuccess: isEditMemberSuccess,
    isError: isEditMemberError,
  } = useMutation(editMemberBridge, {
    onSuccess: async (value) => {
      value.message.forEach((message) => {
        showToast({ status: "success", message: message });
      });

      setIsLoading(false);
      window.location.reload();
    },
    onError: async (error: AxiosError<ApiResponse<Member>> | unknown) => {
      setIsLoading(false);
      if (error instanceof Array) {
        error.forEach((message) => {
          showToast({ status: "error", message: `${message}` });
        });
        return;
      }
      showToast({ status: "error", message: `${error}` });
    },
  });

  // DELETE
  const {
    mutate: deleteMember,
    isLoading: isLoadingDeleteMember,
    isSuccess: isDeleteMemberSuccess,
    isError: isDeleteMemberError,
  } = useMutation(deleteMemberBridge, {
    onSuccess: async (value) => {
      refecthAllMember();

      if (value instanceof Array) {
        value.forEach((message) => {
          showToast({ status: "success", message: `${message}` });
        });
        return;
      }
      showToast({ status: "success", message: `${value.message}` });

      setIsLoading(false);

      window.location.reload();
    },
    onError: async (error: AxiosError<ApiResponse<null>> | unknown) => {
      setIsLoading(false);
      if (error instanceof Array) {
        error.forEach((message) => {
          showToast({ status: "error", message: `${message}` });
        });
        return;
      }
      showToast({ status: "error", message: `${error}` });
    },
  });

  const {
    mutate: createMemberAddress,
    isLoading: isLoadingCreateMemberAddress,
    isSuccess: isCreateMemberAddressSuccess,
    isError: isCreateMemberAddressError,
  } = useMutation(createMemberAddressBridge, {
    onSuccess: async (value) => {
      value.message.forEach((message) => {
        showToast({ status: "success", message: message });
      });

      setIsLoading(false);
      refecthAllAddress();
    },
    onError: async (error: AxiosError<ApiResponse<Member>> | unknown) => {
      setIsLoading(false);
      if (error instanceof Array) {
        error.forEach((message) => {
          showToast({ status: "error", message: `${message}` });
        });
        return;
      }
      showToast({ status: "error", message: `${error}` });
    },
  });

  useEffect(() => {
    setIsLoading(isAllMemberLoading);

    if (isAllMemberError) {
      (errorAllMember as any).forEach((message: any) => {
        showToast({ status: "error", message: `${message}` });
      });
    }
  }, [isAllMemberLoading, isAllMemberError]);

  return {
    addMember,
    allMember,
    allAddress,
    refecthAllAddress,
    isLoadingAddMember,
    isAddMemberSuccess,
    isAddMemberError,
    createMemberAddress,
    isCreateMemberAddressError,
    isCreateMemberAddressSuccess,
    isLoadingCreateMemberAddress,
    editMember,
    isEditMemberError,
    isEditMemberSuccess,
    isLoadingEditMember,
    deleteMember,
    isDeleteMemberError,
    isDeleteMemberSuccess,
    isLoadingDeleteMember,
  };
};
