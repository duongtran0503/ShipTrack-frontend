import { Card } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export function DeliveryTipsCard() {
    return (
        <Card className="rounded-[24px] border-border/50 shadow-sm bg-card p-6 space-y-3">
            <div className="flex items-center gap-2 text-primary">
                <ShieldAlert className="size-5" />
                <h4 className="text-sm font-bold">Lưu ý khi giao hàng</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
                Luôn kiểm tra kỹ mã đơn hàng và gọi điện cho người nhận trước khi đến giao
                10-15 phút để đảm bảo tỷ lệ hoàn thành chuyến đi đạt mức cao nhất.
            </p>
        </Card>
    );
}