import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export interface DriverDashboardStats {
    activeOrdersCount: number;
    completedTodayCount: number;
    todayEarnings: number;
    averageRating: number;
    isOnline: boolean;
}

export interface ActiveOrderSummary {
    id: string | number;
    trackingCode: string;
    pickupAddress: string;
    dropoffAddress: string;
    status: string;
    shippingFee: number;
}

// ==================== MOCK DATABASE / STORAGE ====================
const DRIVER_STATE_KEY = "shiptrack_driver_mock_state"

const getMockState = () => {
    const saved = localStorage.getItem(DRIVER_STATE_KEY)
    if (saved) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        try { return JSON.parse(saved) } catch (e) { /* ignore */ }
    }
    const defaultState = {
        isOnline: true,
        stats: {
            activeOrdersCount: 2,
            completedTodayCount: 5,
            todayEarnings: 450000,
            averageRating: 4.9,
        },
        activeOrders: [
            {
                id: "ord_001",
                trackingCode: "ST-8821",
                pickupAddress: "123 Nguyễn Huệ, Bến Nghé, Quận 1, TP.HCM",
                dropoffAddress: "456 Lê Văn Việt, Hiệp Phú, Thủ Đức, TP.HCM",
                status: "Đang giao hàng",
                shippingFee: 65000,
            },
            {
                id: "ord_002",
                trackingCode: "ST-8845",
                pickupAddress: "789 Điện Biên Phủ, Phường 22, Bình Thạnh, TP.HCM",
                dropoffAddress: "12 Pasteur, Phường Nguyễn Thái Bình, Quận 1, TP.HCM",
                status: "Đã lấy hàng",
                shippingFee: 45000,
            }
        ],
        notifications: [
            {
                title: "Đơn hàng mới quanh đây",
                time: "5 phút trước",
                message: "Có 3 đơn hàng mới trong bán kính 2km tại khu vực Quận 1."
            },
            {
                title: "Thưởng chuyến tuần",
                time: "2 giờ trước",
                message: "Hoàn thành thêm 5 chuyến để nhận thưởng nóng 150.000đ."
            }
        ]
    }
    localStorage.setItem(DRIVER_STATE_KEY, JSON.stringify(defaultState))
    return defaultState
}

const saveMockState = (newState: any) => {
    localStorage.setItem(DRIVER_STATE_KEY, JSON.stringify(newState))
}

export function useDriverDashboard() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    // 1. Query lấy thống kê tổng quan (Mock)
    const { data: statsData, isLoading: isStatsLoading } = useQuery({
        queryKey: ["driver_dashboard_stats"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300)) // giả lập network delay
            const state = getMockState()
            return {
                ...state.stats,
                isOnline: state.isOnline,
            } as DriverDashboardStats
        },
    })

    // 2. Query lấy danh sách đơn đang thực hiện rút gọn (Mock)
    const { data: activeOrders, isLoading: isOrdersLoading } = useQuery({
        queryKey: ["driver_active_orders_summary"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300))
            const state = getMockState()
            return state.activeOrders as ActiveOrderSummary[]
        },
    })

    // 3. Query lấy thông báo (Mock)
    const { data: notifications } = useQuery({
        queryKey: ["driver_recent_notifications"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 200))
            const state = getMockState()
            return state.notifications
        },
    })

    // 4. Mutation Bật/Tắt trạng thái sẵn sàng (Mock)
    const toggleOnlineMutation = useMutation({
        mutationFn: async (newStatus: boolean) => {
            await new Promise((r) => setTimeout(r, 400))
            const state = getMockState()
            state.isOnline = newStatus
            saveMockState(state)
            return newStatus
        },
        onSuccess: (newStatus) => {
            toast.success(newStatus ? "Đã bật trạng thái sẵn sàng nhận đơn!" : "Đã chuyển sang ngoại tuyến.")
            queryClient.invalidateQueries({ queryKey: ["driver_dashboard_stats"] })
        },
        onError: () => {
            toast.error("Không thể thay đổi trạng thái hoạt động!")
        },
    })

    // Handlers điều hướng
    const goToActiveOrders = () => navigate("/driver/orders/active")
    const goToAvailableOrders = () => navigate("/driver/orders/available")
    const goToOrderDetail = (id: string | number) => navigate(`/driver/orders/active/${id}`)
    const goToEarnings = () => navigate("/driver/earnings")
    const goToReviews = () => navigate("/driver/reviews")

    return {
        stats: statsData || {
            activeOrdersCount: 0,
            completedTodayCount: 0,
            todayEarnings: 0,
            averageRating: 5.0,
            isOnline: false,
        },
        isStatsLoading,
        activeOrders: (activeOrders || []) as ActiveOrderSummary[],
        isOrdersLoading,
        notifications: notifications || [],
        isTogglingStatus: toggleOnlineMutation.isPending,
        toggleOnline: (status: boolean) => toggleOnlineMutation.mutate(status),
        // Navigation
        goToActiveOrders,
        goToAvailableOrders,
        goToOrderDetail,
        goToEarnings,
        goToReviews,
    }
}