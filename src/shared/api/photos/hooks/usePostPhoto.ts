import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import { UseMutationOptionsWithNoFn } from "@/shared/types/ReactQueryTypes";
import { getPhotosKey } from "../constants";

type RequestData = {
  description: string;
  isPublic: boolean;
  image: File | null;
};

export const usePostPhoto = (
  config?: UseMutationOptionsWithNoFn<RequestData>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...config,
    mutationFn: postPhoto,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [getPhotosKey(data.isPublic)] });
      if (config?.onSuccess) {
        config?.onSuccess(data, variables, context);
      }
    },
  });
};

const postPhoto = async (data: RequestData) => {
  const formData = new FormData();

  if (typeof data.description !== "undefined") {
    formData.append("description", data.description);
  }

  if (typeof data.isPublic !== "undefined") {
    formData.append("isPublic", data.isPublic ? "true" : "false");
  }

  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await api.post("/photos", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
