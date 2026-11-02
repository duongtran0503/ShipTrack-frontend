import { ArrowRight, CheckCircle2, Package, Star, Wallet } from "lucide-react";
import type { DriverStats } from "../types";
import { StatCard } from "./stat-card";

interface Props {
    stats: DriverStats;
    isLoading: boolean;
    goToActiveOrders: () => void;
    goToEarnings: () => void;
    goToReviews: () => void;
}

export function StatsGrid({
    stats,
    isLoading,
    goToActiveOrders,
    goToEarnings,
    goToReviews,
}: Props) {
    const dash = isLoading ? "..." : null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
                label="Đơn đang giao"
                value={dash ?? stats.activeOrdersCount}
                icon={Package}
                onClick={goToActiveOrders}
                hint={
                    <div className="text-xs text-primary font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Xem chi tiết <ArrowRight className="size-3" />
                    </div>
                }
            />
            <StatCard
                label="Hoàn thành hôm nay"
                value={
                    dash ?? (
                        <>
                            {stats.completedTodayCount}{" "}
                            <span className="text-xs font-normal text-muted-foreground">đơn</span>
                        </>
                    )
                }
                icon={CheckCircle2}
                iconBgClass="bg-emerald-500/10"
                iconColorClass="text-emerald-600"
                hoverBorderClass="hover:border-emerald-500/40"
                onClick={goToActiveOrders}
                hint={
                    <div className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                        <CheckCircle2 className="size-3.5" /> Hiệu suất tốt
                    </div>
                }
            />
            <StatCard
                label="Thu nhập hôm nay"
                value={
                    dash ?? `${stats.todayEarnings.toLocaleString("vi-VN")} đ`
                }
                icon={Wallet}
                iconBgClass="bg-amber-500/10"
                iconColorClass="text-amber-600"
                valueClass="text-shiptrack-price"
                onClick={goToEarnings}
                hint={
                    <div className="text-xs text-primary font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Báo cáo thu nhập <ArrowRight className="size-3" />
                    </div>
                }
            />
            <StatCard
                label="Đánh giá trung bình"
                value={
                    dash ?? (
                        <span className="flex items-center gap-2">
                            {stats.averageRating.toFixed(1)}
                            <Star className="size-5 text-amber-500 fill-amber-500" />
                        </span>
                    )
                }
                icon={Star}
                iconBgClass="bg-amber-500/10"
                iconColorClass="text-amber-500"
                hoverBorderClass="hover:border-amber-500/40"
                onClick={goToReviews}
                hint={
                    <div className="text-xs text-amber-600 font-medium">Rất xuất sắc</div>
                }
            />
        </div>
    );
}