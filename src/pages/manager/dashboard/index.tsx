import { KpiCards } from "./components/kpi-cards";
import { KpiSkeleton } from "./components/kpi-skeleton";
import { ListSkeleton } from "./components/list-skeleton";
import { PendingDriversCard } from "./components/pending-drivers-card";
import { SystemAlerts } from "./components/system-alerts";
import { SystemLogsCard } from "./components/system-logs-card";
import { useAdminDashboard } from "./hooks/use-admin-dashboard";

export default function AdminDashboardPage() {
    const {
        kpi,
        systemLogs,
        pendingDrivers,
        isLoading,
        goToOrders,
        goToDriverApprovals,
        goToVehicleApprovals,
        goToReports,
        goToSettings,
        goToDriverDetail,
    } = useAdminDashboard();

    // Nếu toàn bộ trang đang load dữ liệu, có thể hiển thị Skeleton
    if (isLoading) {
        return (
            <div className="w-full space-y-6 pb-12">
                <KpiSkeleton />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                    <ListSkeleton />
                    <ListSkeleton />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-12">
            {/* 1. Cảnh báo hệ thống */}
            <SystemAlerts
                kpi={kpi}
                goToOrders={goToOrders}
                goToDriverApprovals={goToDriverApprovals}
                goToVehicleApprovals={goToVehicleApprovals}
            />

            {/* 2. Thẻ KPI tổng quan */}
            <KpiCards
                kpi={kpi}
                goToOrders={goToOrders}
                goToDriverApprovals={goToDriverApprovals}
                goToReports={goToReports}
            />

            {/* 3. Nhật ký & Tài xế chờ duyệt */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                <SystemLogsCard logs={systemLogs} goToSettings={goToSettings} />
                <PendingDriversCard
                    drivers={pendingDrivers}
                    goToDriverApprovals={goToDriverApprovals}
                    goToDriverDetail={goToDriverDetail}
                />
            </div>
        </div>
    );
}