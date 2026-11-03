import type { OrderItem } from "@/services/order/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export type ActiveOrderStatus =
    | "PENDING" | "SEARCHING_DRIVER" | "DELIVERING" | "COMPLETED" | "CANCELLED" | "PICKED_UP";

export interface ActiveOrderItem extends OrderItem {
    acceptedAt?: string;
    driverStatusLabel?: string;
}

export type ActiveSortOption = "distance_asc" | "distance_desc" | "fee_desc" | "fee_asc" | null;

const ACTIVE_ORDERS_STORAGE_KEY = "shiptrack_active_orders_mock";

const getMockActiveOrders = (): ActiveOrderItem[] => {
    const saved = localStorage.getItem(ACTIVE_ORDERS_STORAGE_KEY);
    if (saved) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    const defaultData: ActiveOrderItem[] = [
        {
            id: "ord_201",
            trackingCode: "ST-8821",
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
            status: "DELIVERING",
            createdAt: "2026-11-03T08:00:00Z",
            acceptedAt: "Vừa nhận (5 phút trước)",
            driverStatusLabel: "Đang đến điểm lấy hàng",
        },
        {
            id: "ord_202",
            trackingCode: "ST-8825",
            senderAddress: "88 Trường Chinh, Tân Bình, TP.HCM",
            pickupLat: 10.8012,
            pickupLng: 106.6378,
            senderName: "Shop Thời Trang XYZ",
            senderPhone: "0902223344",
            receiverAddress: "300 CMT8, Quận 3, TP.HCM",
            dropoffLat: 10.7825,
            dropoffLng: 106.6750,
            receiverName: "Trần Thị B",
            receiverPhone: "0912345678",
            packageName: "Quần áo thời trang",
            weightKg: 0.8,
            shippingFee: 32000,
            vehicleType: "MOTORBIKE",
            serviceType: "STANDARD",
            paymentMethod: "CASH",
            isBulky: false,
            isDoorDelivery: true,
            codAmount: 250000,
            distanceKm: 2.8,
            status: "DELIVERING",
            createdAt: "2026-11-03T08:15:00Z",
            acceptedAt: "15 phút trước",
            driverStatusLabel: "Đang trên đường giao hàng",
        },
    ];
    localStorage.setItem(ACTIVE_ORDERS_STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
};

const saveMockActiveOrders = (orders: ActiveOrderItem[]) => {
    localStorage.setItem(ACTIVE_ORDERS_STORAGE_KEY, JSON.stringify(orders));
};

export function useActiveOrders() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Thêm state quản lý sắp xếp
    const [sortBy, setSortBy] = useState<ActiveSortOption>(null);

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["driver_active_orders"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return getMockActiveOrders();
        },
    });

    const updateQuickStatusMutation = useMutation({
        mutationFn: async ({ orderId, nextStatus }: { orderId: string | number; nextStatus: ActiveOrderStatus }) => {
            await new Promise((r) => setTimeout(r, 400));
            const current = getMockActiveOrders();
            const updated = current.map((o) => {
                if (String(o.id) === String(orderId)) {
                    let label = o.driverStatusLabel;
                    if (nextStatus === "PICKED_UP") label = "Đã lấy hàng - Sẵn sàng giao";
                    if (nextStatus === "DELIVERING") label = "Đang trên đường giao hàng";
                    if (nextStatus === "COMPLETED") label = "Đã giao thành công";
                    return { ...o, status: nextStatus, driverStatusLabel: label };
                }
                return o;
            });
            saveMockActiveOrders(updated);
            return updated;
        },
        onSuccess: (updated) => {
            toast.success("Cập nhật trạng thái đơn hàng thành công!");
            queryClient.setQueryData(["driver_active_orders"], updated);
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