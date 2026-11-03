import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { OrderItem } from "@/services/order/type";
import { Clock, Loader2, MapPin, Navigation } from "lucide-react";

interface Props {
    order: OrderItem;
    isAccepting: boolean;
    onAccept: (id: string) => void;
    onViewDetail: (id: string) => void;
}

export function AvailableOrderCard({ order, isAccepting, onAccept, onViewDetail }: Props) {
    return (
        <Card className="rounded-[24px] border-border/60 hover:border-primary/50 shadow-sm transition-all bg-card flex flex-col justify-between group hover:shadow-md">
            <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs font-bold text-primary bg-accent hover:bg-accent/80 px-3 py-1 rounded-full">
                            #{order.trackingCode}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] text-muted-foreground bg-muted/50 px-2.5 py-0.5 rounded-full font-medium">
                            {order.packageName} ({order.weightKg} kg)
                        </Badge>
                    </div>
                    <span className="text-base font-black text-[#710105]">
                        {order.shippingFee.toLocaleString("vi-VN")} đ
                    </span>
                </div>

                <div className="space-y-2.5 text-xs">
                    <div className="flex items-start gap-2.5">
                        <MapPin className="size-4 text-destructive shrink-0 mt-0.5" />
                        <div className="min-w-0">
                            <span className="text-muted-foreground block text-[10px] uppercase font-bold">Lấy hàng:</span>
                            {/* Dùng chuẩn senderAddress từ OrderItem */}
                            <p className="font-semibold text-foreground truncate">{order.senderAddress}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                        <Navigation className="size-4 text-primary shrink-0 mt-0.5" />
                        <div className="min-w-0">
                            <span className="text-muted-foreground block text-[10px] uppercase font-bold">Giao hàng:</span>
                            {/* Dùng chuẩn receiverAddress từ OrderItem */}
                            <p className="font-semibold text-foreground truncate">{order.receiverAddress}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/40 text-xs font-semibold text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-primary" />
                        <span>Khoảng cách: <strong className="text-foreground">{order.distanceKm} km</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="size-3.5 text-amber-500" />
                        <span>Tiền thu hộ (COD): <strong className="text-foreground">{order.codAmount.toLocaleString("vi-VN")} đ</strong></span>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewDetail(order.id)}
                        className="h-10 rounded-xl text-xs font-bold px-4 cursor-pointer"
                    >
                        Xem chi tiết
                    </Button>
                    <Button
                        size="sm"
                        disabled={isAccepting}
                        onClick={() => onAccept(order.id)}
                        className="h-10 rounded-xl bg-[#710105] hover:bg-[#580104] text-white font-bold text-xs px-6 shadow-md animate-btn-gradient btn-shine cursor-pointer"
                    >
                        {isAccepting ? <Loader2 className="size-4 animate-spin mr-1.5" /> : null}
                        Nhận đơn ngay
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}