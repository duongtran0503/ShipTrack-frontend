import { useLayoutEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";

export function PublicRouteWrapper() {
    const [authData, setAuthData] = useState<{
        isLoggedIn: boolean;
        dashboardPath: string;
    } | null>(null);

    const location = useLocation();

    useLayoutEffect(() => {
        const checkExistingAuth = () => {
            // Nếu KHÔNG phải đang đứng ở trang /login thì bỏ qua
            if (location.pathname !== "/login") {
                setAuthData({ isLoggedIn: false, dashboardPath: "/login" });
                return;
            }

            const activeEmail = sessionStorage.getItem("shiptrack_active_email");
            const sessionToken = activeEmail ? sessionStorage.getItem(`accessToken_${activeEmail}`) : null;

            if (!sessionToken || !activeEmail) {
                setAuthData({ isLoggedIn: false, dashboardPath: "/login" });
                return;
            }

            const role = (sessionStorage.getItem(`role_${activeEmail}`) || "").toUpperCase();

            let targetDashboard = "/customer/dashboard";
            if (role === "ADMIN" || role === "SUPER_ADMIN") {
                targetDashboard = "/manager/dashboard";
            } else if (["DRIVER", "DRIVER_EXPRESS", "DRIVER_TRUCK", "DRIVER_CONTAINER"].includes(role)) {
                targetDashboard = "/driver/dashboard";
            }

            // 💡 Bắn toast thông báo người dùng đã đăng nhập khi họ cố vào trang login
            toast.info("Bạn đã đăng nhập rồi, đang chuyển hướng về trang quản lý...");

            setAuthData({ isLoggedIn: true, dashboardPath: targetDashboard });
        };

        checkExistingAuth();
    }, [location.pathname]);

    if (authData === null) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-slate-100">
                <p className="animate-pulse text-sm">Đang tải...</p>
            </div>
        );
    }

    // Nếu đã đăng nhập và đang ở /login -> Đá thẳng về dashboard
    if (authData.isLoggedIn && location.pathname === "/login") {
        return <Navigate to={authData.dashboardPath} replace />;
    }

    return <Outlet />;
}