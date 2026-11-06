import { AlertTriangle, CheckCircle2, Clock, PackageCheck, Truck, UserCheck, XCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { OrderItem } from "@/demo_data_services/mockOrderService"

interface Props {
    status: OrderItem["status"]
}

export function OrderDetailStatusBadge({ status }: Props) {
    switch (status) {
        case "PENDING":
            return (
                <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 font-bold px-3.5 py-1.5 rounded-full shadow-sm">
                    <Clock className="size-3.5 mr-1.5 animate-spin text-amber-500" /> Chờ xác nhận
                </Badge>
            )
        case "SEARCHING_DRIVER":
            return (
                <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 font-bold px-3.5 py-1.5 rounded-full shadow-sm animate-pulse">
                    <Clock className="size-3.5 mr-1.5 text-amber-500" /> Đang tìm tài xế
                </Badge>
            )
        case "DRIVER_ASSIGNED":
            return (
                <Badge className="bg-indigo-500/10 text-indigo-600 border-indigo-500/20 font-bold px-3.5 py-1.5 rounded-full shadow-sm">
                    <UserCheck className="size-3.5 mr-1.5 text-indigo-500" /> Đã nhận đơn (Tài xế đang đến)
                </Badge>
            )
        case "PICKED_UP":
            return (
                <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20 font-bold px-3.5 py-1.5 rounded-full shadow-sm">
                    <PackageCheck className="size-3.5 mr-1.5 text-purple-500" /> Đã lấy hàng
                </Badge>
            )
        case "DELIVERING":
            return (
                <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 font-bold px-3.5 py-1.5 rounded-full shadow-sm">
                    <Truck className="size-3.5 mr-1.5 animate-bounce text-blue-500" /> Đang giao hàng
                </Badge>
            )
        case "COMPLETED":
            return (
                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold px-3.5 py-1.5 rounded-full shadow-sm">
                    <CheckCircle2 className="size-3.5 mr-1.5 text-emerald-500" /> Hoàn thành
                </Badge>
            )
        case "CANCELLED":
            return (
                <Badge className="bg-destructive/10 text-destructive border-destructive/20 font-bold px-3.5 py-1.5 rounded-full shadow-sm">
                    <XCircle className="size-3.5 mr-1.5" /> Đã hủy
                </Badge>
            )
        case "FAILED":
            return (
                <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/20 font-bold px-3.5 py-1.5 rounded-full shadow-sm">
                    <AlertTriangle className="size-3.5 mr-1.5 text-rose-500" /> Giao thất bại
                </Badge>
            )
        default:
            return (
                <Badge className="bg-muted text-muted-foreground border-border font-medium px-3.5 py-1.5 rounded-full">
                    {status || "Không rõ trạng thái"}
                </Badge>
            )
    }
}