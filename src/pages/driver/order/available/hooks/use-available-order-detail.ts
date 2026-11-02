import type { AvailableOrder } from "@/pages/driver/order/available/hooks/use-available-orders";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export interface OrderDetailItem extends AvailableOrder {
    itemDescription: string;
    itemWeight: string;
    noteForDriver: string;
    customerPhone: string;
    pickupTime: string;
}

const AVAILABLE_ORDERS_STORAGE_KEY = "shiptrack_available_orders_mock"

export function useAvailableOrderDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    // 1. Query lấy chi tiết đơn hàng theo ID
    const { data: order, isLoading, error } = useQuery({
        queryKey: ["driver_available_order_detail", id],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300))
            const saved = localStorage.getItem(AVAILABLE_ORDERS_STORAGE_KEY)
            if (!saved) throw new Error("Không tìm thấy dữ liệu đơn hàng.")

            const orders: AvailableOrder[] = JSON.parse(saved)
            const found = orders.find((o) => String(o.id) === String(id))

            if (!found) {
                throw new Error("Rất tiếc! Đơn hàng này có thể đã bị tài xế khác nhận hoặc không còn tồn tại.")
            }

            // Bổ sung thêm các chi tiết mở rộng cho trang detail
            const detailedOrder: OrderDetailItem = {
                ...found,
                itemDescription: "Hộp quà điện tử / Tài liệu quan trọng",
                itemWeight: "1.2 kg",
                noteForDriver: "Vui lòng gọi trước khi đến 10 phút, hàng dễ vỡ xin nhẹ tay.",
                customerPhone: "0912***889",
                pickupTime: "Cần lấy ngay trong 15 phút",
            }

            return detailedOrder
        },
        retry: false,
    })

    // 2. Mutation Nhận đơn
    const acceptOrderMutation = useMutation({
        mutationFn: async (orderId: string | number) => {
            await new Promise((r) => setTimeout(r, 500))
            const saved = localStorage.getItem(AVAILABLE_ORDERS_STORAGE_KEY)
            if (!saved) throw new Error("Xung đột dữ liệu hệ thống.")

            const orders: AvailableOrder[] = JSON.parse(saved)
            const exists = orders.find((o) => String(o.id) === String(orderId))

            if (!exists) {
                throw new Error("Rất tiếc! Đơn hàng này đã được tài xế khác nhận trước đó.")
            }

            // Xóa khỏi danh sách khả dụng
            const updated = orders.filter((o) => String(o.id) === String(orderId))
            localStorage.setItem(AVAILABLE_ORDERS_STORAGE_KEY, JSON.stringify(updated))
            return true
        },
        onSuccess: () => {
            toast.success("Nhận đơn hàng thành công! Đang chuyển đến màn hình điều phối.")
            queryClient.invalidateQueries({ queryKey: ["driver_available_orders"] })
            navigate("/driver/orders/active")
        },
        onError: (err: any) => {
            toast.error(err?.message || "Nhận đơn thất bại do xung đột dữ liệu!")
        },
    })

    const handleReject = () => {
        toast.info("Đã bỏ qua đơn hàng này.")
        navigate("/driver/orders/available")
    }

    return {
        order,
        isLoading,
        error,
        acceptOrder: (orderId: string | number) => acceptOrderMutation.mutate(orderId),
        isAccepting: acceptOrderMutation.isPending,
        handleReject,
        goBack: () => navigate("/driver/orders/available"),
    }
}