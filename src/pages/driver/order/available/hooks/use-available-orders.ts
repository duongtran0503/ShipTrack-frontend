import type { OrderItem } from "@/services/order/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export type SortOption = "distance" | "time_asc" | "time_desc" | "fee_desc" | "fee_asc" | null;

const AVAILABLE_ORDERS_STORAGE_KEY = "shiptrack_available_orders_mock"

const getMockAvailableOrders = (): OrderItem[] => {
    const saved = localStorage.getItem(AVAILABLE_ORDERS_STORAGE_KEY)
    if (saved) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        try { return JSON.parse(saved) } catch (e) { /* ignore */ }
    }
    const defaultData: OrderItem[] = [
        {
            id: "ord_101",
            trackingCode: "ST-9912",
            senderAddress: "12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, TP.HCM",
            pickupLat: 10.8221,
            pickupLng: 106.6869,
            senderName: "Công ty TNHH ABC",
            senderPhone: "0901112223",
            receiverAddress: "45 Lê Duẩn, Bến Nghé, Quận 1, TP.HCM",
            dropoffLat: 10.7769,
            dropoffLng: 106.7009,
            receiverName: "Nguyễn Văn A",
            receiverPhone: "0909123456",
            packageName: "Hộp quà điện tử / Tài liệu",
            weightKg: 1.2,
            shippingFee: 45000,
            vehicleType: "MOTORBIKE",
            serviceType: "STANDARD",
            paymentMethod: "CASH",
            isBulky: false,
            isDoorDelivery: true,
            codAmount: 150000,
            distanceKm: 4.5,
            status: "SEARCHING_DRIVER",
            createdAt: "2026-11-03T08:00:00Z",
        },
        // Thêm các mẫu dữ liệu khác tương tự...
    ]
    localStorage.setItem(AVAILABLE_ORDERS_STORAGE_KEY, JSON.stringify(defaultData))
    return defaultData
}

export function useAvailableOrders() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [minDistance, setMinDistance] = useState<string>("")
    const [maxDistance, setMaxDistance] = useState<string>("")
    const [sortBy, setSortBy] = useState<SortOption>(null)

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["driver_available_orders"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300))
            return getMockAvailableOrders()
        },
    })

    // Khi backend thật hoạt động, chỉ cần thay đổi queryFn gọi API Axios:
    // queryFn: async () => { const res = await apiClient.get('/api/driver/orders/available'); return res.data.data; }

    const acceptOrderMutation = useMutation({
        mutationFn: async (orderId: string) => {
            await new Promise((r) => setTimeout(r, 500))
            const current = getMockAvailableOrders()
            const exists = current.find((o) => o.id === orderId)

            if (!exists) {
                throw new Error("Rất tiếc! Đơn hàng này đã được tài xế khác nhận trước đó.")
            }

            // Cập nhật trạng thái sang DELIVERING hoặc ACCEPTED_TO_PICKUP trên backend
            const updatedList = current.filter((o) => o.id !== orderId)
            localStorage.setItem(AVAILABLE_ORDERS_STORAGE_KEY, JSON.stringify(updatedList))

            // Lưu sang kho lưu trữ đơn đang thực hiện (Active Orders)
            const activeSaved = localStorage.getItem("shiptrack_active_orders_mock")
            const activeList = activeSaved ? JSON.parse(activeSaved) : []
            localStorage.setItem("shiptrack_active_orders_mock", JSON.stringify([{ ...exists, status: "DELIVERING" }, ...activeList]))

            return true
        },
        onSuccess: () => {
            toast.success("Nhận đơn hàng thành công! Đã chuyển sang danh sách đơn đang thực hiện.")
            queryClient.invalidateQueries({ queryKey: ["driver_available_orders"] })
            navigate("/driver/orders/active")
        },
        onError: (err: any) => {
            toast.error(err?.message || "Nhận đơn thất bại do xung đột dữ liệu!")
        },
    })

    // Lọc và sắp xếp khớp chuẩn các trường của OrderItem
    const filteredOrders = orders.filter((order) => {
        const min = minDistance !== "" ? parseFloat(minDistance) : null
        const max = maxDistance !== "" ? parseFloat(maxDistance) : null

        if (min !== null && order.distanceKm < min) return false
        if (max !== null && order.distanceKm > max) return false
        return true
    }).sort((a, b) => {
        if (!sortBy) return 0
        if (sortBy === "distance") return a.distanceKm - b.distanceKm
        if (sortBy === "fee_desc") return b.shippingFee - a.shippingFee
        if (sortBy === "fee_asc") return a.shippingFee - b.shippingFee
        return 0
    })

    return {
        orders: filteredOrders,
        isLoading,
        minDistance,
        setMinDistance,
        maxDistance,
        setMaxDistance,
        sortBy,
        setSortBy,
        acceptOrder: (id: string) => acceptOrderMutation.mutate(id),
        isAccepting: acceptOrderMutation.isPending,
        viewDetail: (id: string) => navigate(`/driver/orders/available/${id}`),
    }
}