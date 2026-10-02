import { useLayoutEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

export function PrivateRouteWrapper() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

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

    // Trong lúc chờ useLayoutEffect check token (nếu có async/sync nhanh)
    if (isAuthenticated === null) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-slate-100">
                <p className="animate-pulse text-sm">Đang kiểm tra quyền truy cập...</p>
            </div>
        );
    }

    // Nếu đã xác thực -> Cho phép truy cập các Route con qua <Outlet />
    // Nếu chưa xác thực -> Chuyển hướng sang trang Login
    if (!isAuthenticated) {
        toast.error("Vui lòng đăng nhập để sử dụng")
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}