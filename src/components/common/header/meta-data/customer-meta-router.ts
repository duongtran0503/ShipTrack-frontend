import type { RouteMetadataType } from "@/components/common/header/meta-data/type";


export const CUSTOMER_ROUTE_METADATA: RouteMetadataType[] = [
    // ==================== DASHBOARD ====================
    {
        href: "/customer/dashboard",
        title: "Tổng quan",
        description:
            "Xem nhanh tình trạng đơn hàng: đơn đang giao, đơn hoàn thành gần đây, thông báo mới và địa chỉ mặc định.",
    },

    // ==================== NHÓM 1: QUẢN LÝ TÀI KHOẢN ====================
    {
        href: "/customer/profile",
        title: "Thông tin cá nhân",
        description:
            "Xem và cập nhật hồ sơ: họ tên, email, số điện thoại và ảnh đại diện.",
    },
    {
        href: "/customer/profile/change-password",
        title: "Đổi mật khẩu",
        description:
            "Thay đổi mật khẩu đăng nhập để bảo vệ tài khoản khỏi truy cập trái phép.",
    },

    // ==================== NHÓM 2: QUẢN LÝ ĐỊA CHỈ ====================
    {
        href: "/customer/addresses",
        title: "Địa chỉ của tôi",
        description:
            "Danh sách địa chỉ đã lưu (nhà, công ty...), đặt địa chỉ mặc định cho lấy/giao hàng và quản lý nhãn địa chỉ.",
    },
    {
        href: "/customer/addresses/create",
        title: "Thêm địa chỉ mới",
        description:
            "Nhập địa chỉ, chọn vị trí trên bản đồ và đặt nhãn (nhà riêng, văn phòng...) để dễ nhận biết.",
    },

    // ==================== NHÓM 3: TẠO ĐƠN HÀNG ====================
    {
        href: "/customer/orders/create",
        title: "Tạo đơn hàng mới",
        description:
            "Chọn địa chỉ lấy/giao, nhập thông tin hàng hóa, xem phí vận chuyển dự kiến và xác nhận tạo đơn.",
    },

    // ==================== NHÓM 4 & 5: QUẢN LÝ & THEO DÕI ĐƠN HÀNG ====================
    {
        href: "/customer/orders",
        title: "Đơn hàng của tôi",
        description:
            "Danh sách toàn bộ đơn hàng đã tạo, lọc theo trạng thái và ngày tạo. Xem chi tiết, hủy đơn và tải hóa đơn.",
    },
    {
        href: "/customer/orders/pending",
        title: "Đơn chờ tài xế",
        description:
            "Các đơn đang ở trạng thái Pending hoặc SearchingDriver, chờ hệ thống điều phối tài xế nhận giao.",
    },
    {
        href: "/customer/orders/active",
        title: "Đơn đang giao",
        description:
            "Theo dõi real-time đơn đang trên đường: vị trí tài xế trên bản đồ, lộ trình và thời gian dự kiến còn lại.",
    },
    {
        href: "/customer/orders/completed",
        title: "Đơn đã hoàn thành",
        description:
            "Lịch sử các đơn đã giao thành công, xem hóa đơn và đánh giá tài xế sau khi nhận hàng.",
    },
    {
        href: "/customer/orders/cancelled",
        title: "Đơn đã hủy",
        description:
            "Danh sách các đơn đã hủy kèm lý do và trạng thái hoàn tiền (nếu có).",
    },
    {
        href: "/customer/orders/:id",
        title: "Chi tiết đơn hàng",
        description:
            "Thông tin đầy đủ của đơn: trạng thái, tài xế phụ trách, phí vận chuyển, thời gian và lịch sử thay đổi trạng thái.",
    },
    {
        href: "/customer/orders/:id/tracking",
        title: "Theo dõi đơn hàng",
        description:
            "Bản đồ real-time qua SignalR: vị trí tài xế, lộ trình giao hàng và thời gian dự kiến tài xế đến.",
    },
    {
        href: "/customer/orders/:id/invoice",
        title: "Hóa đơn vận chuyển",
        description:
            "Chi tiết phí vận chuyển, tổng tiền và tải hóa đơn PDF (nếu có).",
    },

    // ==================== NHÓM 6: ĐÁNH GIÁ ====================
    {
        href: "/customer/reviews",
        title: "Đánh giá của tôi",
        description:
            "Xem lại các đánh giá đã gửi cho tài xế, chỉnh sửa trong thời gian cho phép (24h) và xem phản hồi.",
    },

    // ==================== NHÓM 7: THÔNG BÁO ====================
    {
        href: "/customer/notifications",
        title: "Thông báo",
        description:
            "Danh sách thông báo real-time: đơn thay đổi trạng thái, tài xế nhận đơn, giao hàng thành công và khuyến mãi.",
    },
]