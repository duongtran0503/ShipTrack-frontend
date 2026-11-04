import { apiClient } from "@/lib/config/axios";
import { useCallback, useRef } from "react";
import { toast } from "sonner";

export function useDriverLocation() {
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const updateDriverLocation = async (lat: number, lng: number) => {
        try {
            await apiClient.put("/drivers/location", {
                latitude: lat,
                longitude: lng,
            });
            console.log(`📍 GPS Synced: [${lat}, ${lng}]`);
        } catch (err) {
            console.error("🔴 Lỗi đồng bộ GPS:", err);
        }
    };

    // 🟢 Bọc useCallback để giữ tham chiếu, tránh làm useEffect chạy lặp vô hạn
    const startLocationTracking = useCallback(() => {
        if (!navigator.geolocation) {
            toast.error("Trình duyệt của bạn không hỗ trợ định vị GPS.");
            return;
        }

        if (intervalRef.current) return;

        const options: PositionOptions = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0,
        };

        const handleSuccess = (position: GeolocationPosition) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            updateDriverLocation(lat, lng);
        };

        const handleError = (error: GeolocationPositionError) => {
            console.error("Lỗi GPS:", error.message);
            if (error.code === error.PERMISSION_DENIED) {
                toast.error("Bạn chưa cấp quyền truy cập vị trí GPS cho trang web.");
            }
        };

        navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);

        intervalRef.current = setInterval(() => {
            navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
        }, 10000);
    }, []);

    const stopLocationTracking = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        console.log("⚪ Đã dừng đồng bộ GPS (Offline).");
    }, []);

    return {
        startLocationTracking,
        stopLocationTracking,
    };
}