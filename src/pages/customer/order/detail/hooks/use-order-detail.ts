import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { toast } from "sonner"

import { buildTimeline } from "@/pages/customer/order/detail/helpers/order-timeline"
import { orderApi } from "@/services/order/order-api"

export function useOrderDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    // ==================== STATE ====================
    const [cancelReason, setCancelReason] = useState<string>("")
    const [cancelNote, setCancelNote] = useState("")
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)

    // ==================== QUERY (LẤY CHI TIẾT TỪ API THẬT) ====================
    const { data: responseData, isLoading } = useQuery({
        queryKey: ["customer_order_detail", id],
        queryFn: () => orderApi.getOrderById(id!),
        enabled: !!id,
    })

    // Map dữ liệu trả về từ backend thành format mà các component con đang sử dụng
    const rawOrder = responseData?.data

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const order = rawOrder ? {
        id: String(rawOrder.id),
        trackingCode: rawOrder.trackingCode,
        senderAddress: rawOrder.pickupAddress,
        pickupLat: rawOrder.pickupLat,
        pickupLng: rawOrder.pickupLng,
        senderName: rawOrder.senderName,
        senderPhone: rawOrder.senderPhone,
        receiverAddress: rawOrder.dropoffAddress,
        dropoffLat: rawOrder.dropoffLat,
        dropoffLng: rawOrder.dropoffLng,
        receiverName: rawOrder.receiverName,
        receiverPhone: rawOrder.receiverPhone,
        packageName: rawOrder.packageName || rawOrder.packageDetails,
        weightKg: rawOrder.weightKg,
        shippingFee: rawOrder.shippingFee || rawOrder.totalPrice || 0,
        vehicleType: rawOrder.vehicleType,
        serviceType: rawOrder.serviceType,
        paymentMethod: rawOrder.paymentMethod,
        isBulky: rawOrder.isBulky,
        isDoorDelivery: rawOrder.isDoorDelivery,
        promotionCode: rawOrder.promotionCode,
        note: rawOrder.note,
        codAmount: rawOrder.codAmount,
        distanceKm: rawOrder.distanceKm,
        status: rawOrder.status,
        createdAt: rawOrder.createdAtUtc ? rawOrder.createdAtUtc.replace("T", " ").substring(0, 16) : "",

        // Trích xuất thông tin tài xế an toàn từ object hoặc string
        driverName: typeof rawOrder.driver === "object" && rawOrder.driver !== null
            ? (rawOrder.driver as any).name
            : (rawOrder.driver || undefined),
        driverPhone: typeof rawOrder.driver === "object" && rawOrder.driver !== null
            ? (rawOrder.driver as any).phone
            : (rawOrder.driverPhone || undefined),
        driverLicensePlate: typeof rawOrder.driver === "object" && rawOrder.driver !== null
            ? (rawOrder.driver as any).licensePlate
            : undefined,
    } : null

    // ==================== MUTATION (HỦY ĐƠN HÀNG) ====================
    const cancelOrderMutation = useMutation({
        mutationFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 600))
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
        () => (order ? buildTimeline(order as any) : []),
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

    return {
        order,
        isLoading,
        timelineSteps,
        canCancel,
        isDelivering,
        isCancelDialogOpen,
        setIsCancelDialogOpen,
        cancelReason,
        setCancelReason,
        cancelNote,
        setCancelNote,
        isCancelling: cancelOrderMutation.isPending,
        handleCancel,
        goBack,
        goToTracking,
    }
}