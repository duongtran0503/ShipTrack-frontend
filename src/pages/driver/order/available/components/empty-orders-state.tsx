import { Package } from "lucide-react";

export function EmptyOrdersState() {
    return (
        <div className="text-center py-20 space-y-3 bg-card rounded-[24px] border border-border/50 shadow-sm">
            <div className="size-16 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                <Package className="size-8" />
            </div>
            <h3 className="text-base font-bold text-foreground">Không tìm thấy đơn hàng phù hợp</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Hãy thử điều chỉnh lại bộ lọc khoảng cách từ - đến hoặc đặt lại sắp xếp để xem thêm các đơn hàng khác.
            </p>
        </div>
    );
}