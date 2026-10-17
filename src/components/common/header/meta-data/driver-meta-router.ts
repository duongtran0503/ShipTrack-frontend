import type { RouteMetadataType } from "@/components/common/header/meta-data/type";


export const DRIVER_ROUTE_METADATA: RouteMetadataType[] = [
    // ==================== DASHBOARD ====================
    {
        href: "/driver/dashboard",
        title: "Bảng điều khiển tài xế",
        description:
            "Tổng quan hoạt động hôm nay: trạng thái sẵn sàng, đơn đang giao, thu nhập trong ngày và đánh giá gần nhất từ khách hàng.",
    },

    // ==================== NHÓM 1: QUẢN LÝ TÀI KHOẢN ====================
    {
        href: "/driver/profile",
        title: "Thông tin cá nhân",
        description:
            "Xem và cập nhật hồ sơ tài xế: họ tên, email, số điện thoại, ảnh đại diện và điểm đánh giá trung bình.",
    },
    {
        href: "/driver/profile/license",
        title: "Thông tin bằng lái xe",
        description:
            "Cập nhật số bằng lái, ngày cấp, ngày hết hạn và tải lên ảnh bằng lái để Admin xác minh.",
    },
    {
        href: "/driver/profile/change-password",
        title: "Đổi mật khẩu",
        description:
            "Thay đổi mật khẩu đăng nhập để bảo vệ tài khoản tài xế khỏi truy cập trái phép.",
    },

    // ==================== NHÓM 3: TRẠNG THÁI HOẠT ĐỘNG ====================
    {
        href: "/driver/availability",
        title: "Trạng thái hoạt động",
        description:
            "Bật/tắt trạng thái sẵn sàng nhận đơn. Khi bật, hệ thống sẽ điều phối đơn hàng phù hợp đến bạn qua SignalR.",
    },

    // ==================== NHÓM 4: NHẬN ĐƠN HÀNG ====================
    {
        href: "/driver/orders/available",
        title: "Đơn hàng khả dụng",
        description:
            "Danh sách đơn đang tìm tài xế, sắp xếp theo khoảng cách gần nhất. Xem chi tiết, lộ trình dự kiến trước khi nhận đơn.",
    },

    // ==================== NHÓM 5: ĐƠN ĐANG THỰC HIỆN ====================
    {
        href: "/driver/orders/active",
        title: "Đơn đang thực hiện",
        description:
            "Danh sách đơn đã nhận đang ở trạng thái DriverAssigned, PickedUp hoặc Delivering. Cập nhật trạng thái và gửi GPS real-time.",
    },
    {
        href: "/driver/orders/active/:id/route",
        title: "Lộ trình giao hàng",
        description:
            "Bản đồ lộ trình từ điểm lấy đến điểm giao, tính khoảng cách bằng OSRM và thời gian di chuyển dự kiến.",
    },

    // ==================== NHÓM 2: QUẢN LÝ PHƯƠNG TIỆN ====================
    {
        href: "/driver/vehicles",
        title: "Phương tiện của tôi",
        description:
            "Danh sách xe đã đăng ký: biển số, loại xe, hãng, model, tải trọng và trạng thái phê duyệt từ Admin.",
    },
    {
        href: "/driver/vehicles/create",
        title: "Thêm phương tiện mới",
        description:
            "Đăng ký xe mới: nhập biển số, chọn loại xe, hãng, model, tải trọng và tải lên giấy tờ đăng ký.",
    },

    // ==================== NHÓM 6: LỊCH SỬ & THU NHẬP ====================
    {
        href: "/driver/history",
        title: "Lịch sử chuyến đi",
        description:
            "Danh sách các đơn đã hoàn thành hoặc thất bại: thời gian, tuyến đường, phí vận chuyển và đánh giá từ khách hàng.",
    },
    {
        href: "/driver/earnings",
        title: "Thu nhập của tôi",
        description:
            "Tổng hợp thu nhập theo ngày/tuần/tháng, chi tiết từng chuyến và số dư ví hiện tại có thể rút.",
    },
    {
        href: "/driver/earnings/statistics",
        title: "Thống kê cá nhân",
        description:
            "Phân tích hiệu suất: tổng chuyến, tỷ lệ hoàn thành, thời gian online, đánh giá trung bình và xếp hạng.",
    },

    // ==================== NHÓM 7: ĐÁNH GIÁ ====================
    {
        href: "/driver/reviews",
        title: "Đánh giá của khách hàng",
        description:
            "Xem tất cả đánh giá từ khách hàng về bạn: số sao, nhận xét, đơn hàng liên quan và điểm đánh giá trung bình.",
    },

    // ==================== NHÓM 8: THÔNG BÁO ====================
    {
        href: "/driver/notifications",
        title: "Thông báo",
        description:
            "Danh sách thông báo: đơn mới phù hợp, đơn bị hủy, đổi tài xế và các cập nhật quan trọng khác từ hệ thống.",
    },
]
