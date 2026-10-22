import type { NavItemType } from "@/components/common/sidebar/navigations/type"
import {
    Bell,
    ClipboardList,
    LayoutDashboard,
    MapPin,
    PlusCircle,
    Star,
    User,
} from "lucide-react"

export const CUSTOMER_NAV_ITEMS: NavItemType[] = [
    // ==================== DASHBOARD ====================
    {
        id: "dashboard",
        label: "Tổng quan",
        icon: LayoutDashboard,
        href: "/customer/dashboard",
        listUrl: ["/customer/dashboard"],
        // Chức năng: Xem tổng quan — đơn đang giao, đơn hoàn thành, thông báo mới
    },

    // ==================== NHÓM 1: QUẢN LÝ TÀI KHOẢN ====================
    {
        id: "profile",
        label: "Tài khoản của tôi",
        icon: User,
        href: "/customer/profile",
        listUrl: [
            "/customer/profile",
            "/customer/profile/change-password",
        ],
        children: [
            { label: "Thông tin cá nhân", href: "/customer/profile" },        // 1.4
            { label: "Đổi mật khẩu", href: "/customer/profile/change-password" }, // 1.6
        ],
        // Chức năng nhóm 1: Xem/cập nhật hồ sơ, đổi mật khẩu (đăng ký/đăng nhập là public)
    },

    // ==================== NHÓM 2: QUẢN LÝ ĐỊA CHỈ ====================
    {
        id: "addresses",
        label: "Quản lý địa chỉ",
        icon: MapPin,
        href: "/customer/addresses",
        listUrl: [
            "/customer/addresses",
            "/customer/addresses/create",
            "/customer/addresses/:id/edit",
        ],
        // Chức năng nhóm 2: Xem danh sách, thêm, cập nhật, xóa, đặt địa chỉ mặc định
    },

    // ==================== NHÓM 3: TẠO ĐƠN HÀNG ====================
    {
        id: "create-order",
        label: "Tạo đơn hàng",
        icon: PlusCircle,
        href: "/customer/orders/create",
        listUrl: ["/customer/orders/create"],
        // Chức năng nhóm 3: Chọn địa chỉ lấy/giao, nhập hàng hóa, xem phí, xác nhận tạo đơn
    },

    // ==================== NHÓM 4 & 5: QUẢN LÝ & THEO DÕI ĐƠN HÀNG ====================
    {
        id: "orders",
        label: "Đơn hàng của tôi",
        icon: ClipboardList,
        href: "/customer/orders",
        listUrl: [
            "/customer/orders",
            "/customer/orders/pending",
            "/customer/orders/active",
            "/customer/orders/completed",
            "/customer/orders/cancelled",
            "/customer/orders/:id",
            "/customer/orders/:id/tracking",
            "/customer/orders/:id/invoice",
        ],
        children: [
            { label: "Tất cả đơn hàng", href: "/customer/orders" },           // 4.1
            { label: "Chờ tài xế", href: "/customer/orders/pending" },        // 4.1
            { label: "Đang giao", href: "/customer/orders/active" },          // 4.3, 4.4
            { label: "Hoàn thành", href: "/customer/orders/completed" },      // 5.2
            { label: "Đã hủy", href: "/customer/orders/cancelled" },          // 5.1, 5.2
        ],
        // Chức năng nhóm 4 & 5: Xem danh sách, chi tiết, tracking real-time, hủy đơn, hóa đơn
    },

    // ==================== NHÓM 6: ĐÁNH GIÁ ====================
    {
        id: "reviews",
        label: "Đánh giá của tôi",
        icon: Star,
        href: "/customer/reviews",
        listUrl: [
            "/customer/reviews",
            "/customer/reviews/:id/edit",
        ],
        // Chức năng nhóm 6: Đánh giá tài xế, xem lại đánh giá đã gửi, chỉnh sửa
    },

    // ==================== NHÓM 7: THÔNG BÁO ====================
    {
        id: "notifications",
        label: "Thông báo",
        icon: Bell,
        href: "/customer/notifications",
        listUrl: ["/customer/notifications"],
        // Chức năng nhóm 7: Nhận real-time, xem danh sách, đánh dấu đã đọc
    },
]