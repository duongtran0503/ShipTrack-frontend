import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Route, Truck } from "lucide-react";

interface Props {
    senderAddress: string;
    receiverAddress: string;
    driverCurrentLat?: number;
    driverCurrentLng?: number;
}

export function LiveMapCard({ senderAddress, receiverAddress, driverCurrentLat, driverCurrentLng }: Props) {
    return (
        <Card className="rounded-[28px] border-border/60 shadow-sm bg-card overflow-hidden">
            <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <Route className="size-5 text-primary" />
                    <span>Bản đồ lộ trình OSRM (Live GPS Tracking)</span>
                </CardTitle>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-500 animate-ping" /> GPS Connected
                </span>
            </CardHeader>
            <CardContent className="p-4">
                {/* Khung chứa bản đồ Leaflet / OSRM mô phỏng */}
                <div className="w-full h-[450px] rounded-[22px] bg-muted/40 border border-border/40 relative flex flex-col items-center justify-center overflow-hidden p-6 text-center">
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#710105_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

                    <div className="absolute top-6 left-6 bg-card/90 backdrop-blur-md p-4 rounded-2xl shadow-md border border-border/60 text-left space-y-1 max-w-xs">
                        <div className="text-[10px] uppercase font-bold text-muted-foreground">Điểm lấy (Sender):</div>
                        <p className="text-xs font-bold text-foreground truncate">{senderAddress}</p>
                        <div className="text-[10px] uppercase font-bold text-muted-foreground pt-1">Điểm giao (Receiver):</div>
                        <p className="text-xs font-bold text-foreground truncate">{receiverAddress}</p>
                    </div>

                    <div className="size-20 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-lg border-2 border-primary animate-bounce z-10">
                        <Truck className="size-10" />
                    </div>
                    <p className="text-sm font-bold text-foreground mt-4 z-10">Vị trí thực tế của tài xế đang được truyền real-time</p>
                    <p className="text-xs text-muted-foreground mt-1 max-w-md z-10">
                        Tọa độ hiện tại: ({driverCurrentLat?.toFixed(4)}, {driverCurrentLng?.toFixed(4)}) — Tuyến đường OSRM đã tối ưu hóa.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}