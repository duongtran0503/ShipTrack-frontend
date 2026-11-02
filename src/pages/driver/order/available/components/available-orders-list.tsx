import { EmptyOrdersState } from "@/pages/driver/order/available/components/empty-orders-state";
import { Loader2 } from "lucide-react";
import type { AvailableOrder } from "../hooks/use-available-orders";
import { AvailableOrderCard } from "./available-order-card";

interface Props {
    orders: AvailableOrder[];
    isLoading: boolean;
    isAccepting: boolean;
    onAccept: (id: string | number) => void;
    onViewDetail: (id: string | number) => void;
}

export function AvailableOrdersList({ orders, isLoading, isAccepting, onAccept, onViewDetail }: Props) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang quét đơn hàng khả dụng quanh đây...
            </div>
        );
    }

    if (orders.length === 0) {
        return <EmptyOrdersState />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map((order) => (
                <AvailableOrderCard
                    key={order.id}
                    order={order}
                    isAccepting={isAccepting}
                    onAccept={onAccept}
                    onViewDetail={onViewDetail}
                />
            ))}
        </div>
    );
}