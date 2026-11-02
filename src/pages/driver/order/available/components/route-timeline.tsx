import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Navigation } from "lucide-react";

interface Props {
    pickupAddress: string;
    dropoffAddress: string;
    pickupTime: string;
    distanceKm: number;
    estimatedMinutes: number;
}

export function RouteTimeline({
    pickupAddress,
    dropoffAddress,
    pickupTime,
    distanceKm,
    estimatedMinutes,
}: Props) {
    return (
        <Card className="rounded-[24px] border-border/50 shadow-sm bg-card">
            <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <Navigation className="size-5 text-primary" />
                    <span>Lộ trình di chuyển</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                    <div className="space-y-1 relative">
                        <span className="absolute -left-6 top-1 size-3 rounded-full bg-destructive ring-4 ring-destructive/20" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Điểm lấy hàng</span>
                        <p className="text-xs font-bold text-foreground">{pickupAddress}</p>
                        <span className="text-[11px] text-amber-600 font-medium block">Thời gian yêu cầu: {pickupTime}</span>
                    </div>

                    <div className="space-y-1 relative">
                        <span className="absolute -left-6 top-1 size-3 rounded-full bg-primary ring-4 ring-primary/20" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Điểm giao hàng</span>
                        <p className="text-xs font-bold text-foreground">{dropoffAddress}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/40 text-xs">
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/30">
                        <MapPin className="size-4 text-primary" />
                        <div>
                            <span className="text-muted-foreground block text-[10px]">Khoảng cách</span>
                            <strong className="text-foreground">{distanceKm} km</strong>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/30">
                        <Clock className="size-4 text-amber-500" />
                        <div>
                            <span className="text-muted-foreground block text-[10px]">Thời gian dự kiến</span>
                            <strong className="text-foreground">{estimatedMinutes} phút</strong>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}