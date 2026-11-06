import { Navigate, Outlet } from "react-router-dom";

export function PrivateRouteWrapper() {
    // Kiểm tra trực tiếp ngay lập tức trong sessionStorage của tab hiện tại mà không dùng useState(null)
    const activeEmail = sessionStorage.getItem("shiptrack_active_email");
    const sessionToken = activeEmail ? sessionStorage.getItem(`accessToken_${activeEmail}`) : null;

    const isAuthenticated = Boolean(sessionToken);

    // Nếu chưa đăng nhập, hiển thị thông báo và chuyển hướng
    if (!isAuthenticated) {
        // Dùng setTimeout nhỏ hoặc kiểm tra để tránh gọi toast nhiều lần nếu cần, 
        // nhưng với return <Navigate> thì chỉ chạy 1 lần.
        return <Navigate to="/login" replace />;
    }

    // Đã đăng nhập -> Cho phép qua trực tiếp <Outlet />
    return <Outlet />;
}