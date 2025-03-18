import { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { USER_ROLES_KEY } from "../constants";
import { UserRolesResponse } from "../types";

export const useUserRoles = (
  config?: UseQueryOptions<UserRolesResponse, Error>
) =>
  useQuery({
    queryKey: [USER_ROLES_KEY],
    queryFn: fetchUserRoles,
    ...config,
  });

const fetchUserRoles = async (): Promise<UserRolesResponse> => {
  const response = await api.get<UserRolesResponse>("/roles");
  return response.data;
};
