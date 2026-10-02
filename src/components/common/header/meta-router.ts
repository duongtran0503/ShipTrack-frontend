
export interface RouteMetadataType {
    href: string;
    title: string;
    description: string;
}

export const ADMIN_ROUTE_METADATA: RouteMetadataType[] = [
    // --- Tổng quan ---
    {
        href: '/dashboard',
        title: 'Bảng điều khiển hệ thống',
        description:
            'Theo dõi chỉ số vận hành real-time: đơn hàng mới, tài xế đang online, đơn đang giao, tỷ lệ hoàn thành và doanh thu trong ngày.',
    },

    // --- Quản lý người dùng ---
    {
        href: '/dashboard/users',
        title: 'Danh sách người dùng hệ thống',
        description:
            'Tra cứu toàn bộ tài khoản Khách hàng, thông tin liên hệ, lịch sử đặt hàng và trạng thái hoạt động trên hệ thống.',
    },
    {
        href: '/dashboard/users/customers',
        title: 'Quản lý khách hàng',
        description:
            'Danh sách khách hàng đang hoạt động, thống kê số đơn đã đặt, tổng chi tiêu và mức độ trung thành.',
    },
    {
        href: '/dashboard/users/banned',
        title: 'Tài khoản bị khóa',
        description:
            'Danh sách người dùng bị đình chỉ hoặc khóa vĩnh viễn do vi phạm chính sách, gian lận hoặc spam đơn hàng.',
    },

    // --- Quản lý tài xế ---
    {
        href: '/dashboard/drivers',
        title: 'Danh sách tài xế',
        description:
            'Quản lý toàn bộ đội ngũ tài xế: thông tin cá nhân, phương tiện, trạng thái online/offline và hiệu suất giao hàng.',
    },
    {
        href: '/dashboard/drivers/approvals',
        title: 'Phê duyệt hồ sơ tài xế mới',
        description:
            'Xác minh CCCD, bằng lái xe, giấy tờ phương tiện và lý lịch của ứng viên đăng ký làm tài xế giao hàng.',
    },
    {
        href: '/dashboard/drivers/online',
        title: 'Tài xế đang trực tuyến',
        description:
            'Theo dõi real-time danh sách tài xế đang online, vị trí GPS hiện tại và trạng thái nhận đơn.',
    },

    // --- Quản lý phương tiện ---
    {
        href: '/dashboard/vehicles',
        title: 'Quản lý phương tiện',
        description:
            'Tra cứu danh sách xe đã đăng ký: biển số, loại xe (xe máy, xe tải nhỏ, xe đông lạnh), tải trọng và tình trạng giấy tờ.',
    },
    {
        href: '/dashboard/vehicles/approvals',
        title: 'Phê duyệt đăng ký phương tiện',
        description:
            'Kiểm tra giấy đăng ký xe, bảo hiểm và tiêu chuẩn an toàn trước khi cho phép tài xế sử dụng để giao hàng.',
    },

    // --- Quản lý đơn hàng ---
    {
        href: '/dashboard/orders',
        title: 'Danh sách đơn hàng toàn hệ thống',
        description:
            'Bộ lọc tra cứu toàn bộ đơn hàng: trạng thái, tuyến đường, tài xế phụ trách, thời gian giao và chi phí vận chuyển.',
    },
    {
        href: '/dashboard/orders/pending',
        title: 'Đơn hàng chờ tài xế',
        description:
            'Hàng đợi các đơn hàng vừa được tạo đang chờ hệ thống điều phối hoặc tài xế nhận giao.',
    },
    {
        href: '/dashboard/orders/active',
        title: 'Đơn hàng đang giao',
        description:
            'Theo dõi các đơn hàng đang trên đường vận chuyển, cập nhật vị trí tài xế và tiến độ giao hàng real-time.',
    },
    {
        href: '/dashboard/orders/completed',
        title: 'Đơn hàng đã hoàn thành',
        description:
            'Lịch sử các đơn hàng đã giao thành công, bao gồm ảnh xác nhận, chữ ký điện tử và đánh giá từ khách hàng.',
    },
    {
        href: '/dashboard/orders/cancelled',
        title: 'Đơn hàng đã hủy',
        description:
            'Danh sách các đơn hàng bị hủy bởi khách hàng, tài xế hoặc hệ thống, kèm lý do và trạng thái hoàn tiền.',
    },

    // --- Theo dõi Real-time ---
    {
        href: '/dashboard/tracking',
        title: 'Lịch sử hành trình giao hàng',
        description:
            'Xem lại toàn bộ lộ trình di chuyển của tài xế theo thời gian, tốc độ trung bình và các điểm dừng trên tuyến.',
    },
    {
        href: '/dashboard/tracking/live-map',
        title: 'Bản đồ theo dõi trực tiếp',
        description:
            'Bản đồ real-time qua SignalR: hiển thị vị trí tài xế, đơn đang giao và tuyến đường tối ưu trên Leaflet + OSRM.',
    },

    // --- Tuyến đường & Khoảng cách ---
    {
        href: '/dashboard/routes',
        title: 'Quản lý tuyến đường giao hàng',
        description:
            'Danh sách các tuyến đường đã thiết lập, khoảng cách tính bằng OSRM và thời gian di chuyển dự kiến.',
    },
    {
        href: '/dashboard/routes/optimize',
        title: 'Tối ưu hóa tuyến giao hàng',
        description:
            'Áp dụng thuật toán tối ưu để phân bổ nhiều đơn hàng cho một tài xế theo lộ trình ngắn nhất và tiết kiệm nhất.',
    },

    // --- Thanh toán & Ví ---
    {
        href: '/dashboard/payments',
        title: 'Tổng quan thanh toán',
        description:
            'Thống kê dòng tiền: tổng thu COD, phí vận chuyển, hoa hồng hệ thống và số dư ví tài xế.',
    },
    {
        href: '/dashboard/payments/transactions',
        title: 'Lịch sử giao dịch',
        description:
            'Tra cứu chi tiết từng giao dịch: thanh toán đơn hàng, hoàn tiền, phí nền tảng và thời điểm ghi nhận.',
    },
    {
        href: '/dashboard/payments/withdrawals',
        title: 'Yêu cầu rút tiền của tài xế',
        description:
            'Phê duyệt hoặc từ chối các yêu cầu rút tiền từ ví tài xế, kèm xác minh tài khoản ngân hàng.',
    },

    // --- Báo cáo & Phân tích ---
    {
        href: '/dashboard/analytics',
        title: 'Trung tâm phân tích dữ liệu',
        description:
            'Bảng điều khiển BI tổng hợp: xu hướng đơn hàng, hiệu suất tài xế, thời gian giao trung bình và tỷ lệ hủy đơn.',
    },
    {
        href: '/dashboard/analytics/revenue',
        title: 'Thống kê doanh thu hệ thống',
        description:
            'Phân tích nguồn thu từ phí vận chuyển, hoa hồng đơn hàng và các khoản phí dịch vụ khác theo ngày/tuần/tháng.',
    },
    {
        href: '/dashboard/analytics/drivers',
        title: 'Hiệu suất đội ngũ tài xế',
        description:
            'Bảng xếp hạng tài xế theo số đơn hoàn thành, tỷ lệ đúng giờ, đánh giá từ khách hàng và thời gian online.',
    },
    {
        href: '/dashboard/analytics/orders',
        title: 'Thống kê vòng đời đơn hàng',
        description:
            'Phân tích tỷ lệ đơn hoàn thành, hủy, tranh chấp và thời gian trung bình từ lúc tạo đến khi giao xong.',
    },

    // --- Hỗ trợ khách hàng ---
    {
        href: '/dashboard/tickets',
        title: 'Trung tâm hỗ trợ khách hàng',
        description:
            'Tiếp nhận yêu cầu hỗ trợ: lỗi ứng dụng, thắc mắc tài khoản, hướng dẫn sử dụng và báo cáo sự cố kỹ thuật.',
    },
    {
        href: '/dashboard/tickets/disputes',
        title: 'Giải quyết khiếu nại - tranh chấp',
        description:
            'dashboard đóng vai trò trung gian phân xử các vụ việc giữa khách hàng và tài xế: mất hàng, giao trễ, hư hỏng.',
    },

    // --- Phân quyền & Bảo mật ---
    {
        href: '/dashboard/roles',
        title: 'Quản lý vai trò hệ thống',
        description:
            'Thiết lập các vai trò dashboard, Moderator, Supporter và gán quyền tương ứng cho từng nhóm quản trị viên.',
    },
    {
        href: '/dashboard/roles/permissions',
        title: 'Cấu hình quyền hạn chi tiết',
        description:
            'Định nghĩa quyền truy cập cho từng API, từng module và từng hành động cụ thể trong hệ thống.',
    },
    {
        href: '/dashboard/roles/logs',
        title: 'Nhật ký hoạt động quản trị',
        description:
            'Audit log ghi lại toàn bộ hành động của quản trị viên: đăng nhập, thay đổi cấu hình, khóa tài khoản và xuất dữ liệu.',
    },

    // --- Cài đặt hệ thống ---
    {
        href: '/dashboard/settings',
        title: 'Thiết lập cấu hình hệ thống',
        description:
            'Cấu hình thông số vận hành: phí giao hàng, thời gian chờ tài xế nhận đơn, bán kính điều phối và cổng thanh toán.',
    },
    {
        href: '/dashboard/settings/general',
        title: 'Cấu hình chung',
        description:
            'Thiết lập thông tin thương hiệu, múi giờ, ngôn ngữ, đơn vị tiền tệ và các tham số mặc định của hệ thống.',
    },
    {
        href: '/dashboard/settings/notifications',
        title: 'Cấu hình thông báo hệ thống',
        description:
            'Bật/tắt và tùy chỉnh mẫu thông báo push, email, SMS gửi đến khách hàng và tài xế trong từng sự kiện đơn hàng.',
    },
];