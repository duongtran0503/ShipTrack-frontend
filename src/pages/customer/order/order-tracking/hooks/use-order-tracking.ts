import { orderApi } from "@/services/order/order-api"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router"

export function useOrderTracking() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    // ==================== QUERY (API THẬT) ====================
    const { data: responseData, isLoading } = useQuery({
        queryKey: ["customer_order_tracking", id],
        queryFn: () => orderApi.getOrderById(id!),
        enabled: !!id,
    })

    const rawOrder = responseData?.data
    console.log(rawOrder, "lsdjflksdjflk")

    // Map dữ liệu từ response API thật
    const order = rawOrder ? {
        id: String(rawOrder.id),
        trackingCode: rawOrder.trackingCode,
        status: rawOrder.status,
        senderAddress: rawOrder.pickupAddress,
        receiverAddress: rawOrder.dropoffAddress,
        receiverName: rawOrder.receiverName,
        receiverPhone: rawOrder.receiverPhone,
        distanceKm: rawOrder.distanceKm,
        // Thông tin tài xế từ object driver của API
        driverName: typeof rawOrder.driver === "object" && rawOrder.driver !== null
            ? (rawOrder.driver as any).name
            : "Chưa phân công",
        driverPhone: typeof rawOrder.driver === "object" && rawOrder.driver !== null
            ? (rawOrder.driver as any).phone
            : "",
        driverLicensePlate: typeof rawOrder.driver === "object" && rawOrder.driver !== null
            ? (rawOrder.driver as any).licensePlate
            : "",
    } : null

    // ==================== HANDLERS ====================
    const goBackToDetail = () => navigate(`/customer/orders/${id}`)
    const goToDashboard = () => navigate("/customer/dashboard")

    return {
        order,
        isLoading,
        isConnected: true, // Trạng thái hiển thị giao diện UI tĩnh
        goBackToDetail,
        goToDashboard,
    }
}