import { EmptyActiveOrders } from "@/pages/driver/order/active/components/empty-active-orders";
import { Loader2 } from "lucide-react";
import type { ActiveOrderItem, ActiveOrderStatus } from "../hooks/use-active-orders";
import { ActiveOrderCard } from "./active-order-card";

interface Props {
    orders: ActiveOrderItem[];
    isLoading: boolean;
    isUpdating: boolean;
    onViewDetail: (id: string | number) => void;
    onOpenRouteMap: (id: string | number, e: React.MouseEvent) => void;
    onUpdateStatus: (id: string | number, status: ActiveOrderStatus) => void;
}

export function ActiveOrdersList({
    orders,
    isLoading,
    isUpdating,
    onViewDetail,
    onOpenRouteMap,
    onUpdateStatus,
}: Props) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải danh sách đơn hàng đang thực hiện...
            </div>
        );
    }

    if (orders.length === 0) {
        return <EmptyActiveOrders />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map((order) => (
                <ActiveOrderCard
                    key={order.id}
                    order={order}
                    isUpdating={isUpdating}
                    onViewDetail={onViewDetail}
                    onOpenRouteMap={onOpenRouteMap}
                    onUpdateStatus={onUpdateStatus}
                />
            ))}
        </div>
    );
}