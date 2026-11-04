import { apiClient } from "@/lib/config/axios";
import type { DriverDashboardStats } from "@/pages/driver/dashboard/hooks/use-driver-dashboard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { DriverAvailabilityState } from "./use-driver-availability";

interface Props {
    onStartTracking: () => void;
    onStopTracking: () => void;
}

export function useDriverStatusMutation({ onStartTracking, onStopTracking }: Props) {
    const queryClient = useQueryClient();

    const toggleMutation = useMutation({
        mutationFn: async (nextStatus: boolean) => {
            const response = await apiClient.patch("/drivers/status", { isOnline: nextStatus });
            return response.data;
        },
        onMutate: async (nextStatus: boolean) => {
            // Hủy các query liên quan để tránh xung đột dữ liệu đang fetch
            await queryClient.cancelQueries({ queryKey: ["driver_availability"] });
            await queryClient.cancelQueries({ queryKey: ["driver_dashboard_stats"] });

            // Lưu lại state cũ của cả 2 bên để rollback nếu lỗi
            const previousAvailability = queryClient.getQueryData<DriverAvailabilityState>(["driver_availability"]);
            const previousDashboard = queryClient.getQueryData<DriverDashboardStats>(["driver_dashboard_stats"]);

            // 🟢 Cập nhật Optimistic Update cho Availability
            if (previousAvailability) {
                queryClient.setQueryData<DriverAvailabilityState>(["driver_availability"], {
                    ...previousAvailability,
                    isOnline: nextStatus,
                    statusText: nextStatus ? "Đang hoạt động" : "Offline",
                });
            }

            // 🟢 Cập nhật Optimistic Update cho Dashboard ngay lập tức
            if (previousDashboard) {
                queryClient.setQueryData<DriverDashboardStats>(["driver_dashboard_stats"], {
                    ...previousDashboard,
                    isOnline: nextStatus,
                });
            }

            if (nextStatus) {
                onStartTracking();
            } else {
                onStopTracking();
            }

            return { previousAvailability, previousDashboard };
        },
        onError: (err: any, _nextStatus, context) => {
            // Rollback lại trạng thái cũ nếu lỗi
            if (context?.previousAvailability) {
                queryClient.setQueryData(["driver_availability"], context.previousAvailability);
            }
            if (context?.previousDashboard) {
                queryClient.setQueryData(["driver_dashboard_stats"], context.previousDashboard);
            }
            if (!context?.previousAvailability?.isOnline && !context?.previousDashboard?.isOnline) {
                onStopTracking();
            }
            const errorMsg = err?.response?.data?.message || err?.message || "Không thể thay đổi trạng thái hoạt động!";
            toast.error(errorMsg);
        },
        onSuccess: (_data, nextStatus) => {
            toast.success(nextStatus ? "Đã bật trạng thái sẵn sàng nhận đơn!" : "Đã chuyển sang ngoại tuyến.");
        },
        onSettled: () => {
            // Invalidate toàn bộ các query liên quan để fetch lại dữ liệu chuẩn từ server
            queryClient.invalidateQueries({ queryKey: ["driver_availability"] });
            queryClient.invalidateQueries({ queryKey: ["driver_dashboard_stats"] });
            queryClient.invalidateQueries({ queryKey: ["driver_available_orders"] });
        },
    });

    return {
        toggleStatus: toggleMutation.mutate,
        isToggling: toggleMutation.isPending,
    };
}