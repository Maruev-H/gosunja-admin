import { RoleEnum } from "@/shared/constants/roleEnum";
import { TimeStamp } from "@/shared/types/common";

export type UserResponse = {
  id: number;
  phone: string;
  otp: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  banned: boolean;
  banReason: string;
  image: string;
  roles: [
    {
      id: number;
      value: RoleEnum;
      description: string;
      createdAt: string;
      updatedAt: string;
      UserRoles: {
        id: number;
        roleId: number;
        userId: number;
      };
    }
  ];
  createdAt: TimeStamp;
  updatedAt: TimeStamp;
};
