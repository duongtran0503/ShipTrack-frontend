import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Truck } from "lucide-react";

interface Props {
    trackingCode: string;
    currentStatus: string;
    driverStatusLabel?: string;
    onGoBack: () => void;
    onOpenRouteMap: () => void;
}

export function ActiveOrderHeader({
    trackingCode,
    currentStatus,
    driverStatusLabel,
    onGoBack,
    onOpenRouteMap,
}: Props) {
    return (
        <div className="space-y-6">
            {/* Header điều hướng & Mã đơn */}
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={onGoBack}
                    className="text-xs font-bold gap-2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                    <ArrowLeft className="size-4" />
                    <span>Quay lại danh sách đơn</span>
                </Button>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs font-bold text-primary bg-accent hover:bg-accent/80 px-3 py-1 rounded-full">
                        Mã đơn: #{trackingCode}
                    </Badge>
                    <Badge variant="outline" className="text-xs font-bold px-3 py-1 rounded-full uppercase">
                        {currentStatus}
                    </Badge>
                </div>
            </div>

            {/* Banner trạng thái hiện tại */}
            <div className="rounded-[28px] bg-gradient-to-r from-[#710105] via-[#8B0000] to-[#b92338] p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1.5 text-center md:text-left">
                    <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">Trạng thái vận hành hiện tại</span>
                    <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center md:justify-start gap-3">
                        <Truck className="size-8 text-amber-400 animate-pulse" />
                        {driverStatusLabel || "Đang xử lý chuyến đi"}
                    </h1>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto justify-center">
                    <Button
                        variant="outline"
                        onClick={onOpenRouteMap}
                        className="h-12 px-8 rounded-2xl font-bold text-xs bg-white/15 border-white/25 text-white hover:bg-white/25 cursor-pointer shadow-md transition-all gap-2"
                    >
                        Mở bản đồ lộ trình chi tiết
                    </Button>
                </div>
            </div>
        </div>
    );
}