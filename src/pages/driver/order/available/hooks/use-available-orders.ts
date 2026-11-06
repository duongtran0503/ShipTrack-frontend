import { apiClient } from "@/lib/config/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export interface AvailableOrderItem {
    id: number;
    trackingCode: string;
    pickupAddress: string;
    dropoffAddress: string;
    pickupLat: number;
    pickupLng: number;
    dropoffLat: number;
    dropoffLng: number;
    distanceFromDriverKm: number;
    tripDistanceKm: number;
    shippingFee: number;
    serviceType: string;
    vehicleType: string;
    createdAtUtc: string;
}

export type SortOption = "distance" | "time_asc" | "time_desc" | "fee_desc" | "fee_asc" | null;

export function useAvailableOrders() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [minDistance, setMinDistance] = useState<string>("");
    const [maxDistance, setMaxDistance] = useState<string>("");
    const [sortBy, setSortBy] = useState<SortOption>(null);

    // 1. Lấy trạng thái Online của tài xế
    const { data: statusResponse, isLoading: isStatsLoading, isSuccess: isStatusLoaded } = useQuery({
        queryKey: ["driver_dashboard_stats"],
        queryFn: async () => {
            const response = await apiClient.get("/drivers/status");
            const raw = response.data.data || response.data;
            return raw as { isOnline: boolean;[key: string]: any };
        },
        staleTime: 1000,
    });

    const isOnline = Boolean(statusResponse?.isOnline);

    // 2. Lấy danh sách đơn hàng khả dụng (CHỈ KHI ĐÃ TẢI XONG STATUS VÀ PHẢI ĐANG ONLINE)
    const { data: orders = [], isLoading: isOrdersLoading } = useQuery({
        queryKey: ["driver_available_orders", isOnline],
        queryFn: async () => {
            const response = await apiClient.get("/driver/orders/available");
            const raw = response.data.data || response.data;
            return Array.isArray(raw) ? (raw as AvailableOrderItem[]) : [];
        },
        // Đảm bảo chỉ bật khi API status đã load xong VÀ isOnline thực sự là true
        enabled: isStatusLoaded && isOnline === true,
        refetchInterval: isOnline ? 5000 : false,
        staleTime: 0,
    });

    // 3. Mutation Nhận đơn hàng
    const acceptOrderMutation = useMutation({
        mutationFn: async (orderId: number) => {
            const res = await apiClient.post(`/driver/orders/${orderId}/accept`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Nhận đơn hàng thành công! Đã chuyển sang danh sách đơn đang thực hiện.");
            queryClient.invalidateQueries({ queryKey: ["driver_available_orders"] });
            navigate("/driver/orders/active");
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Nhận đơn thất bại do đơn đã được tài xế khác nhận!");
        },
    });

    // Lọc và sắp xếp danh sách đơn hàng
    const filteredOrders = orders.filter((order) => {
        const min = minDistance !== "" ? parseFloat(minDistance) : null;
        const max = maxDistance !== "" ? parseFloat(maxDistance) : null;
        const distance = order.distanceFromDriverKm || 0;

        if (min !== null && distance < min) return false;
        if (max !== null && distance > max) return false;
        return true;
    }).sort((a, b) => {
        if (!sortBy) return 0;
        if (sortBy === "distance") return (a.distanceFromDriverKm || 0) - (b.distanceFromDriverKm || 0);
        if (sortBy === "fee_desc") return b.shippingFee - a.shippingFee;
        if (sortBy === "fee_asc") return a.shippingFee - b.shippingFee;
        return 0;
    });

    return {
        orders: filteredOrders,
        isLoading: isStatsLoading || (isOnline && isOrdersLoading),
        isOnline,
        minDistance,
        setMinDistance,
        maxDistance,
        setMaxDistance,
        sortBy,
        setSortBy,
        acceptOrder: (id: number) => acceptOrderMutation.mutate(id),
        isAccepting: acceptOrderMutation.isPending,
        viewDetail: (id: number) => navigate(`/driver/orders/available/${id}`),
    };
}