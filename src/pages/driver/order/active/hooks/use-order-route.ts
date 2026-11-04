import { apiClient } from "@/lib/config/axios";
import type { OrderItem } from "@/services/order/type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export interface OrderRouteItem extends OrderItem {
    pickupAddress: string;
    dropoffAddress: string;
    driverCurrentLat?: number;
    driverCurrentLng?: number;
    remainingDistanceKm?: number;
    remainingMinutes?: number;
}

export function useOrderRoute() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // State lưu trữ vị trí GPS thực tế
    const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number } | null>(null);

    // Lấy GPS thực tế từ trình duyệt
    useEffect(() => {
        if (!navigator.geolocation) {
            console.warn("Trình duyệt không hỗ trợ Geolocation.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                console.log("📍 Lấy GPS thành công:", lat, lng);
                setCurrentCoords({ lat, lng });

                // Gửi vị trí lên server
                try {
                    await apiClient.put("/drivers/location", {
                        latitude: lat,
                        longitude: lng,
                    });
                } catch (err) {
                    console.error("Lỗi đồng bộ GPS lên server:", err);
                }

                // Kích hoạt lại query để cập nhật ngay tọa độ mới lên UI
                queryClient.invalidateQueries({ queryKey: ["driver_order_route", id] });
            },
            (error) => {
                console.error("Không thể lấy vị trí GPS thực:", error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
    }, [id, queryClient]);

    // 1. GET /driver/orders/{id} — Lấy chi tiết đơn hàng và lộ trình
    const { data: order, isLoading, error } = useQuery({
        queryKey: ["driver_order_route", id, currentCoords], // 👈 Thêm currentCoords vào key để tự động refetch khi có GPS
        queryFn: async () => {
            if (!id) throw new Error("Mã đơn hàng không hợp lệ.");

            const response = await apiClient.get(`/driver/orders/${id}/active-detail`);
            const raw = response.data.data || response.data;

            // Ưu tiên sử dụng tọa độ GPS thực tế, nếu chưa có thì dùng tạm tọa độ lấy hàng
            const driverLat = currentCoords?.lat ?? raw.pickupLat ?? 10.8221;
            const driverLng = currentCoords?.lng ?? raw.pickupLng ?? 106.6869;
            const distance = raw.distanceKm || raw.tripDistanceKm || 3.5;

            const routeItem: OrderRouteItem = {
                ...raw,
                id: String(raw.id),
                senderAddress: raw.pickupAddress,
                receiverAddress: raw.dropoffAddress,
                pickupAddress: raw.pickupAddress,
                dropoffAddress: raw.dropoffAddress,
                driverCurrentLat: driverLat,
                driverCurrentLng: driverLng,
                remainingDistanceKm: distance,
                remainingMinutes: Math.round(distance * 3.2),
            };

            return routeItem;
        },
        enabled: !!id,
        retry: false,
    });

    const openGoogleMapsDirections = (destLat: number, destLng: number) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLng}&travelmode=driving`;
        window.open(url, "_blank");
    };

    return {
        order,
        isLoading,
        error,
        goBack: () => navigate(`/driver/orders/active/${id}`),
        openGoogleMapsDirections,
    };
}