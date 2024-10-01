import { useMutation } from "react-query";
import { login as loginBridge } from "./auth_bridge";

interface IUseAuth {}

export const useAuth = (): IUseAuth => {
  const { mutate: login, isLoading: isLoadingLogin } = useMutation(
    loginBridge,
    {
      onSuccess: async (value) => {},
      onError: async (error) => {},
    }
  );

  return {};
};
