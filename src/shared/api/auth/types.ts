import { RoleEnum } from "@/shared/constants/roleEnum";

export type JwtDecodedType = {
  phone: string;
  id: number;
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
};

export type VerifyCodeResponse = {
  accessToken: string;
  refreshToken: string;
};
