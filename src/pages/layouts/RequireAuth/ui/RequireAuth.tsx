import { RoleEnum } from "@/shared/constants/roleEnum";
import useAuth from "@/shared/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";

type RequireAuthProps = {
    allowedRoles: RoleEnum[]
}

export const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}
