import type { OrderItem } from "@/demo_data_services/mockOrderService"

export interface TimelineStep {
    status: OrderItem["status"]
    title: string
    description: string
    time?: string
    completed: boolean
    current: boolean
}

export function buildTimeline(order: OrderItem): TimelineStep[] {
    const isCancelled = order.status === "CANCELLED"

    if (isCancelled) {
        return [
            {
                status: "PENDING",
                title: "Khởi tạo đơn hàng",
                description: "Đơn hàng đã được tạo thành công",
                time: order.createdAt,
                completed: true,
                current: false,
            },
            {
                status: "CANCELLED",
                title: "Đơn hàng đã bị hủy",
                description: "Đơn hàng đã hủy bởi khách hàng",
                time: "Vừa xong",
                completed: true,
                current: true,
            },
        ]
    }

    return [
        {
            status: "PENDING",
            title: "Tạo đơn hàng",
            description: "Hệ thống ghi nhận đơn hàng",
            time: order.createdAt,
            completed: true,
            current: order.status === "PENDING",
        },
        {
            status: "SEARCHING_DRIVER",
            title: "Đang tìm tài xế",
            description: "Phát đơn cho tài xế gần nhất",
            time: order.status !== "PENDING" ? "Hệ thống tự động" : undefined,
            completed: order.status !== "PENDING",
            current: order.status === "SEARCHING_DRIVER",
        },
        {
            status: "DELIVERING",
            title: "Đang giao hàng",
            description: "Tài xế đang vận chuyển kiện hàng",
            time:
                order.status === "DELIVERING" || order.status === "COMPLETED"
                    ? "Đã lấy hàng"
                    : undefined,
            completed:
                order.status === "DELIVERING" || order.status === "COMPLETED",
            current: order.status === "DELIVERING",
        },
        {
            status: "COMPLETED",
            title: "Giao hàng thành công",
            description: "Khách hàng đã nhận hàng thành công",
            time: order.status === "COMPLETED" ? "Hoàn thành" : undefined,
            completed: order.status === "COMPLETED",
            current: order.status === "COMPLETED",
        },
    ]
}