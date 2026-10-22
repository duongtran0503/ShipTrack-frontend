
import { Navigate, type RouteObject } from "react-router"

import CustomerDashboard from "@/pages/customer/dashboard"
import AddressManagementPage from "@/pages/customer/manager-address"
import CreateOrderPage from "@/pages/customer/order/create"
import OrderDetailPage from "@/pages/customer/order/detail"
import CustomerOrdersPage from "@/pages/customer/order/manager"
import OrderTrackingPage from "@/pages/customer/order/order-tracking"
import UnderDevelopment from "@/routes/UnderDevelopment"

export const customerRoutes: RouteObject[] = [
    {
        path: "/customer",
        children: [
            // ==================== DASHBOARD ====================
            {
                index: true,
                element: <Navigate to="/customer/dashboard" replace />,
            },
            {
                path: "dashboard",
                element: <CustomerDashboard />,
            },

            // ==================== NHÓM 1: QUẢN LÝ TÀI KHOẢN ====================
            {
                path: "profile",
                element: (
                    <UnderDevelopment
                        title="Thông tin cá nhân"
                        description="Xem và cập nhật hồ sơ: họ tên, email, số điện thoại và ảnh đại diện."
                    />
                ),
            },
            {
                path: "profile/change-password",
                element: (
                    <UnderDevelopment
                        title="Đổi mật khẩu"
                        description="Thay đổi mật khẩu đăng nhập để bảo vệ tài khoản khỏi truy cập trái phép."
                    />
                ),
            },

            // ==================== NHÓM 2: QUẢN LÝ ĐỊA CHỈ ====================
            {
                path: "addresses",
                element: (
                    <AddressManagementPage />
                ),
            },
            {
                path: "addresses/create",
                element: (
                    <UnderDevelopment
                        title="Thêm địa chỉ mới"
                        description="Nhập địa chỉ, chọn vị trí trên bản đồ và đặt nhãn (nhà riêng, văn phòng...) để dễ nhận biết."
                    />
                ),
            },
            {
                path: "addresses/:id/edit",
                element: (
                    <UnderDevelopment
                        title="Cập nhật địa chỉ"
                        description="Chỉnh sửa thông tin địa chỉ đã lưu: địa chỉ, nhãn và vị trí trên bản đồ."
                    />
                ),
            },

            // ==================== NHÓM 3: TẠO ĐƠN HÀNG ====================
            {
                path: "orders/create",
                element: (
                    <CreateOrderPage />
                ),
            },

            // ==================== NHÓM 4 & 5: QUẢN LÝ & THEO DÕI ĐƠN HÀNG ====================
            {
                path: "orders",
                element: (
                    <CustomerOrdersPage />
                ),
            },
            {
                path: "orders/:id",
                element: <OrderDetailPage />,
            },
            {
                path: "orders/pending",
                element: (
                    <UnderDevelopment
                        title="Đơn chờ tài xế"
                        description="Các đơn đang ở trạng thái Pending hoặc SearchingDriver, chờ hệ thống điều phối tài xế nhận giao."
                    />
                ),
            },
            {
                path: "orders/active",
                element: (
                    <UnderDevelopment
                        title="Đơn đang giao"
                        description="Theo dõi real-time đơn đang trên đường: vị trí tài xế trên bản đồ, lộ trình và thời gian dự kiến còn lại."
                    />
                ),
            },
            {
                path: "orders/completed",
                element: (
                    <UnderDevelopment
                        title="Đơn đã hoàn thành"
                        description="Lịch sử các đơn đã giao thành công, xem hóa đơn và đánh giá tài xế sau khi nhận hàng."
                    />
                ),
            },
            {
                path: "orders/cancelled",
                element: (
                    <UnderDevelopment
                        title="Đơn đã hủy"
                        description="Danh sách các đơn đã hủy kèm lý do và trạng thái hoàn tiền (nếu có)."
                    />
                ),
            },

            {
                path: "orders/:id/tracking",
                element: (
                    <OrderTrackingPage />
                ),
            },
            {
                path: "orders/:id/invoice",
                element: (
                    <UnderDevelopment
                        title="Hóa đơn vận chuyển"
                        description="Chi tiết phí vận chuyển, tổng tiền và tải hóa đơn PDF (nếu có)."
                    />
                ),
            },

            // ==================== NHÓM 6: ĐÁNH GIÁ ====================
            {
                path: "reviews",
                element: (
                    <UnderDevelopment
                        title="Đánh giá của tôi"
                        description="Xem lại các đánh giá đã gửi cho tài xế, chỉnh sửa trong thời gian cho phép (24h) và xem phản hồi."
                    />
                ),
            },
            {
                path: "reviews/:id/edit",
                element: (
                    <UnderDevelopment
                        title="Chỉnh sửa đánh giá"
                        description="Cập nhật nội dung đánh giá trong thời gian cho phép (24h kể từ khi gửi)."
                    />
                ),
            },

            // ==================== NHÓM 7: THÔNG BÁO ====================
            {
                path: "notifications",
                element: (
                    <UnderDevelopment
                        title="Thông báo"
                        description="Danh sách thông báo real-time: đơn thay đổi trạng thái, tài xế nhận đơn, giao hàng thành công và khuyến mãi."
                    />
                ),
            },
        ],
    },
]