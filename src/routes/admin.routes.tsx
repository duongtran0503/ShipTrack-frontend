import AdminDashboardPage from "@/pages/manager/dashboard"
import AdminDriversPage from "@/pages/manager/driver"
import AdminDriverApprovalsPage from "@/pages/manager/driver/approvals"
import AdminDriverDetailPage from "@/pages/manager/driver/detail"
import AdminDriversMapPage from "@/pages/manager/driver/map"
import AdminOnlineDriversPage from "@/pages/manager/driver/online"
import AdminReviewsPage from "@/pages/manager/manager-review"
import AdminReviewDetailPage from "@/pages/manager/manager-review/detail"
import AdminOrdersPage from "@/pages/manager/order"
import AdminOrderCancelledPage from "@/pages/manager/order/cancelled"
import AdminOrderCompletedPage from "@/pages/manager/order/completed"
import AdminOrderDeliveringPage from "@/pages/manager/order/delivering"
import AdminOrderDetailPage from "@/pages/manager/order/detaill"
import AdminOrdersWaitingDriverPage from "@/pages/manager/order/waiting-for-driver"
import AdminDriverPerformancePage from "@/pages/manager/reports/drivers"
import AdminOrderReportsPage from "@/pages/manager/reports/orders"
import AdminRevenueReportPage from "@/pages/manager/reports/revenue"
import AdminReviewsReportPage from "@/pages/manager/reports/reviews"
import AdminSystemLogsPage from "@/pages/manager/settings/logs-page"
import AdminNotificationSettingsPage from "@/pages/manager/settings/notifications"
import AdminRadiusSettingsPage from "@/pages/manager/settings/radius"
import AdminShippingFeeSettingsPage from "@/pages/manager/settings/shipping-fee"
import AdminTimeoutSettingsPage from "@/pages/manager/settings/timeout"
import AdminTrackingHistoryPage from "@/pages/manager/tracking/history"
import AdminLiveMapPage from "@/pages/manager/tracking/live-map"
import AdminUsersPage from "@/pages/manager/user"
import AdminBannedUsersPage from "@/pages/manager/user/banned"
import AdminUserDetailPageRoute from "@/pages/manager/user/detail"
import AdminVehiclesPage from "@/pages/manager/vehicles"
import AdminVehicleApprovalsPage from "@/pages/manager/vehicles/approval"
import AdminVehicleDetailPage from "@/pages/manager/vehicles/detail"
import UnderDevelopment from "@/routes/UnderDevelopment"
import { Navigate, type RouteObject } from "react-router"



export const adminRoutes: RouteObject[] = [
    {
        path: "/manager",
        children: [
            // ==================== DASHBOARD ====================
            {
                index: true,
                element: <Navigate to="/manager/dashboard" replace />,
            },
            {
                path: "dashboard",
                element: <AdminDashboardPage />,
            },

            // ==================== NHÓM 1: QUẢN LÝ NGƯỜI DÙNG ====================
            {
                path: "users",
                element: (
                    <AdminUsersPage
                    />
                ),
            },
            {
                path: "users/:id",
                element: (
                    <AdminUserDetailPageRoute
                    />
                ),
            },
            {
                path: "users/banned",
                element: (
                    <AdminBannedUsersPage
                    />
                ),
            },

            // ==================== NHÓM 2: QUẢN LÝ TÀI XẾ ====================
            {
                path: "drivers",
                element: (
                    <AdminDriversPage
                    />
                ),
            },
            {
                path: "drivers/:id",
                element: (
                    <AdminDriverDetailPage
                    />
                ),
            },

            {
                path: "drivers/approvals",
                element: (
                    <AdminDriverApprovalsPage
                    />
                ),
            },
            {
                path: "drivers/online",
                element: (
                    <AdminOnlineDriversPage
                    />
                ),
            },
            {
                path: "drivers/map",
                element: (
                    <AdminDriversMapPage
                    />
                ),
            },

            // ==================== NHÓM 3: QUẢN LÝ PHƯƠNG TIỆN ====================
            {
                path: "vehicles",
                element: (
                    <AdminVehiclesPage
                    />
                ),
            },
            {
                path: "vehicles/approvals",
                element: (
                    <AdminVehicleApprovalsPage
                    />
                ),
            },
            {
                path: "vehicles/:id",
                element: (
                    <AdminVehicleDetailPage
                    />
                ),
            },

            // ==================== NHÓM 4: QUẢN LÝ ĐƠN HÀNG ====================
            {
                path: "orders",
                element: (
                    <AdminOrdersPage
                    />
                ),
            },
            {
                path: "orders/:id",
                element: (
                    <AdminOrderDetailPage
                    />
                ),
            },
            {
                path: "orders/pending",
                element: (
                    <AdminOrdersWaitingDriverPage
                    />
                ),
            },
            {
                path: "orders/active",
                element: (
                    <AdminOrderDeliveringPage
                    />
                ),
            },
            {
                path: "orders/completed",
                element: (
                    <AdminOrderCompletedPage
                    />
                ),
            },
            {
                path: "orders/cancelled",
                element: (
                    <AdminOrderCancelledPage
                    />
                ),
            },
            {
                path: "orders/failed",
                element: (
                    <AdminOrderCancelledPage
                    />
                ),
            },

            // ==================== THEO DÕI REAL-TIME ====================
            {
                path: "tracking",
                element: (
                    <AdminTrackingHistoryPage />

                ),
            },
            {
                path: "tracking/live-map",
                element: (
                    <AdminLiveMapPage
                    />
                ),
            },

            // ==================== NHÓM 5: BÁO CÁO & THỐNG KÊ ====================
            {
                path: "reports",
                element: (
                    <UnderDevelopment
                        title="Trung tâm báo cáo & phân tích"
                        description="Bảng điều khiển BI tổng hợp: xu hướng đơn hàng, hiệu suất tài xế, thời gian giao trung bình và tỷ lệ hủy đơn."
                    />
                ),
            },
            {
                path: "reports/orders",
                element: (
                    <AdminOrderReportsPage
                    />
                ),
            },
            {
                path: "reports/revenue",
                element: (
                    <AdminRevenueReportPage
                    />
                ),
            },
            {
                path: "reports/drivers",
                element: (
                    <AdminDriverPerformancePage
                    />
                ),
            },
            {
                path: "reports/reviews",
                element: (
                    <AdminReviewsReportPage
                    />
                ),
            },

            // ==================== NHÓM 7: QUẢN LÝ ĐÁNH GIÁ ====================
            {
                path: "reviews",
                element: (
                    <AdminReviewsPage
                    />
                ),
            },
            {
                path: "reviews/:id",
                element: (
                    <AdminReviewDetailPage
                    />
                ),
            },

            // ==================== NHÓM 6: CẤU HÌNH HỆ THỐNG ====================
            {
                path: "settings",
                element: (
                    <UnderDevelopment
                        title="Thiết lập cấu hình hệ thống"
                        description="Cấu hình thông số vận hành: phí giao hàng, thời gian chờ tài xế nhận đơn, bán kính điều phối và cổng thanh toán."
                    />
                ),
            },
            {
                path: "settings/shipping-fee",
                element: (
                    <AdminShippingFeeSettingsPage
                    />
                ),
            },
            {
                path: "settings/radius",
                element: (
                    <AdminRadiusSettingsPage
                    />
                ),
            },
            {
                path: "settings/timeout",
                element: (
                    <AdminTimeoutSettingsPage

                    />
                ),
            },
            {
                path: "settings/notifications",
                element: (
                    <AdminNotificationSettingsPage

                    />
                ),
            },
            {
                path: "settings/logs",
                element: (
                    <AdminSystemLogsPage

                    />
                ),
            },
        ],
    },
]