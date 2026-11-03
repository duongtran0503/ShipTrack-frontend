import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Clock, MapPin, Navigation, Star } from "lucide-react";
import type { HistoryOrderItem } from "../hooks/use-driver-history";

interface Props {
    order: HistoryOrderItem;
    onClick: () => void;
}

export function HistoryOrderCard({ order, onClick }: Props) {
    return (
        <Card
            onClick={onClick}
            className="rounded-[24px] border-border/60 hover:border-primary/50 shadow-sm transition-all bg-card cursor-pointer group"
        >
            <CardContent className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs font-mono font-bold text-primary bg-accent hover:bg-accent/80 px-3 py-1 rounded-full">
                            #{order.trackingCode}
                        </Badge>
                        <Badge
                            variant="outline"
                            className={`text-[10px] font-bold px-3 py-1 rounded-full border-transparent ${order.status === "COMPLETED"
                                ? "bg-emerald-500/10 text-emerald-600"
                                : "bg-destructive/10 text-destructive"
                                }`}
                        >
                            {order.status === "COMPLETED" ? "✅ Hoàn thành" : "❌ Thất bại"}
                        </Badge>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <Clock className="size-3.5" /> {order.completedAt || order.createdAt}
                    </span>
                </div>

                <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2.5">
                        <MapPin className="size-4 text-destructive shrink-0 mt-0.5" />
                        <p className="font-semibold text-foreground truncate">{order.senderAddress}</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <Navigation className="size-4 text-primary shrink-0 mt-0.5" />
                        <p className="font-semibold text-foreground truncate">{order.receiverAddress}</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border/40 text-xs">
                    <div className="flex items-center gap-4 text-muted-foreground font-semibold">
                        <span>📏 <strong className="text-foreground">{order.distanceKm} km</strong></span>
                        <span>⏱️ <strong className="text-foreground">35 phút</strong></span>
                        <span>💰 <strong className="text-foreground">{(order.shippingFee || 0).toLocaleString("vi-VN")} VNĐ</strong></span>
                        {order.reviewRating && (
                            <span className="flex items-center gap-1 text-amber-500 font-bold">
                                <Star className="size-3.5 fill-amber-500" /> {order.reviewRating}.0
                            </span>
                        )}
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs font-bold text-primary group-hover:underline p-0 h-auto"
                    >
                        Xem chi tiết →
                    </Button>
                </div>

                {order.status === "FAILED" && order.failureReason && (
                    <div className="p-3 rounded-xl bg-destructive/10 text-destructive text-xs font-semibold flex items-center gap-2">
                        <AlertCircle className="size-4 shrink-0" />
                        <span>Lý do: {order.failureReason}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}