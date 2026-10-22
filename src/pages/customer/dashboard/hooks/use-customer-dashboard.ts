import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"

import { mockOrderService } from "@/demo_data_services/mockOrderService"

export function useCustomerDashboard() {
    const navigate = useNavigate()

    // ==================== QUERIES ====================
    const {
        data: stats,
        isLoading: isStatsLoading,
    } = useQuery({
        queryKey: ["customer_dashboard_stats"],
        queryFn: mockOrderService.getDashboardStats,
    })

    const {
        data: recentOrders,
        isLoading: isOrdersLoading,
    } = useQuery({
        queryKey: ["customer_recent_orders"],
        queryFn: mockOrderService.getRecentOrders,
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
        recentOrders,
        isOrdersLoading,

        // Handlers
        goToCreateOrder,
        goToAllOrders,
        goToOrderDetail,

        // Helpers
        hasOrders: !!recentOrders && recentOrders.length > 0,
    }
}