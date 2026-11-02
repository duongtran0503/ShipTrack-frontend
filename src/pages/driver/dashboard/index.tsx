import { ActiveOrdersTable } from "./components/active-orders-table";
import { AvailableOrdersCta } from "./components/available-orders-cta";
import { DeliveryTipsCard } from "./components/delivery-tips-card";
import { NotificationsCard } from "./components/notifications-card";
import { StatsGrid } from "./components/stats-grid";
import { StatusBanner } from "./components/status-banner";
import { useDriverDashboard } from "./hooks/use-driver-dashboard";

export default function DriverDashboardPage() {
    const {
        stats,
        isStatsLoading,
        activeOrders,
        isOrdersLoading,
        notifications,
        isTogglingStatus,
        toggleOnline,
        goToActiveOrders,
        goToAvailableOrders,
        goToOrderDetail,
        goToEarnings,
        goToReviews,
    } = useDriverDashboard();

    return (
        <div className="space-y-6 pb-10">
            {/* 1. Banner trạng thái */}
            <StatusBanner
                isOnline={stats.isOnline}
                isToggling={isTogglingStatus}
                onToggle={toggleOnline}
            />

            {/* 2. KPI grid */}
            <StatsGrid
                stats={stats}
                isLoading={isStatsLoading}
                goToActiveOrders={goToActiveOrders}
                goToEarnings={goToEarnings}
                goToReviews={goToReviews}
            />

            {/* 3. Main content: active orders + notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <ActiveOrdersTable
                        orders={activeOrders}
                        isLoading={isOrdersLoading}
                        goToActiveOrders={goToActiveOrders}
                        goToAvailableOrders={goToAvailableOrders}
                        goToOrderDetail={goToOrderDetail}
                    />
                    <AvailableOrdersCta onClick={goToAvailableOrders} />
                </div>

                <div className="space-y-6">
                    <NotificationsCard notifications={notifications} />
                    <DeliveryTipsCard />
                </div>
            </div>
        </div>
    );
}