import { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { UserResponse } from "../types";
import { USER_PROFILE_KEY } from "../constants";

export const useUserProfile = (
  config?: UseQueryOptions<UserResponse, Error>
) =>
  useQuery({
    queryKey: [USER_PROFILE_KEY],
    queryFn: fetchUserProfile,
    ...config,
  });

const fetchUserProfile = async (): Promise<UserResponse> => {
  const response = await api.get<UserResponse>("/users/me");
  return response.data;
};
