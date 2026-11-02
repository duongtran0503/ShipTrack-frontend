import { AvailableOrdersList } from "./components/available-orders-list";
import { OrderFilterBar } from "./components/order-filter-bar";
import { useAvailableOrders } from "./hooks/use-available-orders";

export default function AvailableOrdersPage() {
    const {
        orders,
        isLoading,
        minDistance,
        setMinDistance,
        maxDistance,
        setMaxDistance,
        sortBy,
        setSortBy,
        acceptOrder,
        isAccepting,
        viewDetail,
    } = useAvailableOrders();

    return (
        <div className="w-full space-y-6 pb-10">
            {/* Header trang */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black text-foreground">Danh sách đơn hàng</h1>
                    <p className="text-xs text-muted-foreground">
                        Danh sách các đơn vận chuyển đang tìm tài xế trong khu vực. Dữ liệu được cập nhật real-time.
                    </p>
                </div>

                {/* Bộ lọc & Sắp xếp */}
                <OrderFilterBar
                    minDistance={minDistance}
                    setMinDistance={setMinDistance}
                    maxDistance={maxDistance}
                    setMaxDistance={setMaxDistance}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />
            </div>

            {/* Danh sách đơn hàng */}
            <AvailableOrdersList
                orders={orders}
                isLoading={isLoading}
                isAccepting={isAccepting}
                onAccept={acceptOrder}
                onViewDetail={viewDetail}
            />
        </div>
    );
}