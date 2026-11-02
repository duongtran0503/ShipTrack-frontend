import { Card } from "@/components/ui/card";
import { HelpCircle, MapPin } from "lucide-react";

interface Props {
    availableOrdersNearby: number;
    activeOrdersCount: number;
}

export function LocationStatsCard({ availableOrdersNearby, activeOrdersCount }: Props) {
    return (
        <Card className="rounded-[24px] border-border/50 shadow-sm bg-card p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <MapPin className="size-4 text-amber-500" />
                    <span>Khu vực & Cơ hội nhận đơn</span>
                </h3>
            </div>

            <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/20">
                    <span className="text-muted-foreground">Đơn hàng có thể nhận quanh đây:</span>
                    <span className="font-black text-foreground text-sm">{availableOrdersNearby} đơn</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/20">
                    <span className="text-muted-foreground">Đơn hàng chưa hoàn thành:</span>
                    <span className="font-bold text-amber-600">{activeOrdersCount} đơn</span>
                </div>

                <div className="p-3 rounded-xl bg-primary/5 border border-primary/15 flex items-start gap-2.5">
                    <HelpCircle className="size-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Mẹo: Bật trạng thái sẵn sàng ở khu vực trung tâm thành phố giúp hệ thống định vị và ghép đơn nhanh gấp 3 lần.
                    </p>
                </div>
            </div>
        </Card>
    );
}