import { apiClient } from "@/lib/config/axios";
import { useSignalR } from "@/lib/hooks/use-signalr";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export interface DriverDashboardStats {
    activeOrdersCount: number;
    completedTodayCount: number;
    todayEarnings: number;
    averageRating: number;
    isOnline: boolean;
    defaultVehicle: any | null;
    licenseStatus: "APPROVED" | "PENDING" | "EXPIRED" | "NONE";
}

export interface ActiveOrderSummary {
    id: string | number;
    trackingCode: string;
    pickupAddress: string;
    dropoffAddress: string;
    status: string;
    shippingFee: number;
}

export function useDriverDashboard() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { connection, isConnected } = useSignalR();

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const updateDriverLocation = async (lat: number, lng: number) => {
        try {
            await apiClient.put("/drivers/location", { latitude: lat, longitude: lng });
        } catch (err) {
            console.error("Lỗi đồng bộ GPS Dashboard:", err);
        }
    };

    const startLocationTracking = () => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition((pos) => {
            updateDriverLocation(pos.coords.latitude, pos.coords.longitude);
        });
        intervalRef.current = setInterval(() => {
            navigator.geolocation.getCurrentPosition((pos) => {
                updateDriverLocation(pos.coords.latitude, pos.coords.longitude);
            });
        }, 10000);
    };

    const stopLocationTracking = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    // Lắng nghe sự kiện SignalR
    useEffect(() => {
        if (!connection || !isConnected) return;

        const handleDriverStatusChanged = (payload: { driverId?: string; isOnline: boolean }) => {
            console.log("⚡ Nhận event DriverStatusChanged ở Dashboard:", payload);

            queryClient.setQueryData(["driver_dashboard_stats"], (oldData: any) => {
                if (!oldData) return oldData;
                return { ...oldData, isOnline: payload.isOnline };
            });

            queryClient.setQueryData(["driver_availability"], (oldData: any) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    isOnline: payload.isOnline,
                    statusText: payload.isOnline ? "Đang hoạt động" : "Offline",
                };
            });

            if (payload.isOnline) startLocationTracking();
            else stopLocationTracking();
        };

        connection.on("DriverStatusChanged", handleDriverStatusChanged);

        return () => {
            connection.off("DriverStatusChanged", handleDriverStatusChanged);
            stopLocationTracking();
        };
    }, [connection, isConnected, queryClient]);

    // Query lấy thông tin Dashboard đồng bộ chính xác dữ liệu thu nhập theo ngày (TODAY) và KPI
    const { data: statsData, isLoading: isStatsLoading } = useQuery({
        queryKey: ["driver_dashboard_stats"],
        queryFn: async () => {
            const [statusRes, vehicleRes, activeOrdersRes, historyKpiRes, earningsRes] = await Promise.all([
                apiClient.get("/drivers/status").catch(() => null),
                apiClient.get("/driver/vehicles/current-active").catch(() => null),
                apiClient.get("/driver/orders/active").catch(() => null),
                apiClient.get("/drivers/me/orders/history/kpi").catch(() => null),
                apiClient.get("/drivers/me/earnings", { params: { range: "TODAY", page: 0, size: 1 } }).catch(() => null),
            ]);

            const statusData = statusRes?.data?.data || statusRes?.data || { isOnline: false };

            const isOnline = Boolean(statusData.isOnline);

            const vehicleData = vehicleRes?.data?.data || vehicleRes?.data;
            const activeOrders = activeOrdersRes?.data?.data || activeOrdersRes?.data || [];

            const defaultVehicle = vehicleData ? {
                id: vehicleData.id,
                plateNumber: vehicleData.licensePlate || "Chưa có biển số",
                vehicleType: vehicleData.vehicleType || "MOTORBIKE",
                model: vehicleData.brand ? `${vehicleData.brand} (${vehicleData.color || "Tiêu chuẩn"})` : "Phương tiện chính",
            } : null;

            const isVerifiedVehicle = vehicleData ? Boolean(vehicleData.isVerified) : false;

            if (isOnline && !intervalRef.current) {
                startLocationTracking();
            }

            const kpiData = historyKpiRes?.data;
            const earingData = earningsRes as any

            // Lấy chính xác số tiền thu nhập hôm nay từ summary.today của API earnings
            const todayEarnings = earingData?.summary?.today
            const completedTodayCount = kpiData?.totalFinished ?? statusData.completedTodayCount ?? 0;
            const averageRating = kpiData?.avgRating ? parseFloat(kpiData.avgRating) : (statusData.averageRating || 4.6);

            const finalStats: DriverDashboardStats = {
                activeOrdersCount: Array.isArray(activeOrders) ? activeOrders.length : 0,
                completedTodayCount,
                todayEarnings,
                averageRating,
                isOnline,
                defaultVehicle,
                licenseStatus: isVerifiedVehicle ? "APPROVED" : (vehicleData ? "PENDING" : "NONE"),
            };

            return finalStats;
        },
        staleTime: 10000,
        refetchOnWindowFocus: true,
    });

    const { data: activeOrders, isLoading: isOrdersLoading } = useQuery({
        queryKey: ["driver_active_orders_summary"],
        queryFn: async () => {
            const res = await apiClient.get("/driver/orders/active").catch(() => ({ data: { data: [] } }));
            const list = res.data?.data || res.data || [];
            return list as ActiveOrderSummary[];
        },
    });

    const { data: notifications } = useQuery({
        queryKey: ["driver_recent_notifications"],
        queryFn: async () => [
            {
                title: "Hệ thống sẵn sàng",
                time: "Vừa xong",
                message: "Kết nối thành công với máy chủ điều phối.",
            },
        ],
    });

    const toggleOnlineMutation = useMutation({
        mutationFn: async (newStatus: boolean) => {
            const response = await apiClient.patch("/drivers/status", { isOnline: newStatus });
            return response.data;
        },
        onMutate: async (newStatus: boolean) => {
            await queryClient.cancelQueries({ queryKey: ["driver_dashboard_stats"] });
            await queryClient.cancelQueries({ queryKey: ["driver_availability"] });

            const previousStats = queryClient.getQueryData<DriverDashboardStats>(["driver_dashboard_stats"]);
            const previousAvailability = queryClient.getQueryData<any>(["driver_availability"]);

            if (newStatus) {
                if (!previousStats?.defaultVehicle || previousStats.licenseStatus !== "APPROVED") {
                    toast.error("Không thể bật nhận đơn: Thiếu phương tiện hoạt động hoặc phương tiện chưa được duyệt!");
                    throw new Error("Chưa có phương tiện được duyệt");
                }
            }

            if (previousStats) {
                queryClient.setQueryData<DriverDashboardStats>(["driver_dashboard_stats"], {
                    ...previousStats,
                    isOnline: newStatus,
                });
            }

            if (newStatus) startLocationTracking();
            else stopLocationTracking();

            return { previousStats, previousAvailability };
        },
        onError: (err: any, _newStatus, context) => {
            if (context?.previousStats) {
                queryClient.setQueryData(["driver_dashboard_stats"], context.previousStats);
            }
            if (!context?.previousStats?.isOnline) stopLocationTracking();

            const errorMsg = err?.response?.data?.message || err?.message || "Không thể thay đổi trạng thái hoạt động!";
            if (errorMsg !== "Chưa có phương tiện được duyệt") {
                toast.error(errorMsg);
            }
        },
        onSuccess: (_data, newStatus) => {
            toast.success(newStatus ? "Đã bật trạng thái sẵn sàng nhận đơn!" : "Đã chuyển sang ngoại tuyến.");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["driver_availability"] });
            queryClient.invalidateQueries({ queryKey: ["driver_dashboard_stats"] });
            queryClient.invalidateQueries({ queryKey: ["driver_available_orders"] });
        },
    });

    const handleAttemptToggle = (nextStatus: boolean) => {
        const current = statsData;
        if (!current) return;

        if (nextStatus && (!current.defaultVehicle || current.licenseStatus !== "APPROVED")) {
            toast.error("Không thể bật nhận đơn: Thiếu phương tiện hoạt động hoặc phương tiện chưa được duyệt!");
            return;
        }

        toggleOnlineMutation.mutate(nextStatus);
    };

    const goToActiveOrders = () => navigate("/driver/orders/active");
    const goToAvailableOrders = () => navigate("/driver/orders/available");
    const goToOrderDetail = (id: string | number) => navigate(`/driver/orders/active/${id}`);
    const goToEarnings = () => navigate("/driver/earnings");
    const goToReviews = () => navigate("/driver/reviews");

    return {
        stats: {
            activeOrdersCount: statsData?.activeOrdersCount || 0,
            completedTodayCount: statsData?.completedTodayCount || 0,
            todayEarnings: statsData?.todayEarnings || 0,
            averageRating: statsData?.averageRating || 4.6,
            isOnline: statsData?.isOnline || false,
        },
        isStatsLoading,
        activeOrders: (activeOrders || []) as ActiveOrderSummary[],
        isOrdersLoading,
        notifications: notifications || [],
        isTogglingStatus: toggleOnlineMutation.isPending,
        toggleOnline: handleAttemptToggle,
        goToActiveOrders,
        goToAvailableOrders,
        goToOrderDetail,
        goToEarnings,
        goToReviews,
    };
}