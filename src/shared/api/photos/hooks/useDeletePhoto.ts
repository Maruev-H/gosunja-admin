import { UseMutationOptionsWithNoFn } from "@/shared/types/ReactQueryTypes";
import { useMutation } from "@tanstack/react-query";
import api from "../../api";
import { UUID } from "@/shared/types/common";

export type RequestData = {
  id: UUID;
};

export const useDeletePhoto = (
  config?: UseMutationOptionsWithNoFn<RequestData>
) =>
  useMutation({
    ...config,
    mutationFn: deletePhoto,
  });

const deletePhoto = async ({ id }: RequestData) => {
  const response = await api.delete(`photos/${id}`);
  return response.data;
};
