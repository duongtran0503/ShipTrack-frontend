import { Loader2 } from "lucide-react";
import { EarningsChartCard } from "./components/earnings-chart-card";
import { EarningsHeader } from "./components/earnings-header";
import { EarningsKpiCards } from "./components/earnings-kpi-cards";
import { EarningsList } from "./components/earnings-list";
import { useDriverEarnings } from "./hooks/use-driver-earnings";

export default function DriverEarningsPage() {
    const {
        data,
        isLoading,
        timeRange,
        setTimeRange,
        chartTab,
        setChartTab,
        handleExportReport,
    } = useDriverEarnings();

    if (isLoading || !data) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải dữ liệu thu nhập tài xế...
            </div>
        );
    }

    return (
        <div className="w-full space-y-8 pb-10">
            {/* Header */}
            <EarningsHeader onExport={handleExportReport} />

            {/* KPI Cards */}
            <EarningsKpiCards summary={data.summary} />

            {/* Chart */}
            <EarningsChartCard chartTab={chartTab} setChartTab={setChartTab} />

            {/* List */}
            <EarningsList
                earningsList={data.earningsList}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
            />
        </div>
    );
}