import { HistoryChartCard } from "./components/history-chart-card";
import { HistoryFilterBar } from "./components/history-filter-bar";
import { HistoryKpiCards } from "./components/history-kpi-cards";
import { HistoryOrdersList } from "./components/history-orders-list";
import { useDriverHistory } from "./hooks/use-driver-history";

export default function DriverHistoryPage() {
    const {
        orders,
        totalOrdersCount,
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
        chartData,
        viewDetail,
    } = useDriverHistory();



    // Tính tổng số lượng đơn hoàn thành và thất bại từ chartData để hiển thị ở biểu đồ tròn
    const totalCompleted = chartData.reduce((acc, curr) => acc + curr.completed, 0);
    const totalFailed = chartData.reduce((acc, curr) => acc + curr.failed, 0);

    return (
        <div className="w-full space-y-8 pb-16 px-2 sm:px-4">

            {/* PHẦN A: THỐNG KÊ KPI */}
            <HistoryKpiCards kpi={kpi} />

            {/* PHẦN B: BIỂU ĐỒ HIỆU SUẤT */}
            <HistoryChartCard
                chartPeriodTab={chartPeriodTab}
                setChartPeriodTab={setChartPeriodTab}
                chartData={chartData}
                completionRate={kpi.completionRate}
                totalCompleted={totalCompleted}
                totalFailed={totalFailed}
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
                Tìm thấy <strong className="text-foreground">{totalOrdersCount}</strong> chuyến giao hàng
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