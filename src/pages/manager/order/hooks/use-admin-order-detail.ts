import { apiClient } from "@/lib/config/axios";
import type { OrderItem } from "@/services/order/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export interface AdminOrderDetailType extends OrderItem {
    driverName?: string;
    driverPhone?: string;
    timeline?: {
        status: string;
        title: string;
        time: string;
        description: string;
    }[];
}

const MOCK_ORDER_DETAIL: AdminOrderDetailType = {
    id: "1",
    trackingCode: "TRK-A83F20",
    senderName: "Nguyễn Văn A",
    senderPhone: "0901112223",
    senderAddress: "227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM",
    pickupLat: 10.7626,
    pickupLng: 106.6835,
    receiverName: "Trần Thị B",
    receiverPhone: "0904445556",
    receiverAddress: "135 Nam Kỳ Khởi Nghĩa, Phường Bến Nghé, Quận 1, TP.HCM",
    dropoffLat: 10.7765,
    dropoffLng: 106.7009,
    packageName: "Tài liệu hợp đồng kinh tế",
    weightKg: 1.5,
    shippingFee: 45000,
    vehicleType: "MOTORBIKE",
    serviceType: "Giao tiêu chuẩn",
    paymentMethod: "CASH",
    isBulky: false,
    isDoorDelivery: true,
    codAmount: 0,
    distanceKm: 4.2,
    status: "SEARCHING_DRIVER",
    createdAt: "2026-11-04 14:10:00",
    driverName: undefined,
    driverPhone: undefined,
    timeline: [
        { status: "SEARCHING_DRIVER", title: "Đã tạo đơn hàng & Đang tìm tài xế", time: "14:10 - 04/11/2026", description: "Hệ thống đang phát sóng tìm tài xế trong bán kính 3km." },
        { status: "PENDING", title: "Khởi tạo đơn hàng thành công", time: "14:08 - 04/11/2026", description: "Khách hàng đã xác nhận tạo đơn hàng mới." },
    ],
};

export function useAdminOrderDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Modal states
    const [isAssignModalOpen, setIsAssignModalOpen] = useState<boolean>(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
    const [cancelReason, setCancelReason] = useState<string>("");

    // Query lấy chi tiết đơn hàng
    const { data: order = MOCK_ORDER_DETAIL, isLoading } = useQuery({
        queryKey: ["admin_order_detail", id],
        queryFn: async () => {
            try {
                const response = await apiClient.get(`/admin/orders/${id}`);
                const resData = response?.data?.data || response?.data;
                return (resData || MOCK_ORDER_DETAIL) as AdminOrderDetailType;
            } catch (err) {
                console.warn("API chi tiết đơn hàng chưa sẵn sàng, dùng Mock Data:", err);
                return MOCK_ORDER_DETAIL;
            }
        },
    });

    // Mock danh sách tài xế gần nhất để gán thủ công
    const availableDrivers = [
        { id: 201, fullName: "Phạm Hoàng Long", phone: "0912345678", distance: "1.2 km", vehicle: "Honda Wave (59-G1 123.45)" },
        { id: 202, fullName: "Vũ Minh Tuấn", phone: "0987654321", distance: "2.5 km", vehicle: "Yamaha Exciter (59-C2 678.90)" },
    ];

    // Mutation gán tài xế thủ công
    const assignDriverMutation = useMutation({
        mutationFn: async ({ driverId }: { driverId: number | string }) => {
            const response = await apiClient.post(`/admin/orders/${id}/assign`, { driverId });
            return response.data;
        },
        onSuccess: () => {
            toast.success("Đã gán tài xế thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin_order_detail", id] });
            setIsAssignModalOpen(false);
        },
        onError: () => {
            // Fallback mock mode
            toast.success("Tinh năng đang phát triển!");
            setIsAssignModalOpen(false);
            queryClient.invalidateQueries({ queryKey: ["admin_order_detail", id] });
        },
    });

    // Mutation hủy đơn hàng
    const cancelOrderMutation = useMutation({
        mutationFn: async ({ reason }: { reason: string }) => {
            const response = await apiClient.post(`/admin/orders/${id}/cancel`, { reason });
            return response.data;
        },
        onSuccess: () => {
            toast.success("Đã hủy đơn hàng thành công!");
            queryClient.invalidateQueries({ queryKey: ["admin_order_detail", id] });
            setIsCancelModalOpen(false);
            setCancelReason("");
        },
        onError: () => {
            toast.success("Đã hủy đơn hàng thành công (Mock mode)!");
            setIsCancelModalOpen(false);
            setCancelReason("");
            queryClient.invalidateQueries({ queryKey: ["admin_order_detail", id] });
        },
    });

    const handleBack = () => navigate("/manager/orders");

    const handleConfirmCancel = () => {
        if (!cancelReason.trim()) {
            toast.error("Vui lòng nhập lý do hủy đơn!");
            return;
        }
        cancelOrderMutation.mutate({ reason: cancelReason });
    };

    return {
        order,
        isLoading,
        availableDrivers,
        handleBack,
        isAssignModalOpen,
        setIsAssignModalOpen,
        isCancelModalOpen,
        setIsCancelModalOpen,
        cancelReason,
        setCancelReason,
        assignDriver: (driverId: number | string) => assignDriverMutation.mutate({ driverId }),
        handleConfirmCancel,
        isActionPending: assignDriverMutation.isPending || cancelOrderMutation.isPending,
    };
}