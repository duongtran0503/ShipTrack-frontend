
import { Navigate, type RouteObject } from "react-router"

import CustomerDashboard from "@/pages/customer/dashboard"
import AddressManagementPage from "@/pages/customer/manager-address"
import CreateOrderPage from "@/pages/customer/order/create"
import OrderDetailPage from "@/pages/customer/order/detail"
import CustomerOrdersPage from "@/pages/customer/order/manager"
import CancelledOrderPage from "@/pages/customer/order/manager/cancelled"
import CompletedOrderPage from "@/pages/customer/order/manager/completed"
import DeliveringOrderPage from "@/pages/customer/order/manager/delivering"
import WaitingForDiver from "@/pages/customer/order/manager/waiting-for-driver"
import OrderTrackingPage from "@/pages/customer/order/order-tracking"
import ProfilePage from "@/pages/customer/profile"
import ChangePasswordPage from "@/pages/customer/profile/change-password"
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
                    <ProfilePage />
                ),
            },
            {
                path: "profile/change-password",
                element: (
                    <ChangePasswordPage />
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
                    <WaitingForDiver />
                ),
            },
            {
                path: "orders/active",
                element: (
                    <DeliveringOrderPage />
                ),
            },
            {
                path: "orders/completed",
                element: (
                    <CompletedOrderPage />
                ),
            },
            {
                path: "orders/cancelled",
                element: (
                    <CancelledOrderPage />

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