import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ActiveOrderDetailItem } from "@/pages/driver/order/active/hooks/use-active-order-detail";
import { MapPin, Navigation, Phone, User } from "lucide-react";

interface Props {
    order: ActiveOrderDetailItem;
}

export function RouteInfoCard({ order }: Props) {
    return (
        <Card className="rounded-[28px] border-border/60 shadow-sm bg-card">
            <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <Navigation className="size-5 text-primary" />
                    <span>Lộ trình chi tiết chuyến đi</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-muted/40 border border-border/40 space-y-2">
                        <div className="flex items-center gap-2 text-destructive font-bold text-xs uppercase">
                            <MapPin className="size-4" /> Điểm lấy hàng
                        </div>
                        <p className="text-xs font-semibold text-foreground">{order.senderAddress}</p>
                        <div className="text-[11px] text-muted-foreground pt-1 flex items-center gap-2">
                            <User className="size-3.5 text-primary" /> Người gửi: <strong className="text-foreground">{order.senderName || "Chưa cập nhật"}</strong>
                        </div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-2">
                            <Phone className="size-3.5 text-primary" /> SĐT: <strong className="text-foreground">{order.senderPhone || "Không có"}</strong>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-muted/40 border border-border/40 space-y-2">
                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase">
                            <Navigation className="size-4" /> Điểm giao hàng
                        </div>
                        <p className="text-xs font-semibold text-foreground">{order.receiverAddress}</p>
                        <div className="text-[11px] text-muted-foreground pt-1 flex items-center gap-2">
                            <User className="size-3.5 text-primary" /> Người nhận: <strong className="text-foreground">{order.receiverName}</strong>
                        </div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-2">
                            <Phone className="size-3.5 text-primary" /> SĐT: <strong className="text-foreground">{order.receiverPhone}</strong>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-border/40 text-xs">
                    <div className="p-3 rounded-xl bg-accent/50 text-center">
                        <span className="text-muted-foreground block text-[10px] uppercase font-bold">Khoảng cách</span>
                        <strong className="text-foreground text-sm">{order.distanceKm || 0} km</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-accent/50 text-center">
                        <span className="text-muted-foreground block text-[10px] uppercase font-bold">Trọng lượng</span>
                        <strong className="text-foreground text-sm">{order.weightKg || 1} kg</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-accent/50 text-center">
                        <span className="text-muted-foreground block text-[10px] uppercase font-bold">Phương tiện</span>
                        <strong className="text-foreground text-sm">{order.vehicleType || "MOTORBIKE"}</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-accent/50 text-center">
                        <span className="text-muted-foreground block text-[10px] uppercase font-bold">Dịch vụ</span>
                        <strong className="text-foreground text-sm">{order.serviceType || "STANDARD"}</strong>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}