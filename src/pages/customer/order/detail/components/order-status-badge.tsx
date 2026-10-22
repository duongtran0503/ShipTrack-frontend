import { CheckCircle2, Clock, Truck, XCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { OrderItem } from "@/demo_data_services/mockOrderService"

interface Props {
    status: OrderItem["status"]
}

export function OrderDetailStatusBadge({ status }: Props) {
    switch (status) {
        case "DELIVERING":
            return (
                <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 font-bold px-3 py-1 rounded-full">
                    <Truck className="size-3.5 mr-1" /> Đang giao hàng
                </Badge>
            )
        case "SEARCHING_DRIVER":
            return (
                <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 font-bold px-3 py-1 rounded-full">
                    <Clock className="size-3.5 mr-1" /> Đang tìm tài xế
                </Badge>
            )
        case "COMPLETED":
            return (
                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold px-3 py-1 rounded-full">
                    <CheckCircle2 className="size-3.5 mr-1" /> Hoàn thành
                </Badge>
            )
        case "CANCELLED":
            return (
                <Badge className="bg-destructive/10 text-destructive border-destructive/20 font-bold px-3 py-1 rounded-full">
                    <XCircle className="size-3.5 mr-1" /> Đã hủy
                </Badge>
            )
        default:
            return null
    }
}