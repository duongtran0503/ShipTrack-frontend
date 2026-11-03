import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, MapPin, Navigation, Phone } from "lucide-react";
import type { ActiveOrderItem, ActiveOrderStatus } from "../hooks/use-active-orders";

interface Props {
    order: ActiveOrderItem;
    isUpdating: boolean;
    onViewDetail: (id: string | number) => void;
    onOpenRouteMap: (id: string | number, e: React.MouseEvent) => void;
    onUpdateStatus: (id: string | number, status: ActiveOrderStatus) => void;
}

export function ActiveOrderCard({ order, isUpdating, onViewDetail, onOpenRouteMap, onUpdateStatus }: Props) {
    return (
        <Card
            onClick={() => onViewDetail(order.id)}
            className="rounded-[24px] border-border/60 hover:border-primary/50 shadow-sm transition-all bg-card cursor-pointer flex flex-col justify-between group hover:shadow-md"
        >
            <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs font-bold text-primary bg-accent hover:bg-accent/80 px-3 py-1 rounded-full">
                            #{order.trackingCode}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] text-amber-600 bg-amber-500/10 border-amber-500/20 px-2.5 py-0.5 rounded-full font-bold">
                            {order.driverStatusLabel || "Đang xử lý"}
                        </Badge>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <Clock className="size-3.5" /> {order.acceptedAt || "Đang giao"}
                    </span>
                </div>

                <div className="space-y-2.5 text-xs">
                    <div className="flex items-start gap-2.5">
                        <MapPin className="size-4 text-destructive shrink-0 mt-0.5" />
                        <div className="min-w-0">
                            <span className="text-muted-foreground block text-[10px] uppercase font-bold">Lấy hàng (Sender):</span>
                            <p className="font-semibold text-foreground truncate">{order.senderAddress}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                        <Navigation className="size-4 text-primary shrink-0 mt-0.5" />
                        <div className="min-w-0">
                            <span className="text-muted-foreground block text-[10px] uppercase font-bold">Giao hàng (Receiver):</span>
                            <p className="font-semibold text-foreground truncate">{order.receiverAddress}</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/40 text-xs">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{order.receiverName}</span>
                        <a
                            href={`tel:${order.receiverPhone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
                            title="Gọi điện cho người nhận"
                        >
                            <Phone className="size-3.5" />
                        </a>
                    </div>
                    <span className="text-base font-black text-shiptrack-price">
                        {order.shippingFee.toLocaleString("vi-VN")} đ
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => onOpenRouteMap(order.id, e)}
                        className="w-full sm:w-auto h-10 rounded-xl text-xs font-bold gap-1.5 border-border/60"
                    >
                        <span>Bản đồ lộ trình</span>
                    </Button>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        {order.status === "PICKED_UP" && (
                            <>
                                <Button
                                    size="sm"
                                    disabled={isUpdating}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onUpdateStatus(order.id, "PICKED_UP");
                                    }}
                                    className="h-10 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs px-3 sm:px-4"
                                >
                                    Đã lấy hàng
                                </Button>
                                <Button
                                    size="sm"
                                    disabled={isUpdating}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onUpdateStatus(order.id, "DELIVERING");
                                    }}
                                    className="h-10 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3 sm:px-4"
                                >
                                    Bắt đầu giao
                                </Button>
                            </>
                        )}
                        <Button
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onViewDetail(order.id);
                            }}
                            className="h-10 rounded-xl bg-[#710105] hover:bg-[#580104] text-white font-bold text-xs px-4 cursor-pointer"
                        >
                            Chi tiết <ArrowRight className="size-3.5 ml-1" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}