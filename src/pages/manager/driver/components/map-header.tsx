import { Button } from "@/components/ui/button";
import type { MapDriverLocation } from "@/pages/manager/driver/hooks/use-drivers-map";
import { Navigation } from "lucide-react";

interface Props {
    allCount: number;
    drivers: MapDriverLocation[];
    filterType: "ALL" | "ONLINE" | "DELIVERING";
    setFilterType: (val: "ALL" | "ONLINE" | "DELIVERING") => void;
}

export function MapHeader({ allCount, drivers, filterType, setFilterType }: Props) {
    const onlineCount = drivers.filter((d) => d.DeliveryStatus === "ONLINE").length;
    const deliveringCount = drivers.filter((d) => d.DeliveryStatus === "DELIVERING").length;

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-xl font-black text-foreground flex items-center gap-2">
                    <Navigation className="size-6 text-primary" />
                    <span>Bản đồ vị trí tài xế (Real-time GIS)</span>
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                    Theo dõi tọa độ GPS trực tiếp của toàn bộ tài xế đang hoạt động trên bản đồ khu vực TP.HCM.
                </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
                {[
                    { label: `Tất cả (${allCount})`, value: "ALL" },
                    { label: `Sẵn sàng (${onlineCount})`, value: "ONLINE" },
                    { label: `Đang giao (${deliveringCount})`, value: "DELIVERING" },
                ].map((tab) => (
                    <Button
                        key={tab.value}
                        variant={filterType === tab.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterType(tab.value as any)}
                        className="rounded-xl text-xs font-semibold h-9"
                    >
                        {tab.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}