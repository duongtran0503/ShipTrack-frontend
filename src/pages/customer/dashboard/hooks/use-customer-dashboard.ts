import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"

import { orderApi } from "@/services/order/order-api"
import { userApi } from "@/services/user/user-api"

export function useCustomerDashboard() {
    const navigate = useNavigate()

    // ==================== QUERIES ====================
    // Lấy thống kê thật từ API /users/dashboard-star
    const {
        data: statsResponse,
        isLoading: isStatsLoading,
    } = useQuery({
        queryKey: ["customer_dashboard_stats"],
        queryFn: userApi.getDashboardStats,
    })

    // Trích xuất object data bên trong response của backend (activeOrders, completedOrders, totalOrders, totalSpent)
    const stats = {
        activeOrders: statsResponse?.data.activeOrders || 0,
        completedOrders: statsResponse?.data.completedOrders || 0,
        totalOrders: statsResponse?.data.totalOrders || 0,
        totalSpent: statsResponse?.data.totalSpent || 0,
    }
    // Vẫn giữ lại recentOrders (có thể thay bằng API getOrders phân trang giới hạn nếu backend hỗ trợ)
    const {
        data: recentOrders,
        isLoading: isOrdersLoading,
    } = useQuery({
        queryKey: ["customer_recent_orders"],
        queryFn: () => orderApi.getOrders({
            page: 1,
            itemPerpage: 10,
            search: "",
            status: "",
        }),
        staleTime: 1000 * 60 * 2,
    })

    // ==================== NAVIGATION HANDLERS ====================
    const goToCreateOrder = () => navigate("/customer/orders/create")
    const goToAllOrders = () => navigate("/customer/orders")
    const goToOrderDetail = (orderId: string) =>
        navigate(`/customer/orders/${orderId}`)

    // ==================== RETURN ====================
    return {
        // Data
        stats,
        isStatsLoading,
        recentOrders: recentOrders?.data.data || [],
        isOrdersLoading,

        // Handlers
        goToCreateOrder,
        goToAllOrders,
        goToOrderDetail,

        // Helpers
        hasOrders: !!recentOrders && recentOrders.data.total_items > 0,
    }
}