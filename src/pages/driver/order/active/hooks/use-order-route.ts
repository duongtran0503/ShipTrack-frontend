import type { OrderItem } from "@/services/order/type";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";

export interface OrderRouteItem extends OrderItem {
    driverCurrentLat?: number;
    driverCurrentLng?: number;
    remainingDistanceKm?: number;
    remainingMinutes?: number;
}

const ACTIVE_ORDERS_STORAGE_KEY = "shiptrack_active_orders_mock"

export function useOrderRoute() {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data: order, isLoading, error } = useQuery({
        queryKey: ["driver_order_route", id],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300))
            const saved = localStorage.getItem(ACTIVE_ORDERS_STORAGE_KEY)
            if (!saved) throw new Error("Không tìm thấy dữ liệu đơn hàng.")

            const orders: OrderItem[] = JSON.parse(saved)
            const found = orders.find((o) => String(o.id) === String(id))

            if (!found) {
                throw new Error("Đơn hàng không tồn tại hoặc đã kết thúc.")
            }

            // Giả lập vị trí hiện tại của tài xế nằm trên đoạn đường giữa điểm lấy và điểm giao
            const driverLat = found.pickupLat ? found.pickupLat + 0.002 : 10.8221
            const driverLng = found.pickupLng ? found.pickupLng + 0.002 : 106.6869

            return {
                ...found,
                driverCurrentLat: driverLat,
                driverCurrentLng: driverLng,
                remainingDistanceKm: found.distanceKm || 3.5,
                remainingMinutes: Math.round((found.distanceKm || 3.5) * 3.2), // Ước tính thời gian
            } as OrderRouteItem
        },
        retry: false,
    })

    // Mở ứng dụng Google Maps bên ngoài để chỉ đường
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const openGoogleMapsDirections = (destLat: number, destLng: number, address: string) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLng}&travelmode=driving`
        window.open(url, "_blank")
    }

    return {
        order,
        isLoading,
        error,
        goBack: () => navigate(`/driver/orders/active/${id}`),
        openGoogleMapsDirections,
    }
}