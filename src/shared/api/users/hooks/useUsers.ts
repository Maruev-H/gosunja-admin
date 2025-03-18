import { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { USERS_KEY } from "../constants";
import { UsersResponse } from "../types";

export const useUsers = (
  config?: UseQueryOptions<UsersResponse, Error>
) =>
  useQuery({
    queryKey: [USERS_KEY],
    queryFn: fetchUsers,
    ...config,
  });

const fetchUsers = async (): Promise<UsersResponse> => {
  const response = await api.get<UsersResponse>("/users");
  return response.data;
};
