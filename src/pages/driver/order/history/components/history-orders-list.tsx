import { Loader2 } from "lucide-react";
import type { HistoryOrderItem } from "../hooks/use-driver-history";
import { HistoryEmptyState } from "./history-empty-state";
import { HistoryOrderCard } from "./history-order-card";

interface Props {
    orders: HistoryOrderItem[];
    isLoading: boolean;
    onViewDetail: (id: string | number) => void;
}

export function HistoryOrdersList({ orders, isLoading, onViewDetail }: Props) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải danh sách lịch sử giao hàng...
            </div>
        );
    }

    if (orders.length === 0) {
        return <HistoryEmptyState />;
    }

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <HistoryOrderCard
                    key={order.id}
                    order={order}
                    onClick={() => onViewDetail(order.id)}
                />
            ))}
        </div>
    );
}