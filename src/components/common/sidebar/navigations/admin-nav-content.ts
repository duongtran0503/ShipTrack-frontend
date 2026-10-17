
import type { NavItemType } from "@/components/common/sidebar/navigations/type"
import {
    BarChart3,
    ClipboardList,
    LayoutDashboard,
    MapPinned,
    Package,
    Settings,
    Star,
    Truck,
    Users,
} from "lucide-react"

export const ADMIN_NAV_ITEMS: NavItemType[] = [
    // ==================== DASHBOARD (5.1) ====================
    {
        id: "dashboard",
        label: "Tổng quan",
        icon: LayoutDashboard,
        href: "/manager/dashboard",
        listUrl: ["/manager/dashboard"],
        // Chức năng: Xem chỉ số tổng quan — đơn mới, tài xế online, đơn đang giao, doanh thu
    },

    // ==================== NHÓM 1: QUẢN LÝ NGƯỜI DÙNG ====================
    {
        id: "users",
        label: "Quản lý người dùng",
        icon: Users,
        href: "/manager/users",
        listUrl: [
            "/manager/users",
            "/manager/users/customers",
            "/manager/users/banned",
            "/manager/users/:id",
        ],
        children: [
            { label: "Tất cả người dùng", href: "/manager/users" },           // 1.1
            { label: "Khách hàng", href: "/manager/users/customers" },        // 1.1
            { label: "Tài khoản bị khóa", href: "/manager/users/banned" },    // 1.5
        ],
        // Chức năng nhóm 1: Xem danh sách, chi tiết, tạo, cập nhật, khóa/mở khóa, reset mật khẩu
    },

    // ==================== NHÓM 2: QUẢN LÝ TÀI XẾ ====================
    {
        id: "drivers",
        label: "Quản lý tài xế",
        icon: Truck,
        href: "/manager/drivers",
        listUrl: [
            "/manager/drivers",
            "/manager/drivers/approvals",
            "/manager/drivers/online",
            "/manager/drivers/map",
            "/manager/drivers/:id",
        ],
        children: [
            { label: "Danh sách tài xế", href: "/manager/drivers" },          // 2.1
            { label: "Duyệt hồ sơ tài xế", href: "/manager/drivers/approvals" }, // 2.2
            { label: "Tài xế đang online", href: "/manager/drivers/online" }, // 2.1
            { label: "Bản đồ vị trí tài xế", href: "/manager/drivers/map" },  // 2.5
        ],
        // Chức năng nhóm 2: Xem danh sách, phê duyệt, chi tiết, khóa/mở, bản đồ real-time, đánh giá
    },

    // ==================== NHÓM 3: QUẢN LÝ PHƯƠNG TIỆN ====================
    {
        id: "vehicles",
        label: "Quản lý phương tiện",
        icon: Package,
        href: "/manager/vehicles",
        listUrl: [
            "/manager/vehicles",
            "/manager/vehicles/approvals",
            "/manager/vehicles/:id",
        ],
        children: [
            { label: "Danh sách xe", href: "/manager/vehicles" },             // 3.1
            { label: "Duyệt phương tiện", href: "/manager/vehicles/approvals" }, // 3.6
        ],
        // Chức năng nhóm 3: Xem danh sách, chi tiết, thêm, cập nhật, xóa, duyệt phương tiện
    },

    // ==================== NHÓM 4: QUẢN LÝ ĐƠN HÀNG ====================
    {
        id: "orders",
        label: "Quản lý đơn hàng",
        icon: ClipboardList,
        href: "/manager/orders",
        listUrl: [
            "/manager/orders",
            "/manager/orders/pending",
            "/manager/orders/active",
            "/manager/orders/completed",
            "/manager/orders/cancelled",
            "/manager/orders/:id",
        ],
        children: [
            { label: "Tất cả đơn hàng", href: "/manager/orders" },            // 4.1
            { label: "Đơn chờ tài xế", href: "/manager/orders/pending" },     // 4.1
            { label: "Đang giao", href: "/manager/orders/active" },           // 4.1
            { label: "Hoàn thành", href: "/manager/orders/completed" },       // 4.1
            { label: "Đã hủy", href: "/manager/orders/cancelled" },           // 4.1
        ],
        // Chức năng nhóm 4: Xem tất cả, chi tiết, tìm kiếm, hủy, gán/đổi tài xế, gia hạn, lịch sử, real-time
    },

    // ==================== THEO DÕI REAL-TIME ====================
    {
        id: "tracking",
        label: "Theo dõi Real-time",
        icon: MapPinned,
        href: "/manager/tracking",
        listUrl: [
            "/manager/tracking",
            "/manager/tracking/live-map",
        ],
        children: [
            { label: "Bản đồ trực tiếp", href: "/manager/tracking/live-map" }, // 4.9
            { label: "Lịch sử hành trình", href: "/manager/tracking" },         // 4.8
        ],
        // Chức năng: Bản đồ real-time qua SignalR — xem vị trí tài xế, đơn đang giao
    },

    // ==================== NHÓM 5: BÁO CÁO & THỐNG KÊ ====================
    {
        id: "reports",
        label: "Báo cáo & Thống kê",
        icon: BarChart3,
        href: "/manager/reports",
        listUrl: [
            "/manager/reports",
            "/manager/reports/orders",
            "/manager/reports/revenue",
            "/manager/reports/drivers",
            "/manager/reports/reviews",
        ],
        children: [
            { label: "Thống kê đơn hàng", href: "/manager/reports/orders" },   // 5.2
            { label: "Doanh thu", href: "/manager/reports/revenue" },          // 5.3
            { label: "Hiệu suất tài xế", href: "/manager/reports/drivers" },   // 5.4
            { label: "Báo cáo đánh giá", href: "/manager/reports/reviews" },   // 5.5
        ],
        // Chức năng nhóm 5: Dashboard, báo cáo đơn, doanh thu, hiệu suất, đánh giá, xuất Excel/PDF
    },

    // ==================== NHÓM 7: QUẢN LÝ ĐÁNH GIÁ ====================
    {
        id: "reviews",
        label: "Quản lý đánh giá",
        icon: Star,
        href: "/manager/reviews",
        listUrl: [
            "/manager/reviews",
            "/manager/reviews/:id",
        ],
        // Chức năng nhóm 7: Xem tất cả, chi tiết, xóa đánh giá vi phạm, phản hồi đánh giá
    },

    // ==================== NHÓM 6: CẤU HÌNH HỆ THỐNG ====================
    {
        id: "settings",
        label: "Cấu hình hệ thống",
        icon: Settings,
        href: "/manager/settings",
        listUrl: [
            "/manager/settings",
            "/manager/settings/shipping-fee",
            "/manager/settings/radius",
            "/manager/settings/timeout",
            "/manager/settings/notifications",
            "/manager/settings/logs",
        ],
        children: [
            { label: "Phí vận chuyển", href: "/manager/settings/shipping-fee" }, // 6.1
            { label: "Bán kính tìm tài xế", href: "/manager/settings/radius" },  // 6.2
            { label: "Thời gian timeout", href: "/manager/settings/timeout" },   // 6.3
            { label: "Thông báo", href: "/manager/settings/notifications" },     // 6.4
            { label: "Log hệ thống", href: "/manager/settings/logs" },           // 6.5
        ],
        // Chức năng nhóm 6: Cấu hình phí, bán kính, timeout, thông báo, xem log hệ thống
    },
]