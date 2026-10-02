// src/features/notification/notification-data.ts

export interface NotificationItem {
    id: number;
    imageUrl: string;
    title: string;
    message: string;
    href?: string;       // đường dẫn chi tiết (tuỳ chọn)
    createdAt?: string;
}

// Data tĩnh — có thể thay bằng API call sau này
export const NOTIFICATIONS_LIST: NotificationItem[] = [
    {
        id: 1,
        imageUrl: '/images/notifications/order-success.png',
        title: 'Đơn hàng #10234 đã được xác nhận',
        message: 'Đơn hàng của bạn đang được chuẩn bị và sẽ sớm được giao.',
        href: '/orders/10234',
        createdAt: '2025-01-15T08:30:00Z',
    },
    {
        id: 2,
        imageUrl: '/images/notifications/promo.png',
        title: 'Khuyến mãi cuối tuần - Giảm 30%',
        message: 'Áp dụng cho tất cả sản phẩm trong danh mục Thời trang.',
        href: '/promotions/weekend-sale',
        createdAt: '2025-01-14T18:00:00Z',
    },
    {
        id: 3,
        imageUrl: '/images/notifications/shipping.png',
        title: 'Đơn hàng #10198 đang được vận chuyển',
        message: 'Dự kiến giao đến bạn trong 2 ngày tới.',
        href: '/orders/10198',
        createdAt: '2025-01-14T10:15:00Z',
    },
    {
        id: 4,
        imageUrl: '/images/notifications/review.png',
        title: 'Đánh giá sản phẩm để nhận 5.000đ',
        message: 'Chia sẻ trải nghiệm của bạn về sản phẩm vừa mua.',
        href: '/reviews/new',
        createdAt: '2025-01-13T09:00:00Z',
    },
    {
        id: 5,
        imageUrl: '/images/notifications/security.png',
        title: 'Cảnh báo đăng nhập từ thiết bị lạ',
        message: 'Nếu không phải bạn, hãy đổi mật khẩu ngay.',
        href: '/settings/security',
        createdAt: '2025-01-12T22:45:00Z',
    },
    {
        id: 6,
        imageUrl: '/images/notifications/system.png',
        title: 'Hệ thống bảo trì lúc 2h sáng ngày 20/01',
        message: 'Một số chức năng có thể bị gián đoạn trong 30 phút.',
        href: '/announcements/maintenance',
        createdAt: '2025-01-12T14:20:00Z',
    },
];

// Số lượng hiển thị badge
export const UNREAD_NOTIFICATION_COUNT = NOTIFICATIONS_LIST.length;

// Đường dẫn trang xem tất cả
export const NOTIFICATIONS_ALL_HREF = '/notifications';