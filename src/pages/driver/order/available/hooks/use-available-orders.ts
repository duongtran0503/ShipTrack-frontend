import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export interface AvailableOrder {
    id: string | number;
    trackingCode: string;
    pickupAddress: string;
    pickupLat: number;
    pickupLng: number;
    dropoffAddress: string;
    dropoffLat: number;
    dropoffLng: number;
    distanceKm: number;
    shippingFee: number;
    estimatedMinutes: number;
    customerName: string;
    createdAt: string;
}

export type SortOption = "distance" | "time_asc" | "time_desc" | "fee_desc" | "fee_asc" | null;

const AVAILABLE_ORDERS_STORAGE_KEY = "shiptrack_available_orders_mock"

const getMockAvailableOrders = (): AvailableOrder[] => {
    const saved = localStorage.getItem(AVAILABLE_ORDERS_STORAGE_KEY)
    if (saved) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        try { return JSON.parse(saved) } catch (e) { /* ignore */ }
    }
    const defaultData: AvailableOrder[] = [
        {
            id: "ord_101",
            trackingCode: "ST-9912",
            pickupAddress: "12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, TP.HCM",
            pickupLat: 10.8221,
            pickupLng: 106.6869,
            dropoffAddress: "45 Lê Duẩn, Bến Nghé, Quận 1, TP.HCM",
            dropoffLat: 10.7769,
            dropoffLng: 106.7009,
            distanceKm: 4.5,
            shippingFee: 45000,
            estimatedMinutes: 18,
            customerName: "Nguyễn Văn A",
            createdAt: "Vừa xong",
        },
        {
            id: "ord_102",
            trackingCode: "ST-9915",
            pickupAddress: "88 Trường Chinh, Phường 12, Tân Bình, TP.HCM",
            pickupLat: 10.8012,
            pickupLng: 106.6378,
            dropoffAddress: "300 CMT8, Phường 10, Quận 3, TP.HCM",
            dropoffLat: 10.7825,
            dropoffLng: 106.6750,
            distanceKm: 2.8,
            shippingFee: 32000,
            estimatedMinutes: 12,
            customerName: "Trần Thị B",
            createdAt: "2 phút trước",
        },
        {
            id: "ord_103",
            trackingCode: "ST-9920",
            pickupAddress: "25 Tô Bản, Phường 13, Tân Bình, TP.HCM",
            pickupLat: 10.8105,
            pickupLng: 106.6450,
            dropoffAddress: "102 Phan Xích Long, Phường 2, Phú Nhuận, TP.HCM",
            dropoffLat: 10.7981,
            dropoffLng: 106.6872,
            distanceKm: 6.2,
            shippingFee: 60000,
            estimatedMinutes: 24,
            customerName: "Lê Hoàng C",
            createdAt: "5 phút trước",
        },
    ]
    localStorage.setItem(AVAILABLE_ORDERS_STORAGE_KEY, JSON.stringify(defaultData))
    return defaultData
}

const saveMockAvailableOrders = (orders: AvailableOrder[]) => {
    localStorage.setItem(AVAILABLE_ORDERS_STORAGE_KEY, JSON.stringify(orders))
}

export function useAvailableOrders() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    // Bộ lọc khoảng cách từ - đến (mặc định trống)
    const [minDistance, setMinDistance] = useState<string>("")
    const [maxDistance, setMaxDistance] = useState<string>("")

    // Sắp xếp (mặc định là null - không chọn gì cả)
    const [sortBy, setSortBy] = useState<SortOption>(null)

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["driver_available_orders"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300))
            return getMockAvailableOrders()
        },
    })

    // Giả lập Real-time sync
    useEffect(() => {
        const interval = setInterval(() => {
            const current = getMockAvailableOrders()
            if (current.length < 4 && Math.random() > 0.6) {
                const newOrder: AvailableOrder = {
                    id: `ord_${Math.floor(Math.random() * 900) + 100}`,
                    trackingCode: `ST-${Math.floor(Math.random() * 9000) + 1000}`,
                    pickupAddress: "Khu Công nghệ Sạ, Thủ Đức, TP.HCM",
                    pickupLat: 10.8455,
                    pickupLng: 106.7950,
                    dropoffAddress: "Vincom Center, 72 Lê Thánh Tôn, Quận 1, TP.HCM",
                    dropoffLat: 10.7770,
                    dropoffLng: 106.7020,
                    distanceKm: parseFloat((Math.random() * 7 + 1).toFixed(1)),
                    shippingFee: Math.floor(Math.random() * 40000) + 30000,
                    estimatedMinutes: Math.floor(Math.random() * 20) + 10,
                    customerName: "Khách hàng mới",
                    createdAt: "Vừa xong",
                }
                const updated = [newOrder, ...current]
                saveMockAvailableOrders(updated)
                queryClient.setQueryData(["driver_available_orders"], updated)
                toast.info(`Có đơn hàng mới quanh đây! (#${newOrder.trackingCode})`)
            }
        }, 15000)

        return () => clearInterval(interval)
    }, [queryClient])

    const acceptOrderMutation = useMutation({
        mutationFn: async (orderId: string | number) => {
            await new Promise((r) => setTimeout(r, 500))
            const current = getMockAvailableOrders()
            const exists = current.find((o) => o.id === orderId)

            if (!exists) {
                throw new Error("Rất tiếc! Đơn hàng này đã được tài xế khác nhận trước đó.")
            }

            const updated = current.filter((o) => o.id !== orderId)
            saveMockAvailableOrders(updated)
            return updated
        },
        onSuccess: (updated) => {
            toast.success("Nhận đơn hàng thành công! Đã chuyển sang danh sách đơn đang thực hiện.")
            queryClient.setQueryData(["driver_available_orders"], updated)
            navigate("/driver/orders/active")
        },
        onError: (err: any) => {
            toast.error(err?.message || "Nhận đơn thất bại do xung đột dữ liệu!")
            queryClient.invalidateQueries({ queryKey: ["driver_available_orders"] })
        },
    })

    // Lọc theo khoảng cách Từ - Đến và Sắp xếp
    const filteredOrders = orders.filter((order) => {
        const min = minDistance !== "" ? parseFloat(minDistance) : null
        const max = maxDistance !== "" ? parseFloat(maxDistance) : null

        if (min !== null && order.distanceKm < min) return false
        if (max !== null && order.distanceKm > max) return false
        return true
    }).sort((a, b) => {
        if (!sortBy) return 0
        if (sortBy === "distance") return a.distanceKm - b.distanceKm
        if (sortBy === "time_asc") return a.estimatedMinutes - b.estimatedMinutes
        if (sortBy === "time_desc") return b.estimatedMinutes - a.estimatedMinutes
        if (sortBy === "fee_desc") return b.shippingFee - a.shippingFee
        if (sortBy === "fee_asc") return a.shippingFee - b.shippingFee
        return 0
    })

    const viewDetail = (id: string | number) => {
        navigate(`/driver/orders/available/${id}`)
    }

    return {
        orders: filteredOrders,
        isLoading,
        minDistance,
        setMinDistance,
        maxDistance,
        setMaxDistance,
        sortBy,
        setSortBy,
        acceptOrder: (id: string | number) => acceptOrderMutation.mutate(id),
        isAccepting: acceptOrderMutation.isPending,
        viewDetail,
    }
}