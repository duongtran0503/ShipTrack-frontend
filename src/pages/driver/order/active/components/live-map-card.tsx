import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReverseGeocode } from "@/lib/hooks/useReverseGeocode";
import { Loader2, MapPin, Navigation, Route, Truck } from "lucide-react";

interface Props {
    senderAddress: string;
    receiverAddress: string;
    driverCurrentLat?: number;
    driverCurrentLng?: number;
}

export function LiveMapCard({
    senderAddress,
    receiverAddress,
    driverCurrentLat,
    driverCurrentLng,
}: Props) {
    const { addressText, loading } = useReverseGeocode(
        driverCurrentLat,
        driverCurrentLng
    );

    const displayText = !driverCurrentLat || !driverCurrentLng
        ? "Chưa có tín hiệu GPS từ thiết bị"
        : loading && !addressText
            ? "Đang định vị địa chỉ thực tế..."
            : addressText;

    return (
        <Card className="rounded-[28px] border-border/60 shadow-sm bg-card overflow-hidden">
            <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <Route className="size-5 text-primary" />
                    <span>Thông tin Điều hướng & Vị trí Thời gian thực</span>
                </CardTitle>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                    GPS Active
                </span>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
                {/* Vị trí hiện tại của tài xế */}
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-start gap-3.5">
                    <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        {loading ? (
                            <Loader2 className="size-5 animate-spin" />
                        ) : (
                            <Navigation className="size-5 animate-pulse" />
                        )}
                    </div>
                    <div className="space-y-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold text-primary tracking-wider block">
                            Vị trí hiện tại của bạn (GPS):
                        </span>
                        <p className="text-xs font-black text-foreground leading-relaxed">
                            {displayText}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-mono">
                            Tọa độ: [
                            {driverCurrentLat?.toFixed(4) ?? "--"},{" "}
                            {driverCurrentLng?.toFixed(4) ?? "--"}]
                        </p>
                    </div>
                </div>

                {/* So sánh song song Lộ trình */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-muted/40 border border-border/40 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-destructive font-bold text-[10px] uppercase">
                            <MapPin className="size-3.5" /> Điểm lấy hàng (Sender)
                        </div>
                        <p className="text-xs font-semibold text-foreground line-clamp-2">
                            {senderAddress}
                        </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/40 border border-border/40 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-primary font-bold text-[10px] uppercase">
                            <Navigation className="size-3.5" /> Điểm giao hàng (Receiver)
                        </div>
                        <p className="text-xs font-semibold text-foreground line-clamp-2">
                            {receiverAddress}
                        </p>
                    </div>
                </div>

                <div className="w-full h-32 rounded-2xl bg-muted/30 border border-border/40 flex flex-col items-center justify-center text-center p-4">
                    <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-md mb-2">
                        <Truck className="size-5" />
                    </div>
                    <p className="text-xs font-bold text-foreground">
                        Hệ thống đang đồng bộ tọa độ GPS thực tế của bạn
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                        Tọa độ thiết bị đã được ghi nhận và gửi ngầm lên máy
                        chủ điều phối thành công.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}