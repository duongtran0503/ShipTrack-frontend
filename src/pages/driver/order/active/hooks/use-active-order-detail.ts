import type { ActiveOrderStatus } from "@/pages/driver/order/active/hooks/use-active-orders";
import type { OrderItem } from "@/services/order/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export interface ActiveOrderDetailItem extends OrderItem {
    driverStatus: ActiveOrderStatus;
    driverStatusLabel: string;
    acceptedAt: string;
    noteForDriver?: string;
    failureReason?: string;
}

const ACTIVE_ORDERS_STORAGE_KEY = "shiptrack_active_orders_mock"

export function useActiveOrderDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    // 1. Query lấy chi tiết đơn hàng đang thực hiện
    const { data: order, isLoading, error } = useQuery({
        queryKey: ["driver_active_order_detail", id],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300))
            const saved = localStorage.getItem(ACTIVE_ORDERS_STORAGE_KEY)
            if (!saved) throw new Error("Không tìm thấy dữ liệu đơn hàng đang thực hiện.")

            const orders: ActiveOrderDetailItem[] = JSON.parse(saved)
            const found = orders.find((o) => String(o.id) === String(id))

            if (!found) {
                throw new Error("Đơn hàng này không tồn tại hoặc đã được xử lý xong.")
            }

            return {
                ...found,
                driverStatus: found.driverStatus || found.status || "DRIVER_ASSIGNED",
                driverStatusLabel: found.driverStatusLabel || "Đã có tài xế - Đang đến lấy hàng",
                acceptedAt: found.acceptedAt || "Vừa nhận",
                noteForDriver: found.note || "Vui lòng gọi trước khi đến 10 phút, hàng dễ vỡ xin nhẹ tay.",
            } as ActiveOrderDetailItem
        },
        retry: false,
    })

    // 2. Mutation Cập nhật trạng thái linh hoạt theo 8 trạng thái chuẩn
    const updateStatusMutation = useMutation({
        mutationFn: async ({
            orderId,
            nextStatus,
            nextLabel,
            failureReason
        }: {
            orderId: string | number;
            nextStatus: ActiveOrderStatus;
            nextLabel: string;
            failureReason?: string;
        }) => {
            await new Promise((r) => setTimeout(r, 500))
            const saved = localStorage.getItem(ACTIVE_ORDERS_STORAGE_KEY)
            if (!saved) throw new Error("Xung đột dữ liệu hệ thống.")

            const orders: ActiveOrderDetailItem[] = JSON.parse(saved)
            const index = orders.findIndex((o) => String(o.id) === String(orderId))

            if (index === -1) {
                throw new Error("Không tìm thấy đơn hàng cần cập nhật.")
            }

            orders[index] = {
                ...orders[index],
                status: nextStatus,
                driverStatus: nextStatus,
                driverStatusLabel: nextLabel,
                ...(failureReason ? { failureReason } : {}),
            }

            localStorage.setItem(ACTIVE_ORDERS_STORAGE_KEY, JSON.stringify(orders))
            return orders[index]
        },
        onSuccess: (updatedOrder) => {
            toast.success(`Cập nhật trạng thái thành công: "${updatedOrder.driverStatusLabel}"`)
            queryClient.invalidateQueries({ queryKey: ["driver_active_orders"] })
            queryClient.invalidateQueries({ queryKey: ["driver_active_order_detail", id] })
        },
        onError: (err: any) => {
            toast.error(err?.message || "Cập nhật trạng thái thất bại!")
        },
    })

    return {
        order,
        isLoading,
        error,
        updateStatus: (orderId: string | number, nextStatus: ActiveOrderStatus, nextLabel: string, failureReason?: string) =>
            updateStatusMutation.mutateAsync({ orderId, nextStatus, nextLabel, failureReason }),
        isUpdating: updateStatusMutation.isPending,
        goBack: () => navigate("/driver/orders/active"),
        openRouteMap: (orderId: string | number) => navigate(`/driver/orders/active/${orderId}/route`),
    }
}