import DriverDashboard from "@/pages/driver/dashboard"
import UnderDevelopment from "@/routes/UnderDevelopment"
import { Navigate, type RouteObject } from "react-router"



export const driverRoutes: RouteObject[] = [
    {
        path: "/driver",
        children: [
            // ==================== DASHBOARD ====================
            {
                index: true,
                element: <Navigate to="/driver/dashboard" replace />,
            },
            {
                path: "dashboard",
                element: <DriverDashboard />,
            },

            // ==================== NHÓM 1: QUẢN LÝ TÀI KHOẢN ====================
            {
                path: "profile",
                element: (
                    <UnderDevelopment
                        title="Thông tin cá nhân"
                        description="Xem và cập nhật hồ sơ tài xế: họ tên, email, số điện thoại, ảnh đại diện và điểm đánh giá trung bình."
                    />
                ),
            },
            {
                path: "profile/license",
                element: (
                    <UnderDevelopment
                        title="Thông tin bằng lái xe"
                        description="Cập nhật số bằng lái, ngày cấp, ngày hết hạn và tải lên ảnh bằng lái để Admin xác minh."
                    />
                ),
            },
            {
                path: "profile/change-password",
                element: (
                    <UnderDevelopment
                        title="Đổi mật khẩu"
                        description="Thay đổi mật khẩu đăng nhập để bảo vệ tài khoản tài xế khỏi truy cập trái phép."
                    />
                ),
            },

            // ==================== NHÓM 3: TRẠNG THÁI HOẠT ĐỘNG ====================
            {
                path: "availability",
                element: (
                    <UnderDevelopment
                        title="Trạng thái hoạt động"
                        description="Bật/tắt trạng thái sẵn sàng nhận đơn. Khi bật, hệ thống sẽ điều phối đơn hàng phù hợp đến bạn qua SignalR."
                    />
                ),
            },

            // ==================== NHÓM 4: NHẬN ĐƠN HÀNG ====================
            {
                path: "orders/available",
                element: (
                    <UnderDevelopment
                        title="Đơn hàng khả dụng"
                        description="Danh sách đơn đang tìm tài xế, sắp xếp theo khoảng cách gần nhất. Xem chi tiết, lộ trình dự kiến trước khi nhận đơn."
                    />
                ),
            },
            {
                path: "orders/available/:id",
                element: (
                    <UnderDevelopment
                        title="Chi tiết đơn khả dụng"
                        description="Xem địa chỉ lấy/giao, khoảng cách, phí vận chuyển và lộ trình dự kiến trước khi nhận đơn."
                    />
                ),
            },

            // ==================== NHÓM 5: ĐƠN ĐANG THỰC HIỆN ====================
            {
                path: "orders/active",
                element: (
                    <UnderDevelopment
                        title="Đơn đang thực hiện"
                        description="Danh sách đơn đã nhận đang ở trạng thái DriverAssigned, PickedUp hoặc Delivering. Cập nhật trạng thái và gửi GPS real-time."
                    />
                ),
            },
            {
                path: "orders/active/:id",
                element: (
                    <UnderDevelopment
                        title="Chi tiết đơn đang giao"
                        description="Cập nhật trạng thái đơn (PickedUp, Delivering, Completed, Failed), liên hệ khách hàng và gửi vị trí GPS real-time."
                    />
                ),
            },
            {
                path: "orders/active/:id/route",
                element: (
                    <UnderDevelopment
                        title="Lộ trình giao hàng"
                        description="Bản đồ lộ trình từ điểm lấy đến điểm giao, tính khoảng cách bằng OSRM và thời gian di chuyển dự kiến."
                    />
                ),
            },

            // ==================== NHÓM 2: QUẢN LÝ PHƯƠNG TIỆN ====================
            {
                path: "vehicles",
                element: (
                    <UnderDevelopment
                        title="Phương tiện của tôi"
                        description="Danh sách xe đã đăng ký: biển số, loại xe, hãng, model, tải trọng và trạng thái phê duyệt từ Admin."
                    />
                ),
            },
            {
                path: "vehicles/create",
                element: (
                    <UnderDevelopment
                        title="Thêm phương tiện mới"
                        description="Đăng ký xe mới: nhập biển số, chọn loại xe, hãng, model, tải trọng và tải lên giấy tờ đăng ký."
                    />
                ),
            },
            {
                path: "vehicles/:id/edit",
                element: (
                    <UnderDevelopment
                        title="Cập nhật phương tiện"
                        description="Chỉnh sửa thông tin xe: biển số, loại xe, tải trọng và cập nhật giấy tờ nếu cần."
                    />
                ),
            },

            // ==================== NHÓM 6: LỊCH SỬ & THU NHẬP ====================
            {
                path: "history",
                element: (
                    <UnderDevelopment
                        title="Lịch sử chuyến đi"
                        description="Danh sách các đơn đã hoàn thành hoặc thất bại: thời gian, tuyến đường, phí vận chuyển và đánh giá từ khách hàng."
                    />
                ),
            },
            {
                path: "history/:id",
                element: (
                    <UnderDevelopment
                        title="Chi tiết chuyến đi"
                        description="Thông tin đầy đủ của chuyến: thời gian, tuyến đường, phí, ảnh xác nhận và đánh giá từ khách hàng."
                    />
                ),
            },
            {
                path: "earnings",
                element: (
                    <UnderDevelopment
                        title="Thu nhập của tôi"
                        description="Tổng hợp thu nhập theo ngày/tuần/tháng, chi tiết từng chuyến và số dư ví hiện tại có thể rút."
                    />
                ),
            },
            {
                path: "earnings/statistics",
                element: (
                    <UnderDevelopment
                        title="Thống kê cá nhân"
                        description="Phân tích hiệu suất: tổng chuyến, tỷ lệ hoàn thành, thời gian online, đánh giá trung bình và xếp hạng."
                    />
                ),
            },

            // ==================== NHÓM 7: ĐÁNH GIÁ ====================
            {
                path: "reviews",
                element: (
                    <UnderDevelopment
                        title="Đánh giá của khách hàng"
                        description="Xem tất cả đánh giá từ khách hàng về bạn: số sao, nhận xét, đơn hàng liên quan và điểm đánh giá trung bình."
                    />
                ),
            },
            {
                path: "reviews/:id",
                element: (
                    <UnderDevelopment
                        title="Chi tiết đánh giá"
                        description="Xem chi tiết đánh giá: số sao, nhận xét, đơn hàng liên quan và thông tin khách hàng đánh giá."
                    />
                ),
            },

            // ==================== NHÓM 8: THÔNG BÁO ====================
            {
                path: "notifications",
                element: (
                    <UnderDevelopment
                        title="Thông báo"
                        description="Danh sách thông báo: đơn mới phù hợp, đơn bị hủy, đổi tài xế và các cập nhật quan trọng khác từ hệ thống."
                    />
                ),
            },
        ],
    },
]