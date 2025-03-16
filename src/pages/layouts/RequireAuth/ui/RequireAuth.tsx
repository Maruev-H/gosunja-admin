import { LoadingPage } from "@/pages/LoadingPage";
import { RoleEnum } from "@/shared/constants/roleEnum";
import useAuth from "@/shared/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";

type RequireAuthProps = {
  allowedRoles: RoleEnum[];
};

export const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { auth, isLoading } = useAuth();
  const location = useLocation();

  if(isLoading) {
    return <LoadingPage />
  }

  if (!auth) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!auth?.roles?.find((role) => allowedRoles?.includes(role.value))) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
