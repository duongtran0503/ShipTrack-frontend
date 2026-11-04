import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, Route, Star, Truck, XCircle } from "lucide-react";
import type { useDriverHistory } from "../hooks/use-driver-history";

interface Props {
    kpi: ReturnType<typeof useDriverHistory>["kpi"];
}

export function HistoryKpiCards({ kpi }: Props) {
    // Class chung cho thẻ Card: nền trong suốt, viền mờ, không đổ bóng
    const cardClass = "rounded-[20px] border-border/40 bg-transparent shadow-none p-4 space-y-1.5 flex flex-col justify-between";

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* A1: Tổng chuyến */}
            <Card className={cardClass}>
                <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Tổng số chuyến</span>
                    <Truck className="size-3.5 text-primary" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-foreground">{kpi.totalFinished}</h2>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Các đơn đã hoàn thành hoặc kết thúc</p>
                </div>
            </Card>

            {/* A2: Tỷ lệ hoàn thành */}
            <Card className={cardClass}>
                <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Tỷ lệ hoàn thành</span>
                    <CheckCircle2 className="size-3.5 text-emerald-600" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-foreground">{kpi.completionRate}%</h2>
                    <div className="w-full bg-muted/40 h-1.5 rounded-full overflow-hidden mt-1.5">
                        <div className="bg-emerald-600 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(parseFloat(kpi.completionRate), 100)}%` }} />
                    </div>
                </div>
            </Card>

            {/* A3: Tỷ lệ thất bại */}
            <Card className={cardClass}>
                <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Tỷ lệ thất bại</span>
                    <XCircle className="size-3.5 text-destructive" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-foreground">{kpi.failureRate}%</h2>
                    <div className="w-full bg-muted/40 h-1.5 rounded-full overflow-hidden mt-1.5">
                        <div className="bg-destructive h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(parseFloat(kpi.failureRate), 100)}%` }} />
                    </div>
                </div>
            </Card>

            {/* A4: Đánh giá trung bình */}
            <Card className={cardClass}>
                <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Đánh giá trung bình</span>
                    <Star className="size-3.5 text-amber-500 fill-amber-500" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-foreground">
                        {kpi.avgRating} <span className="text-xs text-muted-foreground font-normal">/ 5</span>
                    </h2>
                    <div className="flex items-center gap-0.5 text-amber-500 text-xs mt-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="size-3 fill-amber-500" />
                        ))}
                    </div>
                </div>
            </Card>

            {/* A5: Thời gian giao trung bình */}
            <Card className={cardClass}>
                <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Thời gian giao TB</span>
                    <Clock className="size-3.5 text-blue-500" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-foreground">
                        {kpi.avgDeliveryMinutes} <span className="text-xs text-muted-foreground font-normal">phút</span>
                    </h2>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Tính từ lúc nhận đến hoàn thành</p>
                </div>
            </Card>

            {/* A6: Tổng quãng đường */}
            <Card className={cardClass}>
                <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Tổng quãng đường</span>
                    <Route className="size-3.5 text-primary" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-foreground">
                        {kpi.totalDistance} <span className="text-xs text-muted-foreground font-normal">km</span>
                    </h2>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Đã tích lũy giao hàng</p>
                </div>
            </Card>
        </div>
    );
}