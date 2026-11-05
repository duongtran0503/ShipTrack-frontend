
import { EntityDetailPanel } from "@/pages/manager/tracking/components/entity-detail-card";
import { MapCanvas } from "@/pages/manager/tracking/components/map-canvas";
import { MapHeader } from "@/pages/manager/tracking/components/map-header";
import { useLiveTrackingMap } from "@/pages/manager/tracking/hooks/use-live-tracking-map";
import { Loader2 } from "lucide-react";


export default function AdminLiveMapPage() {
    const {
        drivers,
        orders,
        isLoading,
        filterDriverStatus,
        setFilterDriverStatus,
        selectedEntity,
        setSelectedEntity,
    } = useLiveTrackingMap();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang kết nối hệ thống bản đồ Real-time SignalR...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-12">
            {/* Header & Bộ lọc */}
            <MapHeader
                filterDriverStatus={filterDriverStatus}
                setFilterDriverStatus={setFilterDriverStatus}
            />

            {/* Layout Bản đồ & Panel thông tin */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <MapCanvas
                        drivers={drivers}
                        orders={orders}
                        onSelectEntity={setSelectedEntity}
                    />
                </div>
                <div className="lg:col-span-1">
                    <EntityDetailPanel entity={selectedEntity} />
                </div>
            </div>
        </div>
    );
}