import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    allowedRoles?: string[];
    redirectTo?: string;
}

export const ProtectedRoute = ({ allowedRoles, redirectTo = "/login" }: ProtectedRouteProps) => {
    const activeEmail = sessionStorage.getItem("shiptrack_active_email");
    const currentRole = activeEmail ? (sessionStorage.getItem(`role_${activeEmail}`) || "").toUpperCase() : "";
    const currentToken = activeEmail ? sessionStorage.getItem(`accessToken_${activeEmail}`) : null;

    if (!currentToken) {
        return <Navigate to={redirectTo} replace />;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        const normalizedAllowedRoles = allowedRoles.map((r) => r.toUpperCase());

        if (!normalizedAllowedRoles.includes(currentRole)) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return <Outlet />;
};