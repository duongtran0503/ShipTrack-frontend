import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { toast } from "sonner"

import {
    mockOrderService,
    type OrderItem,
} from "@/demo_data_services/mockOrderService"
import { buildTimeline } from "@/pages/customer/order/detail/helpers/order-timeline"

export function useOrderDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    // ==================== STATE ====================
    const [cancelReason, setCancelReason] = useState<string>("")
    const [cancelNote, setCancelNote] = useState("")
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)

    // ==================== QUERY ====================
    const { data: order, isLoading } = useQuery({
        queryKey: ["customer_order_detail", id],
        queryFn: async () => {
            const orders = await mockOrderService.getRecentOrders()
            return (
                orders.find((o) => o.id === id || o.trackingCode === id) ?? orders[0]
            )
        },
    })

    // ==================== MUTATION ====================
    const cancelOrderMutation = useMutation({
        mutationFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 600))
            if (!order) return

            const existingData = localStorage.getItem("shiptrack_customer_orders")
            if (existingData) {
                const orders: OrderItem[] = JSON.parse(existingData)
                const idx = orders.findIndex((o) => o.id === order.id)
                if (idx !== -1) {
                    orders[idx].status = "CANCELLED"
                    localStorage.setItem(
                        "shiptrack_customer_orders",
                        JSON.stringify(orders)
                    )
                }
            }
        },
        onSuccess: () => {
            toast.success("Đã hủy đơn hàng thành công!")
            setIsCancelDialogOpen(false)
            queryClient.invalidateQueries({
                queryKey: ["customer_order_detail", id],
            })
        },
        onError: () => {
            toast.error("Không thể hủy đơn hàng!")
        },
    })

    // ==================== DERIVED ====================
    const timelineSteps = useMemo(
        () => (order ? buildTimeline(order) : []),
        [order]
    )

    const canCancel =
        order?.status === "PENDING" || order?.status === "SEARCHING_DRIVER"

    const isDelivering = order?.status === "DELIVERING"

    // ==================== HANDLERS ====================
    const goBack = () => navigate("/customer/orders")
    const goToTracking = () => {
        if (order) navigate(`/customer/orders/${order.id}/tracking`)
    }

    const handleCancel = () => {
        if (!cancelReason) {
            toast.error("Vui lòng chọn lý do hủy đơn!")
            return
        }
        cancelOrderMutation.mutate()
    }

    // ==================== RETURN ====================
    return {
        // Data
        order,
        isLoading,

        // Derived
        timelineSteps,
        canCancel,
        isDelivering,

        // Cancel dialog
        isCancelDialogOpen,
        setIsCancelDialogOpen,
        cancelReason,
        setCancelReason,
        cancelNote,
        setCancelNote,
        isCancelling: cancelOrderMutation.isPending,
        handleCancel,

        // Navigation
        goBack,
        goToTracking,
    }
}