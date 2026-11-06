export interface TimelineStep {
    title: string;
    description: string;
    time?: string;
    completed: boolean;
    current: boolean;
}

export function buildTimeline(order: { status: string; createdAt?: string }): TimelineStep[] {
    const status = order.status;

    // Danh sách các mốc trạng thái chuẩn của hệ thống Shiptrack
    const stepsConfig = [
        {
            key: "PENDING",
            title: "Khởi tạo đơn hàng",
            description: "Đơn hàng đã được tạo thành công trên hệ thống và đang chờ xử lý.",
        },
        {
            key: "SEARCHING_DRIVER",
            title: "Đang tìm tài xế",
            description: "Hệ thống đang tự động tìm kiếm và phân công tài xế ở khu vực gần nhất.",
        },
        {
            key: "DRIVER_ASSIGNED",
            title: "Tài xế đã nhận đơn",
            description: "Tài xế đã xác nhận nhận đơn hàng và đang di chuyển đến điểm lấy hàng.",
        },
        {
            key: "PICKED_UP",
            title: "Đã lấy hàng thành công",
            description: "Tài xế đã nhận bưu phẩm từ người gửi và bắt đầu hành trình giao hàng.",
        },
        {
            key: "DELIVERING",
            title: "Đang giao hàng",
            description: "Tài xế đang vận chuyển đơn hàng đến địa chỉ của người nhận.",
        },
        {
            key: "COMPLETED",
            title: "Đã hoàn thành",
            description: "Đơn hàng đã được giao thành công cho người nhận.",
        },
    ];

    // Xử lý đặc biệt cho các trạng thái kết thúc bất thường (Hủy hoặc Thất bại)
    if (status === "CANCELLED" || status === "FAILED") {
        const isCancelled = status === "CANCELLED";
        return [
            {
                title: "Khởi tạo đơn hàng",
                description: "Đơn hàng đã được khởi tạo.",
                completed: true,
                current: false,
            },
            {
                title: isCancelled ? "Đơn hàng đã bị hủy" : "Giao hàng thất bại",
                description: isCancelled
                    ? "Đơn hàng đã bị hủy bỏ bởi người dùng hoặc hệ thống."
                    : "Tài xế không thể hoàn tất việc giao hàng.",
                completed: false,
                current: true,
                time: order.createdAt,
            },
        ];
    }

    // Thứ tự ưu tiên của các trạng thái bình thường
    const statusOrder = ["PENDING", "SEARCHING_DRIVER", "DRIVER_ASSIGNED", "PICKED_UP", "DELIVERING", "COMPLETED"];
    const currentIndex = statusOrder.indexOf(status);

    return stepsConfig.map((step,) => {
        const stepIndex = statusOrder.indexOf(step.key);
        const isCompleted = stepIndex < currentIndex || (status === "COMPLETED" && step.key === "COMPLETED");
        const isCurrent = step.key === status;

        return {
            title: step.title,
            description: step.description,
            completed: isCompleted,
            current: isCurrent,
            time: isCurrent || isCompleted ? order.createdAt : undefined,
        };
    });
}