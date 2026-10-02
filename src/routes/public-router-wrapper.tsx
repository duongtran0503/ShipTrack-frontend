import { useLayoutEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

interface PublicRouteProps {
    children?: React.ReactNode;
}

export const PublicRouteWrapper = ({
    children,

}: PublicRouteProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const location = useLocation();

    useLayoutEffect(() => {
        // -------------------------------------------------------------
        // LOGIC CHECK TOKEN:
        // Tạm thời để true để xây dựng giao diện trước.
        // Sau này thay bằng: const token = localStorage.getItem("accessToken");
        // -------------------------------------------------------------
        const checkAuthToken = () => {
            const mockTokenValid = localStorage.getItem("token");

            if (mockTokenValid) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        };

        checkAuthToken();
    }, []);

    const pathname = location.pathname;
    const ignorePath = ['/login',];

    // Đã đăng nhập + đang ở trang public → đá về trang chính
    if (isAuthenticated && ignorePath.includes(pathname)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};