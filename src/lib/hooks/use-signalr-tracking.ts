import { useEffect, useState } from "react";

export interface DriverLocation {
    lat: number;
    lng: number;
    distanceKmLeft: number;
    etaMinutes: number;
}

export const useSignalRTracking = (
    startCoord: [number, number],
    endCoord: [number, number]
) => {
    const [driverLoc, setDriverLoc] = useState<DriverLocation>({
        lat: startCoord[0],
        lng: startCoord[1],
        distanceKmLeft: 5.2,
        etaMinutes: 15,
    });

    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Giả lập kết nối SignalR Hub
        const connectTimer = setTimeout(() => setIsConnected(true), 800);

        let progress = 0; // 0% -> 100%
        const interval = setInterval(() => {
            if (progress < 1) {
                progress += 0.05; // Tiến trình di chuyển

                // Nội suy tuyến tính (Linear Interpolation) vị trí giữa Start và End
                const currentLat = startCoord[0] + (endCoord[0] - startCoord[0]) * progress;
                const currentLng = startCoord[1] + (endCoord[1] - startCoord[1]) * progress;
                const distanceLeft = Math.max(0, Number((5.2 * (1 - progress)).toFixed(1)));
                const eta = Math.max(1, Math.round(15 * (1 - progress)));

                setDriverLoc({
                    lat: currentLat,
                    lng: currentLng,
                    distanceKmLeft: distanceLeft,
                    etaMinutes: eta,
                });
            }
        }, 3000); // 3 giây cập nhật GPS 1 lần

        return () => {
            clearTimeout(connectTimer);
            clearInterval(interval);
        };
    }, [startCoord, endCoord]);

    return { driverLoc, isConnected };
};