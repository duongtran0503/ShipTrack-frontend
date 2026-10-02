// src/features/sidebar/admin-nav-items.ts
import {
    BarChart3,
    ClipboardList,
    LayoutDashboard,
    LifeBuoy,
    MapPinned,
    Package,
    Route,
    Settings,
    ShieldCheck,
    Truck,
    Users,
    Wallet,
    type LucideIcon,
} from 'lucide-react';

interface NavItemChild {
    label: string;
    href: string;
}

export interface NavItemType {
    id: string;
    label: string;
    listUrl: string[];
    icon: LucideIcon;
    href: string;
    children?: NavItemChild[];
}

export const ADMIN_NAV_ITEMS: NavItemType[] = [
    {
        id: 'dashboard',
        label: 'Tổng quan',
        icon: LayoutDashboard,
        href: '/dashboard',
        listUrl: ['/dashboard'],
        // Chức năng: Xem chỉ số tổng quan — đơn mới, tài xế online, đơn đang giao, doanh thu
    },
    {
        id: 'users',
        label: 'Quản lý người dùng',
        icon: Users,
        href: '/dashboard/users',
        listUrl: [
            '/dashboard/users',
            '/dashboard/users/customers',
            '/dashboard/users/banned',
            '/dashboard/users/[id]',
        ],
        children: [
            { label: 'Khách hàng', href: '/dashboard/users/customers' },
            { label: 'Tài khoản bị khóa', href: '/dashboard/users/banned' },
            { label: 'Tất cả người dùng', href: '/dashboard/users' },
        ],
        // Chức năng: Quản lý tài khoản Khách hàng — khóa/mở, xem lịch sử đơn hàng
    },
    {
        id: 'drivers',
        label: 'Quản lý tài xế',
        icon: Truck,
        href: '/dashboard/drivers',
        listUrl: [
            '/dashboard/drivers',
            '/dashboard/drivers/approvals',
            '/dashboard/drivers/online',
            '/dashboard/drivers/[id]',
        ],
        children: [
            { label: 'Duyệt hồ sơ tài xế', href: '/dashboard/drivers/approvals' },
            { label: 'Tài xế đang online', href: '/dashboard/drivers/online' },
            { label: 'Danh sách tài xế', href: '/dashboard/drivers' },
        ],
        // Chức năng: Duyệt hồ sơ, theo dõi trạng thái online/offline, khóa tài xế vi phạm
    },
    {
        id: 'vehicles',
        label: 'Quản lý phương tiện',
        icon: Package,
        href: '/dashboard/vehicles',
        listUrl: ['/dashboard/vehicles', '/dashboard/vehicles/approvals'],
        children: [
            { label: 'Duyệt phương tiện', href: '/dashboard/vehicles/approvals' },
            { label: 'Danh sách xe', href: '/dashboard/vehicles' },
        ],
        // Chức năng: Duyệt đăng ký xe, kiểm tra giấy tờ, biển số, loại xe
    },
    {
        id: 'orders',
        label: 'Quản lý đơn hàng',
        icon: ClipboardList,
        href: '/dashboard/orders',
        listUrl: [
            '/dashboard/orders',
            '/dashboard/orders/pending',
            '/dashboard/orders/active',
            '/dashboard/orders/completed',
            '/dashboard/orders/cancelled',
            '/dashboard/orders/[id]',
        ],
        children: [
            { label: 'Đơn chờ tài xế', href: '/dashboard/orders/pending' },
            { label: 'Đang giao', href: '/dashboard/orders/active' },
            { label: 'Hoàn thành', href: '/dashboard/orders/completed' },
            { label: 'Đã hủy', href: '/dashboard/orders/cancelled' },
        ],
        // Chức năng: Theo dõi toàn bộ vòng đời đơn — tạo mới, tìm tài xế, đang giao, hoàn thành
    },
    {
        id: 'tracking',
        label: 'Theo dõi Real-time',
        icon: MapPinned,
        href: '/dashboard/tracking',
        listUrl: ['/dashboard/tracking', '/dashboard/tracking/live-map'],
        children: [
            { label: 'Bản đồ trực tiếp', href: '/dashboard/tracking/live-map' },
            { label: 'Lịch sử hành trình', href: '/dashboard/tracking' },
        ],
        // Chức năng: Bản đồ real-time qua SignalR — xem vị trí tài xế, đơn đang giao (Leaflet + OSRM)
    },
    {
        id: 'routes',
        label: 'Tuyến đường & Khoảng cách',
        icon: Route,
        href: '/dashboard/routes',
        listUrl: ['/dashboard/routes', '/dashboard/routes/optimize'],
        // Chức năng: Tính khoảng cách bằng OSRM, tối ưu tuyến giao hàng cho tài xế
    },
    {
        id: 'payments',
        label: 'Thanh toán & Ví',
        icon: Wallet,
        href: '/dashboard/payments',
        listUrl: [
            '/dashboard/payments',
            '/dashboard/payments/transactions',
            '/dashboard/payments/withdrawals',
        ],
        children: [
            { label: 'Lịch sử giao dịch', href: '/dashboard/payments/transactions' },
            { label: 'Yêu cầu rút tiền', href: '/dashboard/payments/withdrawals' },
        ],
        // Chức năng: Quản lý thanh toán COD, ví tài xế, đối soát doanh thu
    },
    {
        id: 'analytics',
        label: 'Báo cáo & Phân tích',
        icon: BarChart3,
        href: '/dashboard/analytics',
        listUrl: [
            '/dashboard/analytics',
            '/dashboard/analytics/revenue',
            '/dashboard/analytics/drivers',
            '/dashboard/analytics/orders',
        ],
        children: [
            { label: 'Doanh thu hệ thống', href: '/dashboard/analytics/revenue' },
            { label: 'Hiệu suất tài xế', href: '/dashboard/analytics/drivers' },
            { label: 'Thống kê đơn hàng', href: '/dashboard/analytics/orders' },
        ],
        // Chức năng: Biểu đồ doanh thu, tỷ lệ hoàn thành, thời gian giao trung bình
    },
    {
        id: 'tickets',
        label: 'Hỗ trợ khách hàng',
        icon: LifeBuoy,
        href: '/dashboard/tickets',
        listUrl: ['/dashboard/tickets', '/dashboard/tickets/disputes'],
        children: [
            { label: 'Yêu cầu hỗ trợ', href: '/dashboard/tickets' },
            { label: 'Khiếu nại / Tranh chấp', href: '/dashboard/tickets/disputes' },
        ],
        // Chức năng: Tiếp nhận khiếu nại đơn hàng, điều phối xử lý với tài xế
    },
    {
        id: 'roles',
        label: 'Phân quyền & Bảo mật',
        icon: ShieldCheck,
        href: '/dashboard/roles',
        listUrl: ['/dashboard/roles', '/dashboard/roles/permissions', '/dashboard/roles/logs'],
        children: [
            { label: 'Vai trò', href: '/dashboard/roles' },
            { label: 'Quyền hạn', href: '/dashboard/roles/permissions' },
            { label: 'Nhật ký hoạt động', href: '/dashboard/roles/logs' },
        ],
        // Chức năng: Quản lý role dashboard/Moderator, phân quyền, audit log (liên quan JWT auth)
    },
    {
        id: 'settings',
        label: 'Cài đặt hệ thống',
        icon: Settings,
        href: '/dashboard/settings',
        listUrl: [
            '/dashboard/settings',
            '/dashboard/settings/general',
            '/dashboard/settings/notifications',
        ],
        children: [
            { label: 'Cấu hình chung', href: '/dashboard/settings/general' },
            { label: 'Thông báo hệ thống', href: '/dashboard/settings/notifications' },
        ],
        // Chức năng: Cấu hình phí giao hàng, thời gian chờ tài xế, cài đặt chung
    },
];