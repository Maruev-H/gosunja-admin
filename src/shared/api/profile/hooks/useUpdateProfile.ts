import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { USER_PROFILE_KEY } from "../constants";
import { UseMutationOptionsWithNoFn } from "@/shared/types/ReactQueryTypes";

type RequestData = {
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  image?: File | null;
};

export const useUpdateProfile = (
  config?: UseMutationOptionsWithNoFn<RequestData>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...config,
    mutationFn: updateProdile,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [USER_PROFILE_KEY] });
      if (config?.onSuccess) {
        config?.onSuccess(data, variables, context);
      }
    },
  });
};

const updateProdile = async (data: RequestData) => {
  const formData = new FormData();

  if (typeof data.firstName !== "undefined") {
    formData.append("firstName", data.firstName);
  }

  if (typeof data.lastName !== "undefined") {
    formData.append("lastName", data.lastName);
  }

  if (typeof data.patronymic !== "undefined") {
    formData.append("patronymic", data.patronymic);
  }

  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await api.patch("/users/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
