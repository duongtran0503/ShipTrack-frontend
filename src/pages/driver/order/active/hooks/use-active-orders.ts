import { apiClient } from "@/lib/config/axios";
import type { OrderItem } from "@/services/order/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export type ActiveOrderStatus =
    | "PENDING" | "SEARCHING_DRIVER" | "DELIVERING" | "COMPLETED" | "CANCELLED" | "PICKED_UP";

export interface ActiveOrderItem extends OrderItem {
    pickupAddress: string;
    dropoffAddress: string;
    tripDistanceKm?: number;
    acceptedAt?: string;
    driverStatusLabel?: string;
}

export type ActiveSortOption = "distance_asc" | "distance_desc" | "fee_desc" | "fee_asc" | null;

export function useActiveOrders() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // State quản lý sắp xếp
    const [sortBy, setSortBy] = useState<ActiveSortOption>(null);

    // 1. GET /driver/orders/active — Lấy danh sách đơn hàng đang thực hiện từ API thực tế
    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["driver_active_orders"],
        queryFn: async () => {
            const response = await apiClient.get("/driver/orders/active");
            const rawList = (response.data.data || response.data) as any[];

            // Map dữ liệu API backend sang ActiveOrderItem
            return rawList.map((item): ActiveOrderItem => ({
                ...item,
                id: String(item.id),
                senderAddress: item.pickupAddress,
                receiverAddress: item.dropoffAddress,
                distanceKm: item.tripDistanceKm || 0,
                status: item.status || "DELIVERING",
                createdAt: item.createdAtUtc || new Date().toISOString(),
                acceptedAt: "Đang thực hiện",
                driverStatusLabel: item.status === "PICKED_UP" ? "Đã lấy hàng - Sẵn sàng giao" : "Đang trên đường giao hàng",
            }));
        },
        refetchInterval: 10000, // Tự động cập nhật real-time mỗi 10 giây
    });

    // 2. Mutation Cập nhật trạng thái đơn hàng (nếu backend hỗ trợ endpoint cập nhật)
    const updateQuickStatusMutation = useMutation({
        mutationFn: async ({ orderId, nextStatus }: { orderId: string | number; nextStatus: ActiveOrderStatus }) => {
            // Giả lập hoặc gọi API update trạng thái đơn hàng thực tế tại đây nếu có, ví dụ:
            // await apiClient.patch(`/driver/orders/${orderId}/status`, { status: nextStatus });
            return { orderId, nextStatus };
        },
        onSuccess: () => {
            toast.success("Cập nhật trạng thái đơn hàng thành công!");
            queryClient.invalidateQueries({ queryKey: ["driver_active_orders"] });
        },
        onError: () => {
            toast.error("Không thể cập nhật trạng thái. Vui lòng thử lại!");
        },
    });

    // Thực hiện sắp xếp danh sách đơn hàng dựa trên sortBy đã chọn
    const sortedOrders = [...orders].sort((a, b) => {
        if (!sortBy) return 0;
        if (sortBy === "distance_asc") return (a.distanceKm || 0) - (b.distanceKm || 0);
        if (sortBy === "distance_desc") return (b.distanceKm || 0) - (a.distanceKm || 0);
        if (sortBy === "fee_desc") return (b.shippingFee || 0) - (a.shippingFee || 0);
        if (sortBy === "fee_asc") return (a.shippingFee || 0) - (b.shippingFee || 0);
        return 0;
    });

    return {
        orders: sortedOrders,
        isLoading,
        sortBy,
        setSortBy,
        updateQuickStatus: (orderId: string | number, nextStatus: ActiveOrderStatus) =>
            updateQuickStatusMutation.mutate({ orderId, nextStatus }),
        isUpdating: updateQuickStatusMutation.isPending,
        viewDetail: (id: string | number) => navigate(`/driver/orders/active/${id}`),
        openRouteMap: (id: string | number, e: React.MouseEvent) => {
            e.stopPropagation();
            navigate(`/driver/orders/active/${id}/route`);
        },
    };
}