import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, Route, Star, Truck, XCircle } from "lucide-react";
import type { useDriverStatistics } from "../hooks/use-driver-statistics";

interface Props {
    stats: NonNullable<ReturnType<typeof useDriverStatistics>["stats"]>;
}

export function StatisticsKpiCards({ stats }: Props) {
    const cardClass = "rounded-[24px] border-border/40 bg-transparent shadow-none p-5 space-y-2 flex flex-col justify-between";

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Tổng số chuyến */}
            <Card className={cardClass}>
                <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Tổng số chuyến đã giao</span>
                    <Truck className="size-4 text-primary" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-foreground">{stats.totalTrips}</h2>
                    <p className="text-[10px] text-emerald-600 font-medium mt-1">Hoạt động ổn định</p>
                </div>
            </Card>

            {/* Tỷ lệ hoàn thành */}
            <Card className={cardClass}>
                <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Tỷ lệ hoàn thành</span>
                    <CheckCircle2 className="size-4 text-emerald-600" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-foreground">{stats.completionRate}%</h2>
                    <div className="w-full bg-muted/60 h-1.5 rounded-full overflow-hidden mt-2">
                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${stats.completionRate}%` }} />
                    </div>
                </div>
            </Card>

            {/* Tỷ lệ thất bại */}
            <Card className={cardClass}>
                <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Tỷ lệ thất bại / hủy</span>
                    <XCircle className="size-4 text-destructive" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-foreground">{stats.failureRate}%</h2>
                    <div className="w-full bg-muted/60 h-1.5 rounded-full overflow-hidden mt-2">
                        <div className="bg-destructive h-full rounded-full" style={{ width: `${stats.failureRate}%` }} />
                    </div>
                </div>
            </Card>

            {/* Đánh giá trung bình */}
            <Card className={cardClass}>
                <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Đánh giá trung bình</span>
                    <Star className="size-4 text-amber-500 fill-amber-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-foreground">{stats.avgRating} / 5</h2>
                    <div className="flex items-center gap-0.5 text-amber-500 text-xs mt-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="size-3 fill-amber-500" />
                        ))}
                    </div>
                </div>
            </Card>

            {/* Thời gian giao TB */}
            <Card className={cardClass}>
                <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Thời gian giao TB</span>
                    <Clock className="size-4 text-blue-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-foreground">{stats.avgDeliveryMinutes} phút</h2>
                    <p className="text-[10px] text-emerald-600 font-medium mt-1">Nhanh hơn 15% mức trung bình</p>
                </div>
            </Card>

            {/* Tổng quãng đường */}
            <Card className={cardClass}>
                <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Quãng đường tích lũy</span>
                    <Route className="size-4 text-primary" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-foreground">{stats.totalDistanceKm} km</h2>
                    <p className="text-[10px] text-muted-foreground mt-1">Đã di chuyển an toàn</p>
                </div>
            </Card>
        </div>
    );
}