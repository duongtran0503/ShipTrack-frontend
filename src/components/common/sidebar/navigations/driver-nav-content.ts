import type { NavItemType } from "@/components/common/sidebar/navigations/type"
import {
    Bell,
    Car,
    ClipboardList,
    History,
    LayoutDashboard,
    Package,
    Star,
    User,
    Wallet,
    Zap,
} from "lucide-react"

export const DRIVER_NAV_ITEMS: NavItemType[] = [
    // ==================== DASHBOARD ====================
    {
        id: "dashboard",
        label: "Tổng quan",
        icon: LayoutDashboard,
        href: "/driver/dashboard",
        listUrl: ["/driver/dashboard"],
        // Chức năng: Xem tổng quan — trạng thái, đơn đang giao, thu nhập hôm nay, đánh giá
    },

    // ==================== NHÓM 1: QUẢN LÝ TÀI KHOẢN ====================
    {
        id: "profile",
        label: "Tài khoản của tôi",
        icon: User,
        href: "/driver/profile",
        listUrl: [
            "/driver/profile",
            "/driver/profile/license",
            "/driver/profile/change-password",
        ],
        children: [
            { label: "Thông tin cá nhân", href: "/driver/profile" },              // 1.4, 1.5
            { label: "Thông tin bằng lái", href: "/driver/profile/license" },     // 1.6
            { label: "Đổi mật khẩu", href: "/driver/profile/change-password" },   // 1.7
        ],
        // Chức năng nhóm 1: Xem/cập nhật hồ sơ, bằng lái, đổi mật khẩu
    },

    // ==================== NHÓM 3: TRẠNG THÁI HOẠT ĐỘNG ====================
    {
        id: "availability",
        label: "Trạng thái hoạt động",
        icon: Zap,
        href: "/driver/availability",
        listUrl: ["/driver/availability"],
        // Chức năng nhóm 3: Bật/tắt sẵn sàng nhận đơn, xem trạng thái hiện tại
    },

    // ==================== NHÓM 4: NHẬN ĐƠN HÀNG ====================
    {
        id: "available-orders",
        label: "Đơn hàng khả dụng",
        icon: Package,
        href: "/driver/orders/available",
        listUrl: [
            "/driver/orders/available",
            "/driver/orders/available/:id",
        ],
        // Chức năng nhóm 4: Xem đơn đang tìm tài xế, chi tiết, lộ trình, nhận/từ chối đơn
    },

    // ==================== NHÓM 5: ĐƠN ĐANG THỰC HIỆN ====================
    {
        id: "active-orders",
        label: "Đơn đang thực hiện",
        icon: ClipboardList,
        href: "/driver/orders/active",
        listUrl: [
            "/driver/orders/active",
            "/driver/orders/active/:id",
            "/driver/orders/active/:id/route",
        ],
        // Chức năng nhóm 5: Xem đơn đã nhận, cập nhật trạng thái, GPS, lộ trình, xác nhận giao
    },

    // ==================== NHÓM 2: QUẢN LÝ PHƯƠNG TIỆN ====================
    {
        id: "vehicles",
        label: "Phương tiện của tôi",
        icon: Car,
        href: "/driver/vehicles",
        listUrl: [
            "/driver/vehicles",
            "/driver/vehicles/create",
            "/driver/vehicles/:id/edit",
        ],
        // Chức năng nhóm 2: Xem danh sách, thêm, cập nhật, xóa, đặt xe mặc định
    },

    // ==================== NHÓM 6: LỊCH SỬ & THU NHẬP ====================
    {
        id: "history",
        label: "Lịch sử chuyến đi",
        icon: History,
        href: "/driver/history",
        listUrl: [
            "/driver/history",
            "/driver/history/:id",
        ],
        // Chức năng nhóm 6.1, 6.2: Xem lịch sử chuyến đi, chi tiết chuyến
    },
    {
        id: "earnings",
        label: "Thu nhập",
        icon: Wallet,
        href: "/driver/earnings",
        listUrl: [
            "/driver/earnings",
            "/driver/earnings/statistics",
        ],
        children: [
            { label: "Thu nhập", href: "/driver/earnings" },                     // 6.3
            { label: "Thống kê cá nhân", href: "/driver/earnings/statistics" },  // 6.4
        ],
        // Chức năng nhóm 6.3–6.5: Thu nhập, thống kê, xuất báo cáo
    },

    // ==================== NHÓM 7: ĐÁNH GIÁ ====================
    {
        id: "reviews",
        label: "Đánh giá của tôi",
        icon: Star,
        href: "/driver/reviews",
        listUrl: [
            "/driver/reviews",
            "/driver/reviews/:id",
        ],
        // Chức năng nhóm 7: Xem đánh giá, chi tiết, điểm trung bình
    },

    // ==================== NHÓM 8: THÔNG BÁO ====================
    {
        id: "notifications",
        label: "Thông báo",
        icon: Bell,
        href: "/driver/notifications",
        listUrl: ["/driver/notifications"],
        // Chức năng nhóm 8: Nhận thông báo đơn mới, thay đổi đơn, xem danh sách, đánh dấu đã đọc
    },
]