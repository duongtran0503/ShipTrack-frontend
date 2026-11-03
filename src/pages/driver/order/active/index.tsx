import { ActiveOrderFilter } from "./components/active-order-filter";
import { ActiveOrdersList } from "./components/active-orders-list";
import { useActiveOrders } from "./hooks/use-active-orders";

export default function ActiveOrdersPage() {
    const {
        orders,
        isLoading,
        sortBy,
        setSortBy,
        updateQuickStatus,
        isUpdating,
        viewDetail,
        openRouteMap,
    } = useActiveOrders();

    return (
        <div className="w-full space-y-6 pb-10">
            {/* Header & Bộ lọc sắp xếp */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black text-foreground">Đơn đã tiếp nhận</h1>
                    <p className="text-xs text-muted-foreground">
                        Danh sách các đơn bạn đã nhận thành công. Vui lòng thực hiện đúng tiến độ giao hàng và cập nhật trạng thái liên tục.
                    </p>
                </div>

                <ActiveOrderFilter sortBy={sortBy} setSortBy={setSortBy} />
            </div>

            {/* Danh sách đơn */}
            <ActiveOrdersList
                orders={orders}
                isLoading={isLoading}
                isUpdating={isUpdating}
                onViewDetail={viewDetail}
                onOpenRouteMap={openRouteMap}
                onUpdateStatus={updateQuickStatus}
            />
        </div>
    );
}