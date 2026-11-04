import { apiClient } from "@/lib/config/axios";
import { getSignalRConnection, startSignalRConnection } from "@/lib/signalR/signalr-hub";
import type { OrderItem } from "@/services/order/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export type ActiveOrderStatus =
    | "PENDING" | "SEARCHING_DRIVER" | "DELIVERING" | "COMPLETED" | "CANCELLED" | "PICKED_UP" | "DRIVER_ASSIGNED" | "FAILED";

export interface ActiveOrderDetailItem extends OrderItem {
    driverStatus: ActiveOrderStatus;
    driverStatusLabel: string;
    acceptedAt: string;
    noteForDriver?: string;
    failureReason?: string;
    pickupAddress: string;
    dropoffAddress: string;
}

export function useActiveOrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // 1. GET /driver/orders/{id} — Lấy chi tiết đơn hàng thực tế từ backend C#
    const { data: order, isLoading, error } = useQuery({
        queryKey: ["driver_active_order_detail", id],
        queryFn: async () => {
            if (!id) throw new Error("Mã đơn hàng không hợp lệ.");
            const response = await apiClient.get(`/driver/orders/${id}/active-detail`);

            const raw = response.data.data || response.data;

            const mappedItem: ActiveOrderDetailItem = {
                ...raw,
                id: String(raw.id),
                senderAddress: raw.pickupAddress,
                receiverAddress: raw.dropoffAddress,
                status: raw.status || "DRIVER_ASSIGNED",
                driverStatus: raw.status || "DRIVER_ASSIGNED",
                driverStatusLabel:
                    raw.status === "PICKED_UP" ? "Đã lấy hàng - Sẵn sàng giao" :
                        raw.status === "DELIVERING" ? "Đang trên đường giao hàng" :
                            raw.status === "COMPLETED" ? "Đã hoàn thành" : "Đã tiếp nhận đơn hàng",
                acceptedAt: raw.createdAtUtc ? new Date(raw.createdAtUtc).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) : "Vừa nhận",
                noteForDriver: raw.note || "Không có ghi chú thêm từ người gửi.",
            };

            return mappedItem;
        },
        enabled: !!id,
        retry: false,
    });

    // 🟢 2. Lắng nghe sự kiện SignalR real-time và Join Group an toàn
    useEffect(() => {
        if (!id) return;

        const connection = getSignalRConnection();

        const handleOrderStatusChanged = (updatedOrder: any) => {
            if (updatedOrder && String(updatedOrder.id) === String(id)) {
                queryClient.setQueryData(["driver_active_order_detail", id], (old: any) => {
                    if (!old) return old;
                    return {
                        ...old,
                        ...updatedOrder,
                        id: String(updatedOrder.id),
                        senderAddress: updatedOrder.pickupAddress || old.senderAddress,
                        receiverAddress: updatedOrder.dropoffAddress || old.receiverAddress,
                        status: updatedOrder.status,
                        driverStatus: updatedOrder.status,
                        driverStatusLabel:
                            updatedOrder.status === "PICKED_UP" ? "Đã lấy hàng - Sẵn sàng giao" :
                                updatedOrder.status === "DELIVERING" ? "Đang trên đường giao hàng" :
                                    updatedOrder.status === "COMPLETED" ? "Đã hoàn thành" : "Đang xử lý",
                    };
                });
                queryClient.invalidateQueries({ queryKey: ["driver_active_orders"] });
            }
        };

        connection.on("OrderStatusChanged", handleOrderStatusChanged);

        // Khởi động kết nối và chỉ invoke khi trạng thái thực sự là "Connected"
        startSignalRConnection().then(() => {
            if (connection.state === "Connected") {
                connection.invoke("JoinOrderGroup", Number(id)).catch((err) => {
                    console.error("Không thể join group đơn hàng:", err);
                });
            }
        });

        return () => {
            connection.off("OrderStatusChanged", handleOrderStatusChanged);
            if (connection.state === "Connected") {
                connection.invoke("LeaveOrderGroup", Number(id)).catch(() => { });
            }
        };
    }, [id, queryClient]);

    // 3. Mutation Cập nhật trạng thái gọi đúng API Backend C# tương ứng
    const updateStatusMutation = useMutation({
        mutationFn: async ({
            orderId,
            nextStatus,
            failureReason,
        }: {
            orderId: string | number;
            nextStatus: ActiveOrderStatus;
            nextLabel: string;
            failureReason?: string;
        }) => {
            let res;
            if (nextStatus === "PICKED_UP") {
                res = await apiClient.patch(`/driver/orders/${orderId}/picked-up`);
            } else if (nextStatus === "DELIVERING") {
                res = await apiClient.patch(`/driver/orders/${orderId}/delivering`);
            } else if (nextStatus === "COMPLETED") {
                res = await apiClient.post(`/driver/orders/${orderId}/complete`, { proofPhotoPath: failureReason || null });
            } else if (nextStatus === "FAILED") {
                res = await apiClient.patch(`/driver/orders/${orderId}/fail`, { failureReason: failureReason || null });
            } else {
                throw new Error("Trạng thái cập nhật không hợp lệ.");
            }
            return res.data.data || res.data;
        },
        onSuccess: (data, variables) => {
            toast.success(`Cập nhật trạng thái thành công: "${variables.nextLabel}"`);
            queryClient.invalidateQueries({ queryKey: ["driver_active_orders"] });
            queryClient.invalidateQueries({ queryKey: ["driver_active_order_detail", id] });
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || err?.message || "Cập nhật trạng thái thất bại!");
        },
    });

    return {
        order,
        isLoading,
        error,
        updateStatus: (orderId: string | number, nextStatus: ActiveOrderStatus, nextLabel: string, failureReason?: string) =>
            updateStatusMutation.mutateAsync({ orderId, nextStatus, nextLabel, failureReason }),
        isUpdating: updateStatusMutation.isPending,
        goBack: () => navigate("/driver/orders/active"),
        openRouteMap: (orderId: string | number) => navigate(`/driver/orders/active/${orderId}/route`),
    };
}