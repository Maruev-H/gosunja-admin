import Profile from "@mui/icons-material/ManageAccounts";
import CollectionsIcon from "@mui/icons-material/Collections";
import SecurityIcon from "@mui/icons-material/Security";
import StorefrontIcon from "@mui/icons-material/Storefront";
import useAuth from "@/shared/hooks/useAuth";
import { RoleEnum } from "@/shared/constants/roleEnum";

export const useUserRoutes = () => {
  const { auth } = useAuth();
  return [
    {
      title: "Профиль",
      path: "/",
      icon: <Profile />,
      allowedRoles: [RoleEnum.ESTABLISHMENT, RoleEnum.ADMIN],
    },
    {
      title: "Аккаунты",
      path: "/accounts",
      icon: <SecurityIcon />,
      allowedRoles: [RoleEnum.ADMIN],
    },
    {
      title: "Галерея",
      path: "/gallery",
      icon: <CollectionsIcon />,
      allowedRoles: [RoleEnum.ESTABLISHMENT],
    },
    {
      title: "Ассортимент",
      path: "/staff",
      icon: <StorefrontIcon />,
      allowedRoles: [RoleEnum.ESTABLISHMENT],
    },
  ].filter(
    (route) =>
      auth?.roles?.find((role) => route.allowedRoles?.includes(role.value))
  );
};
