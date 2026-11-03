import { Card } from "@/components/ui/card";
import type { ActiveOrderDetailItem } from "@/pages/driver/order/active/hooks/use-active-order-detail";
import { Clock } from "lucide-react";

interface Props {
    order: ActiveOrderDetailItem;
}

export function PaymentInfoCard({ order }: Props) {
    return (
        <Card className="rounded-[28px] border-border/60 shadow-sm bg-card p-6 space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Clock className="size-4 text-amber-500" /> Thanh toán & Chi phí
            </h3>
            <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                    <span className="text-muted-foreground">Hình thức thanh toán:</span>
                    <span className="font-bold text-foreground uppercase">{order.paymentMethod || "CASH"}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                    <span className="text-muted-foreground">Tiền thu hộ (COD):</span>
                    <span className="font-bold text-emerald-600 text-sm">
                        {(order.codAmount || 0).toLocaleString("vi-VN")} đ
                    </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                    <span className="text-muted-foreground">Thu nhập chuyến đi (Phí):</span>
                    <span className="font-bold text-shiptrack-price text-sm">
                        {(order.shippingFee || 0).toLocaleString("vi-VN")} đ
                    </span>
                </div>
            </div>
        </Card>
    );
}