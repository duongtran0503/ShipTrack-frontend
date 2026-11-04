import { apiClient } from "@/lib/config/axios";
import { useSignalR } from "@/lib/hooks/use-signalr";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDriverLocation } from "./use-driver-location";
import { useDriverStatusMutation } from "./use-driver-status-mutation";

export interface DriverAvailabilityState {
    isOnline: boolean;
    statusText: "Đang hoạt động" | "Offline";
    activeOrdersCount: number;
    availableOrdersNearby: number;
    defaultVehicle: {
        id: string | number;
        plateNumber: string;
        vehicleType: string;
        model: string;
    } | null;
    licenseStatus: "APPROVED" | "PENDING" | "EXPIRED" | "NONE";
    expiryDaysLeft: number;
}

export function useDriverAvailability() {
    const queryClient = useQueryClient();
    const { connection, isConnected } = useSignalR();

    const [showWarningModal, setShowWarningModal] = useState(false);
    const [pendingToggleValue, setPendingToggleValue] = useState<boolean | null>(null);

    const { startLocationTracking, stopLocationTracking } = useDriverLocation();
    const { toggleStatus, isToggling } = useDriverStatusMutation({
        onStartTracking: startLocationTracking,
        onStopTracking: stopLocationTracking,
    });

    const { data: availability, isLoading } = useQuery({
        queryKey: ["driver_availability"],
        queryFn: async () => {
            // 1. Lấy trạng thái online (bắt lỗi an toàn)
            const statusRes = await apiClient.get("/drivers/status").catch(() => ({ data: { data: { isOnline: false } } }));
            const statusData = statusRes.data.data || statusRes.data;
            const isOnline = Boolean(statusData.isOnline);

            // 2. Gọi từng API độc lập với .catch() riêng biệt để không bao giờ làm sập Promise.all chung
            const vehiclePromise = apiClient.get("/driver/vehicles/current-active")
                .then(res => res.data)
                .catch(() => null);

            const activeOrdersPromise = apiClient.get("/driver/orders/active")
                .then(res => res.data)
                .catch(() => []);

            const availableOrdersPromise = isOnline
                ? apiClient.get("/driver/orders/available")
                    .then(res => res.data)
                    .catch((err) => {
                        // Bắt trọn mọi lỗi từ backend (kể cả "Chưa có phương tiện được duyệt" hoặc "Chưa bật sẵn sàng")
                        console.warn("Bỏ qua lỗi lấy đơn available:", err?.response?.data?.message || err.message);
                        return [];
                    })
                : Promise.resolve([]);

            const [vehicleRes, activeOrdersRes, availableOrdersRes] = await Promise.all([
                vehiclePromise,
                activeOrdersPromise,
                availableOrdersPromise,
            ]);

            const vehicleData = vehicleRes?.data || vehicleRes;
            const activeOrders = activeOrdersRes?.data || activeOrdersRes || [];
            const availableOrders = availableOrdersRes?.data || availableOrdersRes || [];

            const defaultVehicle = vehicleData ? {
                id: vehicleData.id,
                plateNumber: vehicleData.licensePlate || "Chưa có biển số",
                vehicleType: vehicleData.vehicleType || "MOTORBIKE",
                model: vehicleData.brand ? `${vehicleData.brand} (${vehicleData.color || "Tiêu chuẩn"})` : "Phương tiện chính",
            } : null;

            const isVerifiedVehicle = vehicleData ? Boolean(vehicleData.isVerified) : false;

            return {
                isOnline,
                statusText: isOnline ? "Đang hoạt động" : "Offline",
                activeOrdersCount: Array.isArray(activeOrders) ? activeOrders.length : 0,
                availableOrdersNearby: Array.isArray(availableOrders) ? availableOrders.length : 0,
                defaultVehicle,
                licenseStatus: isVerifiedVehicle ? "APPROVED" : (vehicleData ? "PENDING" : "NONE"),
                expiryDaysLeft: 365,
            } as DriverAvailabilityState;
        },
        staleTime: 60000,
        gcTime: 300000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    useEffect(() => {
        if (availability?.isOnline) {
            startLocationTracking();
        } else {
            stopLocationTracking();
        }
        return () => {
            stopLocationTracking();
        };
    }, [availability?.isOnline, startLocationTracking, stopLocationTracking]);

    useEffect(() => {
        if (!connection || !isConnected) return;

        const handleDriverStatusChanged = (payload: { isOnline: boolean }) => {
            // Cập nhật cache Availability
            queryClient.setQueryData(["driver_availability"], (oldData: any) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    isOnline: payload.isOnline,
                    statusText: payload.isOnline ? "Đang hoạt động" : "Offline",
                };
            });

            // Đồng thời cập nhật luôn cache Dashboard
            queryClient.setQueryData(["driver_dashboard_stats"], (oldData: any) => {
                if (!oldData) return oldData;
                return { ...oldData, isOnline: payload.isOnline };
            });
        };

        connection.on("DriverStatusChanged", handleDriverStatusChanged);
        return () => {
            connection.off("DriverStatusChanged", handleDriverStatusChanged);
        };
    }, [connection, isConnected, queryClient]);

    const handleAttemptToggle = (nextStatus: boolean) => {
        const current = availability;
        if (!current) return;

        if (nextStatus && (!current.defaultVehicle || current.licenseStatus !== "APPROVED")) {
            toast.error("Không thể bật nhận đơn: Thiếu phương tiện hoạt động hoặc phương tiện chưa được duyệt!");
            return;
        }

        if (!nextStatus && current.activeOrdersCount > 0) {
            setPendingToggleValue(false);
            setShowWarningModal(true);
            return;
        }

        toggleStatus(nextStatus);
    };

    const confirmForceOffline = () => {
        if (pendingToggleValue !== null) {
            toggleStatus(pendingToggleValue);
        }
        setShowWarningModal(false);
        setPendingToggleValue(null);
    };

    return {
        availability,
        isLoading,
        isToggling,
        handleAttemptToggle,
        showWarningModal,
        setShowWarningModal,
        confirmForceOffline,
    };
}