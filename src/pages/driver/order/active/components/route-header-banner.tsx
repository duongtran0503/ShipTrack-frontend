import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Compass, Navigation } from "lucide-react";

interface Props {
    trackingCode: string;
    remainingDistanceKm?: number;
    remainingMinutes?: number;
    // Bỏ dấu ? để khớp type
    dropoffLat: number;
    dropoffLng: number;
    receiverAddress: string;
    onGoBack: () => void;
    onOpenGoogleMaps: (lat: number, lng: number, address: string) => void;
}

export function RouteHeaderBanner({
    trackingCode,
    remainingDistanceKm,
    remainingMinutes,
    dropoffLat,
    dropoffLng,
    receiverAddress,
    onGoBack,
    onOpenGoogleMaps,
}: Props) {
    return (
        <div className="space-y-6">
            {/* Header điều hướng */}
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={onGoBack}
                    className="text-xs font-bold gap-2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                    <ArrowLeft className="size-4" />
                    <span>Quay lại chi tiết đơn hàng</span>
                </Button>
                <Badge variant="secondary" className="text-xs font-bold text-primary bg-accent hover:bg-accent/80 px-3 py-1 rounded-full">
                    Mã đơn: #{trackingCode}
                </Badge>
            </div>

            {/* Banner tóm tắt khoảng cách */}
            <div className="rounded-[28px] bg-gradient-to-r from-[#710105] via-[#8B0000] to-[#b92338] p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                    <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">Hệ thống điều hướng thời gian thực</span>
                    <h1 className="text-xl sm:text-xl font-black text-white flex items-center justify-center md:justify-start gap-3">
                        <Compass className="size-6 text-amber-400 animate-pulse" />
                        Còn khoảng {remainingDistanceKm || 0} km ({remainingMinutes || 0} phút) tới điểm đích
                    </h1>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto justify-center">
                    <Button
                        onClick={() => onOpenGoogleMaps(dropoffLat, dropoffLng, receiverAddress)}
                        className="h-12 px-8 rounded-2xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-lg cursor-pointer transition-all gap-2"
                    >
                        <Navigation className="size-4 fill-stone-950" /> Mở Google Maps chỉ đường
                    </Button>
                </div>
            </div>
        </div>
    );
}