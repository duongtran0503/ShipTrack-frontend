import { Truck } from "lucide-react";

export function HistoryEmptyState() {
    return (
        <div className="text-center py-20 space-y-3 bg-card rounded-[24px] border border-border/50 shadow-sm">
            <div className="size-16 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                <Truck className="size-8" />
            </div>
            <h3 className="text-base font-bold text-foreground">Không tìm thấy chuyến giao hàng nào</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem các chuyến đi khác.
            </p>
        </div>
    );
}