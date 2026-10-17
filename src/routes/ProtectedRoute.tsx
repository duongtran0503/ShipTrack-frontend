// import { Navigate } from "react-router";

import { Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    allowedRoles?: string[];
    redirectTo?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps
) => {
    // // Lấy thông tin user từ localStorage, Zustand, Context hoặc Redux
    // const token = localStorage.getItem("accessToken");
    // const userRole = localStorage.getItem("role"); // Ví dụ: "SUPER_ADMIN", "DRIVER", "CUSTOMER"

    // // 1. Nếu chưa đăng nhập -> Chuyển về trang Login
    // if (!token) {
    //     return <Navigate to={redirectTo} replace />;
    // }

    // // 2. Nếu có yêu cầu role cụ thể mà user không có quyền -> Chuyển về 403 hoặc Dashboard tương ứng
    // if (allowedRoles && (!userRole || !allowedRoles.includes(userRole))) {
    //     return <Navigate to="/unauthorized" replace />; // Hoặc trang /403
    // }

    // 3. Đúng quyền -> Render các Route con
    return <Outlet />;
};