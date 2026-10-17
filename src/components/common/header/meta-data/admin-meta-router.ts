import type { RouteMetadataType } from "@/components/common/header/meta-data/type";



export const ADMIN_ROUTE_METADATA: RouteMetadataType[] = [
    // ==================== DASHBOARD (5.1) ====================
    {
        href: "/manager/dashboard",
        title: "Bảng điều khiển hệ thống",
        description:
            "Theo dõi chỉ số vận hành real-time: đơn hàng mới, tài xế đang online, đơn đang giao, tỷ lệ hoàn thành và doanh thu trong ngày.",
    },

    // ==================== NHÓM 1: QUẢN LÝ NGƯỜI DÙNG ====================
    {
        href: "/manager/users",
        title: "Danh sách người dùng hệ thống",
        description:
            "Tra cứu toàn bộ tài khoản Khách hàng và Tài xế: thông tin liên hệ, lịch sử đặt hàng và trạng thái hoạt động trên hệ thống.",
    },
    {
        href: "/manager/users/customers",
        title: "Quản lý khách hàng",
        description:
            "Danh sách khách hàng đang hoạt động, thống kê số đơn đã đặt, tổng chi tiêu và mức độ trung thành.",
    },
    {
        href: "/manager/users/banned",
        title: "Tài khoản bị khóa",
        description:
            "Danh sách người dùng bị đình chỉ hoặc khóa vĩnh viễn do vi phạm chính sách, gian lận hoặc spam đơn hàng. Có thể mở khóa khi cần.",
    },

    // ==================== NHÓM 2: QUẢN LÝ TÀI XẾ ====================
    {
        href: "/manager/drivers",
        title: "Danh sách tài xế",
        description:
            "Quản lý toàn bộ đội ngũ tài xế: thông tin cá nhân, phương tiện, trạng thái online/offline và hiệu suất giao hàng.",
    },
    {
        href: "/manager/drivers/approvals",
        title: "Phê duyệt hồ sơ tài xế mới",
        description:
            "Xác minh CCCD, bằng lái xe, giấy tờ phương tiện và lý lịch của ứng viên đăng ký làm tài xế giao hàng.",
    },
    {
        href: "/manager/drivers/online",
        title: "Tài xế đang trực tuyến",
        description:
            "Theo dõi real-time danh sách tài xế đang online, vị trí GPS hiện tại và trạng thái nhận đơn.",
    },
    {
        href: "/manager/drivers/map",
        title: "Bản đồ vị trí tài xế",
        description:
            "Giám sát vị trí real-time của tất cả tài xế đang hoạt động trên bản đồ Leaflet + OSRM.",
    },

    // ==================== NHÓM 3: QUẢN LÝ PHƯƠNG TIỆN ====================
    {
        href: "/manager/vehicles",
        title: "Quản lý phương tiện",
        description:
            "Tra cứu danh sách xe đã đăng ký: biển số, loại xe (xe máy, xe tải nhỏ, xe đông lạnh), tải trọng và tình trạng giấy tờ.",
    },
    {
        href: "/manager/vehicles/approvals",
        title: "Phê duyệt đăng ký phương tiện",
        description:
            "Kiểm tra giấy đăng ký xe, bảo hiểm và tiêu chuẩn an toàn trước khi cho phép tài xế sử dụng để giao hàng.",
    },

    // ==================== NHÓM 4: QUẢN LÝ ĐƠN HÀNG ====================
    {
        href: "/manager/orders",
        title: "Danh sách đơn hàng toàn hệ thống",
        description:
            "Bộ lọc tra cứu toàn bộ đơn hàng: trạng thái, tuyến đường, tài xế phụ trách, thời gian giao và chi phí vận chuyển.",
    },
    {
        href: "/manager/orders/pending",
        title: "Đơn hàng chờ tài xế",
        description:
            "Hàng đợi các đơn hàng vừa được tạo đang chờ hệ thống điều phối hoặc tài xế nhận giao.",
    },
    {
        href: "/manager/orders/active",
        title: "Đơn hàng đang giao",
        description:
            "Theo dõi các đơn hàng đang trên đường vận chuyển, cập nhật vị trí tài xế và tiến độ giao hàng real-time.",
    },
    {
        href: "/manager/orders/completed",
        title: "Đơn hàng đã hoàn thành",
        description:
            "Lịch sử các đơn hàng đã giao thành công, bao gồm ảnh xác nhận, chữ ký điện tử và đánh giá từ khách hàng.",
    },
    {
        href: "/manager/orders/cancelled",
        title: "Đơn hàng đã hủy",
        description:
            "Danh sách các đơn hàng bị hủy bởi khách hàng, tài xế hoặc hệ thống, kèm lý do và trạng thái hoàn tiền.",
    },

    // ==================== THEO DÕI REAL-TIME ====================
    {
        href: "/manager/tracking",
        title: "Lịch sử hành trình giao hàng",
        description:
            "Xem lại toàn bộ lộ trình di chuyển của tài xế theo thời gian, tốc độ trung bình và các điểm dừng trên tuyến.",
    },
    {
        href: "/manager/tracking/live-map",
        title: "Bản đồ theo dõi trực tiếp",
        description:
            "Bản đồ real-time qua SignalR: hiển thị vị trí tài xế, đơn đang giao và tuyến đường tối ưu trên Leaflet + OSRM.",
    },

    // ==================== NHÓM 5: BÁO CÁO & THỐNG KÊ ====================
    {
        href: "/manager/reports",
        title: "Trung tâm báo cáo & phân tích",
        description:
            "Bảng điều khiển BI tổng hợp: xu hướng đơn hàng, hiệu suất tài xế, thời gian giao trung bình và tỷ lệ hủy đơn.",
    },
    {
        href: "/manager/reports/orders",
        title: "Thống kê vòng đời đơn hàng",
        description:
            "Phân tích tỷ lệ đơn hoàn thành, hủy, tranh chấp và thời gian trung bình từ lúc tạo đến khi giao xong.",
    },
    {
        href: "/manager/reports/revenue",
        title: "Thống kê doanh thu hệ thống",
        description:
            "Phân tích nguồn thu từ phí vận chuyển, hoa hồng đơn hàng và các khoản phí dịch vụ khác theo ngày/tuần/tháng.",
    },
    {
        href: "/manager/reports/drivers",
        title: "Hiệu suất đội ngũ tài xế",
        description:
            "Bảng xếp hạng tài xế theo số đơn hoàn thành, tỷ lệ đúng giờ, đánh giá từ khách hàng và thời gian online.",
    },
    {
        href: "/manager/reports/reviews",
        title: "Báo cáo đánh giá",
        description:
            "Thống kê đánh giá, tỷ lệ hài lòng, các đánh giá tiêu cực và xu hướng chất lượng dịch vụ theo thời gian.",
    },

    // ==================== NHÓM 7: QUẢN LÝ ĐÁNH GIÁ ====================
    {
        href: "/manager/reviews",
        title: "Quản lý đánh giá",
        description:
            "Xem tất cả đánh giá của khách hàng về tài xế, xóa đánh giá vi phạm và gửi phản hồi chính thức từ hệ thống.",
    },

    // ==================== NHÓM 6: CẤU HÌNH HỆ THỐNG ====================
    {
        href: "/manager/settings",
        title: "Thiết lập cấu hình hệ thống",
        description:
            "Cấu hình thông số vận hành: phí giao hàng, thời gian chờ tài xế nhận đơn, bán kính điều phối và cổng thanh toán.",
    },
    {
        href: "/manager/settings/shipping-fee",
        title: "Cấu hình phí vận chuyển",
        description:
            "Thiết lập phí theo km, theo loại xe và các phụ phí (giờ cao điểm, khu vực xa, hàng cồng kềnh).",
    },
    {
        href: "/manager/settings/radius",
        title: "Cấu hình bán kính tìm tài xế",
        description:
            "Bán kính tối đa để hệ thống tìm tài xế gần nhất khi có đơn hàng mới cần điều phối.",
    },
    {
        href: "/manager/settings/timeout",
        title: "Cấu hình thời gian timeout",
        description:
            "Thời gian chờ tài xế nhận đơn, thời gian giao hàng tối đa và thời gian tự động hủy đơn khi quá hạn.",
    },
    {
        href: "/manager/settings/notifications",
        title: "Cấu hình thông báo hệ thống",
        description:
            "Bật/tắt và tùy chỉnh mẫu thông báo push, email, SMS gửi đến khách hàng và tài xế trong từng sự kiện đơn hàng.",
    },
    {
        href: "/manager/settings/logs",
        title: "Nhật ký hoạt động hệ thống",
        description:
            "Audit log ghi lại toàn bộ hành động của quản trị viên: đăng nhập, thay đổi cấu hình, khóa tài khoản và xuất dữ liệu.",
    },
]