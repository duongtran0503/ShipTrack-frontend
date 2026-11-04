import { Button } from "@/components/ui/button";
import { Power, Radio } from "lucide-react";
import { useNavigate } from "react-router";
import { AvailableOrdersList } from "./components/available-orders-list";
import { OrderFilterBar } from "./components/order-filter-bar";
import { useAvailableOrders } from "./hooks/use-available-orders";

export default function AvailableOrdersPage() {
    const navigate = useNavigate();
    const {
        orders,
        isLoading,
        isOnline,
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

    if (!isLoading && !isOnline) {
        return (
            <div className="w-full py-20 px-4 text-center space-y-6 bg-card rounded-[28px] border border-border/60 shadow-sm max-w-2xl mx-auto my-10">
                <div className="size-20 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                    <Radio className="size-10 animate-pulse" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-black text-foreground">Bạn đang ở trạng thái Offline</h2>
                    <p className="text-xs text-muted-foreground max-w-md mx-auto">
                        Bạn cần kích hoạt trạng thái hoạt động (Online) và chọn vùng phục vụ để hệ thống có thể quét và hiển thị danh sách đơn hàng khả dụng quanh bạn.
                    </p>
                </div>
                <Button
                    onClick={() => navigate("/driver/availability")}
                    className="rounded-2xl bg-[#710105] hover:bg-[#580104] text-white font-bold text-xs h-12 px-8 shadow-md cursor-pointer gap-2"
                >
                    <Power className="size-4" /> Đi tới trang bật Online ngay
                </Button>
            </div>
        );
    }

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