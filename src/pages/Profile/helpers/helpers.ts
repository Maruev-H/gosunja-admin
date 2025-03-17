import { UserResponse } from "@/shared/api/profile/types";

export const getDefaultValues = (data?: UserResponse) => ({
  firstName: data?.firstName || "",
  lastName: data?.lastName || "",
  patronymic: data?.patronymic || "",
});
