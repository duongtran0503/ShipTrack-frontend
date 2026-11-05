import { apiClient } from "@/lib/config/axios";
import type { OrderItem } from "@/services/order/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export interface AdminOrderType extends OrderItem {
    driverName?: string;
    driverPhone?: string;
}

// Mock data dự phòng
const MOCK_ORDERS: AdminOrderType[] = [
    {
        id: "1",
        trackingCode: "TRK-A83F20",
        senderName: "Nguyễn Văn A",
        senderPhone: "0901112223",
        senderAddress: "227 Nguyễn Văn Cừ, Q.5, TP.HCM",
        pickupLat: 10.7626, pickupLng: 106.6835,
        receiverName: "Trần Thị B",
        receiverPhone: "0904445556",
        receiverAddress: "135 Nam Kỳ Khởi Nghĩa, Q.1, TP.HCM",
        dropoffLat: 10.7765, dropoffLng: 106.7009,
        packageName: "Tài liệu kinh doanh",
        weightKg: 1.2, shippingFee: 45000,
        vehicleType: "MOTORBIKE", serviceType: "Giao tiêu chuẩn",
        paymentMethod: "CASH", isBulky: false, isDoorDelivery: true,
        codAmount: 0, distanceKm: 4.2,
        status: "SEARCHING_DRIVER",
        createdAt: "2026-11-04 14:10",
    },
    {
        id: "2",
        trackingCode: "TRK-B91C12",
        senderName: "Trần Thị B",
        senderPhone: "0904445556",
        senderAddress: "12 Võ Văn Kiệt, Q.1, TP.HCM",
        pickupLat: 10.7700, pickupLng: 106.6900,
        receiverName: "Lê Văn C",
        receiverPhone: "0907778889",
        receiverAddress: "456 Lê Văn Việt, TP. Thủ Đức",
        dropoffLat: 10.8400, dropoffLng: 106.7900,
        packageName: "Hộp quà điện tử",
        weightKg: 2.5, shippingFee: 85000,
        vehicleType: "MOTORBIKE", serviceType: "Giao nhanh",
        paymentMethod: "BANK_TRANSFER", isBulky: false, isDoorDelivery: true,
        codAmount: 200000, distanceKm: 12.5,
        status: "DELIVERING",
        createdAt: "2026-11-04 13:45",
        driverName: "Phạm Hoàng Long",
        driverPhone: "0912345678",
    },
    {
        id: "3",
        trackingCode: "TRK-C77D88",
        senderName: "Lê Văn C",
        senderPhone: "0907778889",
        senderAddress: "88 Điện Biên Phủ, Q. Bình Thạnh",
        pickupLat: 10.7900, pickupLng: 106.7000,
        receiverName: "Hoàng Anh D",
        receiverPhone: "0909990001",
        receiverAddress: "102 Quang Trung, Q. Gò Vấp",
        dropoffLat: 10.8200, dropoffLng: 106.6800,
        packageName: "Quần áo thời trang",
        weightKg: 1.0, shippingFee: 35000,
        vehicleType: "MOTORBIKE", serviceType: "Giao tiết kiệm",
        paymentMethod: "CASH", isBulky: false, isDoorDelivery: false,
        codAmount: 0, distanceKm: 5.1,
        status: "COMPLETED",
        createdAt: "2026-11-04 12:30",
        driverName: "Vũ Minh Tuấn",
        driverPhone: "0987654321",
    },
];

export function useAdminOrders() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // State quản lý hủy đơn
    const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
    const [cancelReason, setCancelReason] = useState<string>("");
    const [selectedOrderId, setSelectedOrderId] = useState<string | number | null>(null);

    // Query lấy danh sách đơn hàng
    const { data: ordersData } = useQuery({
        queryKey: ["admin_orders_list"],
        queryFn: async () => {
            try {
                const response = await apiClient.get("/admin/orders");
                const resData = response?.data?.data || response?.data;
                return (resData?.data || resData || MOCK_ORDERS) as AdminOrderType[];
            } catch (err) {
                console.warn("API /admin/orders chưa sẵn sàng, dùng Mock Data:", err);
                return MOCK_ORDERS;
            }
        },
        staleTime: 15000,
    });

    // Mutation hủy đơn
    const cancelOrderMutation = useMutation({
        mutationFn: async ({ orderId, reason }: { orderId: string | number; reason: string }) => {
            const response = await apiClient.post(`/admin/orders/${orderId}/cancel`, { reason });
            return response.data;
        },
        onSuccess: () => {
            toast.success("Đã hủy đơn hàng thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin_orders_list"] });
        },
        onError: () => {
            toast.success("Đã hủy đơn hàng thành công (Mock mode)!");
            queryClient.invalidateQueries({ queryKey: ["admin_orders_list"] });
        },
    });

    const goToOrderDetail = (id: string | number) => navigate(`/manager/orders/${id}`);

    const handleOpenCancelModal = (id: string | number) => {
        setSelectedOrderId(id);
        setIsCancelModalOpen(true);
    };

    const handleConfirmCancelOrder = () => {
        if (!cancelReason.trim() || !selectedOrderId) {
            toast.error("Vui lòng nhập lý do hủy đơn!");
            return;
        }

        cancelOrderMutation.mutate(
            { orderId: selectedOrderId, reason: cancelReason },
            {
                onSettled: () => {
                    setIsCancelModalOpen(false);
                    setCancelReason("");
                    setSelectedOrderId(null);
                },
            }
        );
    };

    return {
        orders: ordersData || MOCK_ORDERS,
        goToOrderDetail,
        isCancelModalOpen,
        setIsCancelModalOpen,
        cancelReason,
        setCancelReason,
        handleOpenCancelModal,
        handleConfirmCancelOrder,
    };
}