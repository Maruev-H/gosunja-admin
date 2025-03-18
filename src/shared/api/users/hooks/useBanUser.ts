import { UseMutationOptionsWithNoFn } from "@/shared/types/ReactQueryTypes";
import { useMutation } from "@tanstack/react-query";
import api from "../../api";
import { UUID } from "@/shared/types/common";

export type RequestData = {
  userId: UUID;
  banReason: string;
};

export const useBanUser = (
  config?: UseMutationOptionsWithNoFn<RequestData>
) =>
  useMutation({
    ...config,
    mutationFn: banUser,
  });

const banUser = async ({ banReason, userId }: RequestData) => {
  const response = await api.post("users/ban", {
    banReason,
    userId,
  });
  return response.data;
};
