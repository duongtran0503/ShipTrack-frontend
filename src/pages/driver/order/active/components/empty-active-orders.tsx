import { Truck } from "lucide-react";

export function EmptyActiveOrders() {
    return (
        <div className="text-center py-20 space-y-3 bg-card rounded-[24px] border border-border/50 shadow-sm">
            <div className="size-16 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                <Truck className="size-8" />
            </div>
            <h3 className="text-base font-bold text-foreground">Bạn chưa có đơn hàng nào đang thực hiện</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Hãy sang danh sách đơn khả dụng để nhận các chuyến giao hàng mới và bắt đầu hành trình ngay.
            </p>
        </div>
    );
}