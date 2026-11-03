import { HistoryChartCard } from "./components/history-chart-card";
import { HistoryFilterBar } from "./components/history-filter-bar";
import { HistoryKpiCards } from "./components/history-kpi-cards";
import { HistoryOrdersList } from "./components/history-orders-list";
import { useDriverHistory } from "./hooks/use-driver-history";

export default function DriverHistoryPage() {
    const {
        orders,
        isLoading,
        statusFilter,
        setStatusFilter,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        chartPeriodTab,
        setChartPeriodTab,
        handleResetFilter,
        kpi,
        viewDetail,
    } = useDriverHistory();

    return (
        <div className="w-full space-y-8 pb-16 px-2 sm:px-4">


            {/* PHẦN A: THỐNG KÊ KPI */}
            <HistoryKpiCards kpi={kpi} />

            {/* PHẦN B: BIỂU ĐỒ HIỆU SUẤT */}
            <HistoryChartCard
                chartPeriodTab={chartPeriodTab}
                setChartPeriodTab={setChartPeriodTab}
            />

            {/* PHẦN C: BỘ LỌC */}
            <HistoryFilterBar
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onReset={handleResetFilter}
            />

            {/* Số lượng kết quả */}
            <div className="text-xs font-semibold text-muted-foreground px-1">
                Tìm thấy <strong className="text-foreground">{orders.length}</strong> chuyến giao hàng
            </div>

            {/* PHẦN D: DANH SÁCH CHUYẾN ĐI */}
            <HistoryOrdersList
                orders={orders}
                isLoading={isLoading}
                onViewDetail={viewDetail}
            />
        </div>
    );
}