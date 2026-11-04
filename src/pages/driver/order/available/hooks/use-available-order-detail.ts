import { apiClient } from "@/lib/config/axios";
import type { OrderItem } from "@/services/order/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export interface OrderDetailItem extends OrderItem {
    pickupAddress: string;
    dropoffAddress: string;
    itemDescription: string;
    itemWeight: string;
    noteForDriver: string;
    pickupTime: string;
    tipAmount?: number;
    totalPrice?: number;
}

export function useAvailableOrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // 1. Query lấy chi tiết đơn hàng từ API thật: GET /driver/orders/{id}
    const { data: order, isLoading, error } = useQuery({
        queryKey: ["driver_available_order_detail", id],
        queryFn: async () => {
            if (!id) throw new Error("Mã đơn hàng không hợp lệ.");

            const response = await apiClient.get(`/driver/orders/${id}`);
            const rawData = response.data.data || response.data;

            // Map dữ liệu từ API chuẩn backend sang OrderDetailItem
            const detailedOrder: OrderDetailItem = {
                ...rawData,
                id: String(rawData.id),
                // Ánh xạ đồng bộ các trường địa chỉ
                senderAddress: rawData.pickupAddress,
                receiverAddress: rawData.dropoffAddress,
                packageName: rawData.packageName || "Hàng hóa vận chuyển",
                weightKg: rawData.weightKg || 1.0,
                // Bổ sung các thông tin mở rộng hiển thị giao diện
                itemDescription: rawData.packageName || rawData.packageDetails || "Hàng hóa tiêu chuẩn",
                itemWeight: `${rawData.weightKg || 1.0} kg`,
                noteForDriver: rawData.note || "Không có ghi chú thêm từ người gửi.",
                pickupTime: "Cần lấy ngay theo yêu cầu",
            };

            return detailedOrder;
        },
        retry: false,
    });

    // 2. Mutation Nhận đơn hàng: POST /driver/orders/{id}/accept
    const acceptOrderMutation = useMutation({
        mutationFn: async (orderId: string | number) => {
            const res = await apiClient.post(`/driver/orders/${orderId}/accept`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Nhận đơn hàng thành công! Đang chuyển đến màn hình quản lý đơn.");
            queryClient.invalidateQueries({ queryKey: ["driver_available_orders"] });
            queryClient.invalidateQueries({ queryKey: ["driver_active_orders"] });
            navigate("/driver/orders/active");
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Nhận đơn thất bại do đơn đã được tài xế khác nhận!");
        },
    });

    const handleReject = () => {
        toast.info("Đã bỏ qua đơn hàng này.");
        navigate("/driver/orders/available");
    };

    return {
        order,
        isLoading,
        error,
        acceptOrder: (orderId: string | number) => acceptOrderMutation.mutate(orderId),
        isAccepting: acceptOrderMutation.isPending,
        handleReject,
        goBack: () => navigate("/driver/orders/available"),
    };
}