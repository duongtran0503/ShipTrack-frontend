import { Card } from "@/components/ui/card";
import type { ActiveOrderDetailItem } from "@/pages/driver/order/active/hooks/use-active-order-detail";
import { Package } from "lucide-react";

interface Props {
    order: ActiveOrderDetailItem;
}

export function PackageInfoCard({ order }: Props) {
    return (
        <Card className="rounded-[28px] border-border/60 shadow-sm bg-card p-6 space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Package className="size-4 text-primary" /> Chi tiết hàng hóa
            </h3>
            <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                    <span className="text-muted-foreground">Tên gói hàng:</span>
                    <span className="font-bold text-foreground">{order.packageName || "Bưu phẩm tiêu chuẩn"}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                    <span className="text-muted-foreground">Trọng lượng:</span>
                    <span className="font-bold text-foreground">{order.weightKg || 1} kg</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                    <span className="text-muted-foreground">Hàng cồng kềnh:</span>
                    <span className="font-bold text-foreground">{order.isBulky ? "Có" : "Không"}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                    <span className="text-muted-foreground">Giao tận cửa:</span>
                    <span className="font-bold text-foreground">{order.isDoorDelivery ? "Có" : "Không"}</span>
                </div>
                <div className="space-y-1 pt-1">
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold">Ghi chú từ khách:</span>
                    <p className="p-3 rounded-xl bg-amber-500/10 text-amber-900 dark:text-amber-200 text-[11px] italic leading-relaxed">
                        "{order.note || "Không có ghi chú thêm từ khách hàng."}"
                    </p>
                </div>
            </div>
        </Card>
    );
}