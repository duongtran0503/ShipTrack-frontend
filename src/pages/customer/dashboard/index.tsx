import { useCustomerDashboard } from "@/pages/customer/dashboard/hooks/use-customer-dashboard"
import { DashboardRecentOrders } from "./components/dashboard-recent-orders"
import { DashboardStatsCards } from "./components/dashboard-stats-cards"
import { DashboardWelcomeBanner } from "./components/dashboard-welcome-banner"

export default function CustomerDashboardPage() {
    const {
        stats,
        isStatsLoading,
        recentOrders,
        isOrdersLoading,
        goToCreateOrder,
        goToAllOrders,
        goToOrderDetail,
    } = useCustomerDashboard()

    return (
        <div className=" bg-muted/30  text-foreground space-y-6">
            <div className=" mx-auto space-y-4">
                {/* Banner chào mừng */}
                <DashboardWelcomeBanner onCreateOrder={goToCreateOrder} />

                {/* 4 card thống kê */}
                <DashboardStatsCards stats={stats} isLoading={isStatsLoading} />

                {/* Bảng đơn gần đây */}
                <DashboardRecentOrders
                    orders={recentOrders}
                    isLoading={isOrdersLoading}
                    onViewAll={goToAllOrders}
                    onViewDetail={goToOrderDetail}
                    onCreateOrder={goToCreateOrder}
                />
            </div>
        </div>
    )
}