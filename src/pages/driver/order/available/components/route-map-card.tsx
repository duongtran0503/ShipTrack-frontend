import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


interface RouteMapCardProps {
    pickupLat: number;
    pickupLng: number;
    dropoffLat: number;
    dropoffLng: number;
    pickupAddress: string;
    dropoffAddress: string;
}

export function RouteMapCard({
    pickupAddress,
    dropoffAddress,
}: RouteMapCardProps) {
    return (
        <Card className="rounded-[24px] border-border/50 shadow-sm bg-card overflow-hidden">
            <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <span>Bản đồ lộ trình & Định vị</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                {/* Bạn có thể thay thế bằng OrderMapView thực tế */}
                <div className="w-full h-72 rounded-[20px] bg-muted/50 flex flex-col items-center justify-center text-center p-6 space-y-2 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#710105_1px,transparent_1px)] [background-size:16px_16px]" />
                    <p className="text-xs font-bold text-foreground">Hệ thống bản đồ định tuyến ShipTrack</p>
                    <p className="text-[11px] text-muted-foreground max-w-xs">
                        Điểm lấy: <strong className="text-foreground">{pickupAddress}</strong>
                    </p>
                    <p className="text-[11px] text-muted-foreground max-w-xs">
                        Điểm giao: <strong className="text-foreground">{dropoffAddress}</strong>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}