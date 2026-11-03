import { Card } from "@/components/ui/card";
import type { EarningItem } from "../hooks/use-driver-earnings";

interface Props {
    item: EarningItem;
}

export function EarningItemCard({ item }: Props) {
    return (
        <Card className="rounded-[20px] border-border/60 shadow-sm bg-card p-5 hover:border-primary/40 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-primary bg-accent px-2.5 py-0.5 rounded-full">
                            #{item.trackingCode}
                        </span>
                        <span className="text-xs text-muted-foreground">{item.completedAt}</span>
                    </div>
                    <div className="text-xs text-muted-foreground pt-1 flex items-center gap-3 flex-wrap">
                        <span>Phí vận chuyển: <strong className="text-foreground">{item.shippingFee.toLocaleString("vi-VN")} đ</strong></span>
                        <span>Thưởng: <strong className="text-emerald-600">+{item.driverBonus.toLocaleString("vi-VN")} đ</strong></span>
                    </div>
                </div>
                <div className="text-right sm:text-right text-left">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block">Thực nhận</span>
                    <span className="text-base font-black text-emerald-600">
                        +{item.netIncome.toLocaleString("vi-VN")} đ
                    </span>
                </div>
            </div>
        </Card>
    );
}