import { RoleEnum } from "@/shared/constants/roleEnum";

export type User = {
  id: number;
  phone: string;
  otp: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  banned: true;
  banReason: string;
  image: string;
};

export type UsersResponse = User[];

export type UserRole = {
  id: number;
  value: RoleEnum;
  description: string;
};

export type UserRolesResponse = UserRole[];
