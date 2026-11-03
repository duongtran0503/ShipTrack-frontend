import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "lucide-react";

interface Props {
    distanceKm?: number;
    // Đã bỏ dấu ? vì hàm openGoogleMapsDirections yêu cầu tham số bắt buộc
    dropoffLat: number;
    dropoffLng: number;
    receiverAddress: string;
    onOpenGoogleMaps: (lat: number, lng: number, address: string) => void;
}

export function RouteDirectionsCard({ distanceKm, dropoffLat, dropoffLng, receiverAddress, onOpenGoogleMaps }: Props) {
    return (
        <Card className="rounded-[28px] border-border/60 shadow-sm bg-card p-6 space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Navigation className="size-4 text-primary" /> Hướng dẫn di chuyển
            </h3>
            <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-accent/50 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground block">Khoảng cách tổng:</span>
                    <strong className="text-foreground text-sm font-black">{distanceKm || 0} km</strong>
                </div>
            </div>
            <Button
                onClick={() => onOpenGoogleMaps(dropoffLat, dropoffLng, receiverAddress)}
                className="w-full h-12 rounded-2xl bg-[#710105] hover:bg-[#580104] text-white font-bold text-xs shadow-md cursor-pointer transition-all gap-2"
            >
                <Navigation className="size-4" /> Mở Google Maps điều hướng
            </Button>
        </Card>
    );
}