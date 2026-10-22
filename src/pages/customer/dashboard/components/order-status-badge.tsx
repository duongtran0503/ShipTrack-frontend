import { CheckCircle2, Clock, Truck } from "lucide-react"

import type { OrderItem } from "@/demo_data_services/mockOrderService"

interface Props {
    status: OrderItem["status"]
}

export function OrderStatusBadge({ status }: Props) {
    switch (status) {
        case "DELIVERING":
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Truck className="size-3.5" /> Đang giao hàng
                </span>
            )
        case "SEARCHING_DRIVER":
        case "PENDING":
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <Clock className="size-3.5" /> Đang tìm tài xế
                </span>
            )
        case "COMPLETED":
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="size-3.5" /> Hoàn thành
                </span>
            )
        case "CANCELLED":
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-destructive/10 text-destructive">
                    Đã hủy
                </span>
            )
        default:
            return null
    }
}