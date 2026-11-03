import DriverAvailabilityPage from "@/pages/driver/availability"
import DriverChangePasswordPage from "@/pages/driver/change-password"
import DriverDashboard from "@/pages/driver/dashboard"
import DriverEarningsPage from "@/pages/driver/earnings"
import DriverStatisticsPage from "@/pages/driver/earnings/statistics"
import DriverLicensePage from "@/pages/driver/license"
import ActiveOrdersPage from "@/pages/driver/order/active"
import ActiveOrderDetailPage from "@/pages/driver/order/active/detail"
import OrderRoutePage from "@/pages/driver/order/active/route"
import AvailableOrdersPage from "@/pages/driver/order/available"
import AvailableOrderDetailPage from "@/pages/driver/order/available/detail"
import DriverHistoryPage from "@/pages/driver/order/history"
import DriverProfilePage from "@/pages/driver/profile"
import DriverVehiclePage from "@/pages/driver/vehicle"
import VehicleEditPage from "@/pages/driver/vehicle/edit"
import VehicleRegisterPage from "@/pages/driver/vehicle/register"
import VehicleReplacePage from "@/pages/driver/vehicle/replace"
import UnderDevelopment from "@/routes/UnderDevelopment"
import { Navigate, type RouteObject } from "react-router"



export const driverRoutes: RouteObject[] = [
    {
        path: "/driver",
        children: [
            // ==================== DASHBOARD ====================
            {
                index: true,
                element: <Navigate to="/driver/dashboard" replace />,
            },
            {
                path: "dashboard",
                element: <DriverDashboard />,
            },

            // ==================== NHÓM 1: QUẢN LÝ TÀI KHOẢN ====================
            {
                path: "profile",
                element: (
                    <DriverProfilePage />
                ),
            },
            {
                path: "profile/license",
                element: (
                    <DriverLicensePage />
                ),
            },
            {
                path: "profile/change-password",
                element: (
                    <DriverChangePasswordPage />
                ),
            },

            // ==================== NHÓM 3: TRẠNG THÁI HOẠT ĐỘNG ====================
            {
                path: "availability",
                element: (
                    <DriverAvailabilityPage />
                ),
            },

            // ==================== NHÓM 4: NHẬN ĐƠN HÀNG ====================
            {
                path: "orders/available",
                element: (
                    <AvailableOrdersPage />
                ),
            },
            {
                path: "orders/available/:id",
                element: (
                    <AvailableOrderDetailPage />
                ),
            },

            // ==================== NHÓM 5: ĐƠN ĐANG THỰC HIỆN ====================
            {
                path: "orders/active",
                element: (
                    <ActiveOrdersPage
                    />
                ),
            },
            {
                path: "orders/active/:id",
                element: (
                    <ActiveOrderDetailPage
                    />
                ),
            },
            {
                path: "orders/history",
                element: (
                    <DriverHistoryPage
                    />
                ),
            },
            {
                path: "orders/history/:id",
                element: (
                    <OrderRoutePage
                    />
                ),
            },



            // ==================== NHÓM 2: QUẢN LÝ PHƯƠNG TIỆN ====================
            {
                path: "vehicles",
                element: (
                    <DriverVehiclePage
                    />
                ),
            },
            {
                path: "vehicles/create",
                element: (
                    <VehicleRegisterPage

                    />
                ),
            },
            {
                path: "vehicles/:id/edit",
                element: (
                    <VehicleEditPage

                    />
                ),
            },
            {
                path: "vehicles/replace",
                element: (
                    <VehicleReplacePage

                    />
                ),
            },


            {
                path: "earnings",
                element: (
                    <DriverEarningsPage
                    />
                ),
            },
            {
                path: "earnings/statistics",
                element: (
                    <DriverStatisticsPage
                    />
                ),
            },

            // ==================== NHÓM 7: ĐÁNH GIÁ ====================
            {
                path: "reviews",
                element: (
                    <UnderDevelopment
                        title="Đánh giá của khách hàng"
                        description="Xem tất cả đánh giá từ khách hàng về bạn: số sao, nhận xét, đơn hàng liên quan và điểm đánh giá trung bình."
                    />
                ),
            },
            {
                path: "reviews/:id",
                element: (
                    <UnderDevelopment
                        title="Chi tiết đánh giá"
                        description="Xem chi tiết đánh giá: số sao, nhận xét, đơn hàng liên quan và thông tin khách hàng đánh giá."
                    />
                ),
            },

            // ==================== NHÓM 8: THÔNG BÁO ====================
            {
                path: "notifications",
                element: (
                    <UnderDevelopment
                        title="Thông báo"
                        description="Danh sách thông báo: đơn mới phù hợp, đơn bị hủy, đổi tài xế và các cập nhật quan trọng khác từ hệ thống."
                    />
                ),
            },
        ],
    },
]