import { Button } from "@/components/ui/button";
import { Radio } from "lucide-react";

interface Props {
    filterDriverStatus: "ALL" | "ONLINE" | "DELIVERING";
    setFilterDriverStatus: (val: "ALL" | "ONLINE" | "DELIVERING") => void;
}

export function MapHeader({ filterDriverStatus, setFilterDriverStatus }: Props) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-xl font-black text-foreground flex items-center gap-2">
                    <Radio className="size-6 text-emerald-500 animate-pulse" />
                    <span>Bản đồ điều phối trực tiếp (Live Tracking)</span>
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                    Giám sát tọa độ tài xế di chuyển và điểm lấy/giao đơn hàng thời gian thực qua kết nối WebSocket.
                </p>
            </div>

            {/* Bộ lọc trạng thái tài xế */}
            <div className="flex items-center gap-2 flex-wrap">
                {[
                    { label: "Tất cả tài xế", value: "ALL" },
                    { label: "Đang rảnh (Online)", value: "ONLINE" },
                    { label: "Đang giao hàng", value: "DELIVERING" },
                ].map((tab) => (
                    <Button
                        key={tab.value}
                        variant={filterDriverStatus === tab.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterDriverStatus(tab.value as any)}
                        className="rounded-xl text-xs font-semibold h-9"
                    >
                        {tab.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}