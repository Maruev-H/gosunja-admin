import { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { USERS_KEY } from "../constants";
import { UsersResponse } from "../types";

export const useUserRoles = (
  config?: UseQueryOptions<UsersResponse, Error>
) =>
  useQuery({
    queryKey: [USERS_KEY],
    queryFn: fetchUserRoles,
    ...config,
  });

const fetchUserRoles = async (): Promise<UsersResponse> => {
  const response = await api.get<UsersResponse>("/roles");
  return response.data;
};
