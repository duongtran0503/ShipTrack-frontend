import { DriverLocationCard } from "@/pages/manager/driver/components/driver-location-card";
import { MapHeader } from "@/pages/manager/driver/components/map-header";
import { MapSimulationView } from "@/pages/manager/driver/components/map-simulation-view";
import { useDriversMap } from "@/pages/manager/driver/hooks/use-drivers-map";
import { Loader2 } from "lucide-react";

export default function AdminDriversMapPage() {
    const {
        drivers,
        allCount,
        isLoading,
        filterType,
        setFilterType,
        selectedDriver,
        setSelectedDriver,
    } = useDriversMap();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải hệ thống bản đồ điều phối định vị...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-12">
            {/* Header + Bộ lọc */}
            <MapHeader
                allCount={allCount}
                drivers={drivers}
                filterType={filterType}
                setFilterType={setFilterType}
            />

            {/* Layout Bản đồ & Danh sách */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bản đồ mô phỏng (2 cột) */}
                <div className="lg:col-span-2">
                    <MapSimulationView
                        drivers={drivers}
                        selectedDriver={selectedDriver}
                        onSelectDriver={setSelectedDriver}
                    />
                </div>

                {/* Thông tin chi tiết (1 cột) */}
                <div className="lg:col-span-1">
                    <DriverLocationCard driver={selectedDriver} />
                </div>
            </div>
        </div>
    );
}