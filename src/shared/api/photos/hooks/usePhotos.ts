import { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { GetPhotoRespons } from "../types";
import { getPhotosKey } from "../constants";

export const usePhotos = ({
  isPublic,
  config,
}: {
  isPublic: boolean;
  config?: UseQueryOptions<GetPhotoRespons, Error>;
}) =>
  useQuery({
    queryKey: [getPhotosKey(isPublic)],
    queryFn: () => fetchPhotos(isPublic),
    ...config,
  });

const fetchPhotos = async (isPublic: boolean): Promise<GetPhotoRespons> => {
  const response = await api.get<GetPhotoRespons>(
    `/photos/${isPublic ? "public" : "my"}`
  );
  return response.data;
};
