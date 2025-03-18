import { UseMutationOptionsWithNoFn } from "@/shared/types/ReactQueryTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { RoleEnum } from "@/shared/constants/roleEnum";
import { UUID } from "@/shared/types/common";
import { USER_PROFILE_KEY } from "../../profile/constants";

export type RequestData = {
  value: RoleEnum;
  userId: UUID;
};

export const useSetUserRole = (
  config?: UseMutationOptionsWithNoFn<RequestData>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...config,
    mutationFn: setUserRole,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: [USER_PROFILE_KEY] });
      if (config?.onSuccess) {
        config?.onSuccess(...args);
      }
    },
  });
};

const setUserRole = async ({ value, userId }: RequestData) => {
  const response = await api.post("users/role", {
    value,
    userId,
  });
  return response.data;
};
