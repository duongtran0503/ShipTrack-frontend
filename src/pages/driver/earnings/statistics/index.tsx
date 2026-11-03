
import { RankingBanner } from "@/pages/driver/earnings/components/ranking-banner";
import { StatisticsChartCard } from "@/pages/driver/earnings/components/statistics-chart-card";
import { StatisticsKpiCards } from "@/pages/driver/earnings/components/statistics-kpi-cards";
import { useDriverStatistics } from "@/pages/driver/earnings/hooks/use-driver-statistics";
import { Loader2 } from "lucide-react";


export default function DriverStatisticsPage() {
    const { stats, isLoading, statPeriodTab, setStatPeriodTab } = useDriverStatistics();

    if (isLoading || !stats) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải dữ liệu thống kê hiệu suất...
            </div>
        );
    }

    return (
        <div className="w-full space-y-8 pb-16 ">
            {/* Header Trang */}
            <div className="space-y-1">
                <h1 className="text-2xl font-black text-foreground">Thống kê hiệu suất cá nhân</h1>
                <p className="text-xs text-muted-foreground">
                    Theo dõi các chỉ số KPI vận hành, đánh giá chất lượng phục vụ và vị trí xếp hạng của bạn.
                </p>
            </div>

            {/* Banner xếp hạng */}
            <RankingBanner ranking={stats.ranking} />

            {/* Lưới 6 thẻ KPI */}
            <StatisticsKpiCards stats={stats} />

            {/* Biểu đồ so sánh */}
            <StatisticsChartCard
                chartData={stats.chartData}
                statPeriodTab={statPeriodTab}
                setStatPeriodTab={setStatPeriodTab}
            />
        </div>
    );
}