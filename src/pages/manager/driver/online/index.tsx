
import { OnlineDriversTable } from "@/pages/manager/driver/components/data-table-driver-online";
import { OnlineStats } from "@/pages/manager/driver/components/online-stats";
import { useOnlineDrivers } from "@/pages/manager/driver/hooks/use-online-drivers";
import { Loader2 } from "lucide-react";


export default function AdminOnlineDriversPage() {
    const { drivers, isLoading, goToMap, goToDriverDetail, goToOrderDetail } = useOnlineDrivers();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải danh sách tài xế online real-time...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-12">
            {/* Cụm thẻ thống kê */}
            <OnlineStats drivers={drivers} />

            {/* Bảng danh sách sử dụng DataTable */}
            <OnlineDriversTable
                drivers={drivers}
                onViewMap={goToMap}
                onViewDetail={goToDriverDetail}
                onViewOrder={goToOrderDetail}
            />
        </div>
    );
}