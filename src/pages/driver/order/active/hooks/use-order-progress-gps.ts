import { useReverseGeocode } from "@/lib/hooks/useReverseGeocode";
import { useEffect, useState } from "react";

interface UseOrderProgressGPSProps {
    pickupLat?: number;
    pickupLng?: number;
    tripDistanceKm?: number;
}

export function useOrderProgressGPS({ pickupLat, pickupLng, tripDistanceKm }: UseOrderProgressGPSProps) {
    const [currentLat, setCurrentLat] = useState<number | null>(pickupLat ?? null);
    const [currentLng, setCurrentLng] = useState<number | null>(pickupLng ?? null);
    const [isLocating, setIsLocating] = useState<boolean>(true);

    // Lấy GPS thật 1 lần duy nhất từ thiết bị khi vào màn hình
    useEffect(() => {
        if (!navigator.geolocation) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsLocating(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                setCurrentLat(lat);
                setCurrentLng(lng);
                setIsLocating(false);
            },
            (error) => {
                console.warn("Không lấy được GPS thực, dùng tọa độ mặc định:", error.message);
                setIsLocating(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        );
    }, []);

    // Lấy địa chỉ thực tế từ tọa độ hiện tại của tài xế thông qua VietMap Reverse v4
    const { addressText: driverCurrentAddress, loading: addressLoading } = useReverseGeocode(
        currentLat ?? undefined,
        currentLng ?? undefined
    );

    // Tính toán khoảng cách và thời gian ước tính (Mock/Proportional logic)
    const distance = tripDistanceKm || 3.5; // km
    const estimatedMinutes = Math.max(5, Math.round(distance * 3.2)); // ~3 phút/km, tối thiểu 5 phút

    return {
        currentLat,
        currentLng,
        isLocating,
        driverCurrentAddress: driverCurrentAddress || (addressLoading ? "Đang giải mã địa chỉ thực..." : "Đang cập nhật vị trí..."),
        estimatedDistanceKm: distance,
        estimatedMinutes,
    };
}