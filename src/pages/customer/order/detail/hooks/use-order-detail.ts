import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { toast } from "sonner"

import { getSignalRConnection, startSignalRConnection } from "@/lib/signalR/signalr-hub"
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

    // ==================== SIGNALR REAL-TIME LISTENER ====================
    useEffect(() => {
        if (!id) return

        const connection = getSignalRConnection()

        const setupSignalR = async () => {
            await startSignalRConnection()

            try {
                if (connection.state === "Connected") {
                    await connection.invoke("JoinOrderGroup", Number(id))
                }
            } catch (err) {
                console.error("Error joining order group:", err)
            }

            connection.on("OrderStatusChanged", (updatedOrderPayload: any) => {
                if (updatedOrderPayload && String(updatedOrderPayload.id) === String(id)) {
                    queryClient.setQueryData(["customer_order_detail", id], (oldData: any) => {
                        if (!oldData) return oldData
                        return {
                            ...oldData,
                            data: {
                                ...oldData.data,
                                ...updatedOrderPayload,
                            },
                        }
                    })

                    queryClient.invalidateQueries({ queryKey: ["customer_order_detail", id] })
                }
            })
        }

        setupSignalR()

        return () => {
            if (connection) {
                connection.invoke("LeaveOrderGroup", Number(id)).catch(() => { })
                connection.off("OrderStatusChanged")
            }
        }
    }, [id, queryClient])

    // ==================== MAP DỮ LIỆU TỪ BACKEND ====================
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

        // Trích xuất thông tin tài xế an toàn
        driverName: typeof rawOrder.driver === "object" && rawOrder.driver !== null
            ? (rawOrder.driver as any).name
            : (rawOrder.driver || rawOrder.driverName || undefined),
        driverPhone: typeof rawOrder.driver === "object" && rawOrder.driver !== null
            ? (rawOrder.driver as any).phone
            : (rawOrder.driverPhone || undefined),
        driverLicensePlate: typeof rawOrder.driver === "object" && rawOrder.driver !== null
            ? (rawOrder.driver as any).licensePlate
            : (rawOrder.driverLicensePlate || undefined),
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

    // Mở rộng các trạng thái cho phép hủy đơn
    const canCancel =
        order?.status === "PENDING" || order?.status === "SEARCHING_DRIVER"

    // Mở rộng nhận diện trạng thái đang thực hiện giao hàng
    const isDelivering =
        order?.status === "DRIVER_ASSIGNED" ||
        order?.status === "PICKED_UP" ||
        order?.status === "DELIVERING"

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