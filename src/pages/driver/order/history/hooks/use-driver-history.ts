import type { OrderItem } from "@/services/order/type";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";

export interface HistoryOrderItem extends OrderItem {
    completedAt?: string;
    reviewRating?: number;
    reviewComment?: string;
    failureReason?: string;
}

const HISTORY_ORDERS_STORAGE_KEY = "shiptrack_history_orders_mock"

const getMockHistoryOrders = (): HistoryOrderItem[] => {
    const saved = localStorage.getItem(HISTORY_ORDERS_STORAGE_KEY)
    if (saved) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        try { return JSON.parse(saved) } catch (e) { /* ignore */ }
    }
    const defaultData: HistoryOrderItem[] = [
        {
            id: "ord_hist_01",
            trackingCode: "ST-7712",
            senderAddress: "456 Nguyễn Huệ, Quận 1, TP.HCM",
            pickupLat: 10.7769,
            pickupLng: 106.7009,
            receiverAddress: "789 Lê Văn Việt, Thành phố Thủ Đức, TP.HCM",
            dropoffLat: 10.8500,
            dropoffLng: 106.7700,
            receiverName: "Nguyễn Văn Hoàng",
            receiverPhone: "0909123456",
            packageName: "Tài liệu hợp đồng kinh doanh",
            weightKg: 0.5,
            shippingFee: 45000,
            vehicleType: "MOTORBIKE",
            serviceType: "STANDARD",
            paymentMethod: "CASH",
            isBulky: false,
            isDoorDelivery: true,
            codAmount: 0,
            distanceKm: 12.5,
            status: "COMPLETED",
            createdAt: "2026-10-20T14:00:00Z",
            completedAt: "20/10/2024 14:30",
            reviewRating: 5.0,
            reviewComment: "Tài xế giao hàng rất nhanh nhẹn và lịch sự!",
        },
        {
            id: "ord_hist_02",
            trackingCode: "ST-7715",
            senderAddress: "123 Lê Lợi, Quận 1, TP.HCM",
            pickupLat: 10.7721,
            pickupLng: 106.6988,
            receiverAddress: "456 Trần Hưng Đạo, Quận 5, TP.HCM",
            dropoffLat: 10.7550,
            dropoffLng: 106.6600,
            receiverName: "Trần Thị Mai",
            receiverPhone: "0912345678",
            packageName: "Hộp quà sinh nhật",
            weightKg: 1.5,
            shippingFee: 35000,
            vehicleType: "MOTORBIKE",
            serviceType: "EXPRESS",
            paymentMethod: "CASH",
            isBulky: false,
            isDoorDelivery: true,
            codAmount: 350000,
            distanceKm: 8.2,
            status: "FAILED",
            createdAt: "2026-10-19T09:45:00Z",
            completedAt: "19/10/2024 10:15",
            failureReason: "Khách không có nhà",
        },
        {
            id: "ord_hist_03",
            trackingCode: "ST-7720",
            senderAddress: "12 Đinh Tiên Hoàng, Quận 1, TP.HCM",
            pickupLat: 10.7900,
            pickupLng: 106.7000,
            receiverAddress: "15 Nguyễn Xiển, Thủ Đức, TP.HCM",
            dropoffLat: 10.8400,
            dropoffLng: 106.7600,
            receiverName: "Lê Văn Tám",
            receiverPhone: "0988776655",
            packageName: "Linh kiện điện tử",
            weightKg: 2.0,
            shippingFee: 65000,
            vehicleType: "MOTORBIKE",
            serviceType: "STANDARD",
            paymentMethod: "CASH",
            isBulky: true,
            isDoorDelivery: false,
            codAmount: 1200000,
            distanceKm: 10.0,
            status: "COMPLETED",
            createdAt: "2026-10-18T08:00:00Z",
            completedAt: "18/10/2024 09:10",
            reviewRating: 4.0,
            reviewComment: "Giao hàng đúng giờ.",
        },
    ]
    localStorage.setItem(HISTORY_ORDERS_STORAGE_KEY, JSON.stringify(defaultData))
    return defaultData
}

export function useDriverHistory() {
    const navigate = useNavigate()

    // States bộ lọc
    const [statusFilter, setStatusFilter] = useState<string>("ALL")
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [sortBy, setSortBy] = useState<string>("latest")
    const [chartPeriodTab, setChartPeriodTab] = useState<"WEEK" | "MONTH">("WEEK")

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["driver_history_orders"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300))
            return getMockHistoryOrders()
        },
    })

    // Lọc và sắp xếp danh sách chuyến đi
    const filteredOrders = orders.filter((o) => {
        if (statusFilter !== "ALL" && o.status !== statusFilter) return false
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase()
            const matchCode = o.trackingCode.toLowerCase().includes(query)
            const matchSender = o.senderAddress.toLowerCase().includes(query)
            const matchReceiver = o.receiverAddress.toLowerCase().includes(query)
            if (!matchCode && !matchSender && !matchReceiver) return false
        }
        return true
    }).sort((a, b) => {
        if (sortBy === "latest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        if (sortBy === "fee_desc") return (b.shippingFee || 0) - (a.shippingFee || 0)
        return 0
    })

    // Tính toán KPI Thống kê tổng quan (Phần A)
    const finishedOrders = orders.filter(o => o.status === "COMPLETED" || o.status === "FAILED")
    const completedOrders = orders.filter(o => o.status === "COMPLETED")
    const failedOrders = orders.filter(o => o.status === "FAILED")

    const totalFinished = finishedOrders.length
    const completionRate = totalFinished > 0 ? ((completedOrders.length / totalFinished) * 100).toFixed(1) : "0"
    const failureRate = totalFinished > 0 ? ((failedOrders.length / totalFinished) * 100).toFixed(1) : "0"

    const ratedOrders = completedOrders.filter(o => o.reviewRating !== undefined)
    const avgRating = ratedOrders.length > 0
        ? (ratedOrders.reduce((sum, o) => sum + (o.reviewRating || 0), 0) / ratedOrders.length).toFixed(1)
        : "5.0"

    const totalDistance = completedOrders.reduce((sum, o) => sum + (o.distanceKm || 0), 0)

    const handleResetFilter = () => {
        setStatusFilter("ALL")
        setSearchQuery("")
        setSortBy("latest")
    }

    return {
        orders: filteredOrders,
        totalOrdersCount: orders.length,
        isLoading,
        statusFilter,
        setStatusFilter,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        chartPeriodTab,
        setChartPeriodTab,
        handleResetFilter,
        kpi: {
            totalFinished,
            completionRate,
            failureRate,
            avgRating,
            avgDeliveryMinutes: 32, // Giá trị trung bình mẫu
            totalDistance: totalDistance.toFixed(1),
        },
        viewDetail: (id: string | number) => navigate(`/driver/history/${id}`),
    }
}