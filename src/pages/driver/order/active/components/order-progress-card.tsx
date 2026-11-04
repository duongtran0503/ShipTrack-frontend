import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ActiveOrderDetailItem } from "@/pages/driver/order/active/hooks/use-active-order-detail";
import type { ActiveOrderStatus } from "@/pages/driver/order/active/hooks/use-active-orders";
import { useOrderProgressGPS } from "@/pages/driver/order/active/hooks/use-order-progress-gps";
import { Clock, MapPin, Navigation, ShieldCheck, Truck } from "lucide-react";

interface Props {
    order: ActiveOrderDetailItem;
    currentStatus: ActiveOrderStatus | string;
    onPickup: () => void;
    onDeliver: () => void;
    onComplete: () => void;
    onFail: () => void;
}

export function OrderProgressCard({ order, currentStatus, onPickup, onDeliver, onComplete, onFail }: Props) {
    const isDelivering = currentStatus === "DELIVERING";

    // Sử dụng hook chuyên biệt để lấy GPS thực & Reverse Geocode VietMap v4
    const {
        driverCurrentAddress,
        isLocating,
        estimatedDistanceKm,
        estimatedMinutes,
    } = useOrderProgressGPS({
        pickupLat: order.pickupLat,
        pickupLng: order.pickupLng,
        tripDistanceKm: order.distanceKm,
    });

    return (
        <Card className="rounded-[28px] border-border/60 shadow-sm bg-card overflow-hidden mt-1">
            <CardHeader className="pb-4 pt-2 px-6 border-b border-border/40 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <ShieldCheck className="size-5 text-primary" />
                    <span>Tiến độ thực hiện đơn hàng</span>
                </CardTitle>
                {isDelivering && (
                    <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border border-amber-500/20 gap-1.5 px-3 py-1 rounded-full font-bold text-xs animate-pulse">
                        <span className="size-2 rounded-full bg-amber-500 animate-ping" />
                        Đang di chuyển giao hàng
                    </Badge>
                )}
            </CardHeader>

            <CardContent className="p-6 space-y-6">

                {/* 🚀 HIỂN THỊ THÔNG TIN CHI TIẾT KHI ĐANG Ở TRẠNG THÁI GIAO HÀNG (DELIVERING) */}
                {isDelivering && (
                    <div className="p-5 rounded-[22px] bg-gradient-to-br from-primary/5 via-accent/30 to-background border border-primary/20 space-y-4 shadow-inner">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="relative size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                    <Truck className="size-5 animate-bounce" />
                                    <span className="absolute -top-1 -right-1 size-3 rounded-full bg-emerald-500 ring-2 ring-card animate-pulse" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-foreground">Hành trình chuyến đi thời gian thực</h4>
                                    <p className="text-[10px] text-muted-foreground">Đồng bộ GPS thiết bị & VietMap v4</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-1 rounded-lg bg-background border border-border/50 text-[11px] font-black text-primary flex items-center gap-1 shadow-sm">
                                    <Clock className="size-3 text-amber-500" /> ~{estimatedMinutes} phút
                                </span>
                                <span className="px-2.5 py-1 rounded-lg bg-background border border-border/50 text-[11px] font-black text-emerald-600 shadow-sm">
                                    {estimatedDistanceKm} km
                                </span>
                            </div>
                        </div>

                        {/* Vị trí hiện tại của tài xế */}
                        <div className="space-y-1.5 pt-1 border-t border-border/30">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                                <Navigation className="size-3 text-primary animate-spin" /> Vị trí hiện tại của tài xế:
                            </span>
                            <p className="text-xs font-black text-foreground bg-card/80 p-3 rounded-xl border border-border/40 shadow-sm leading-relaxed">
                                {isLocating ? "Đang quét định vị GPS..." : driverCurrentAddress}
                            </p>
                        </div>

                        {/* Vị trí nhận hàng (Pickup Address) */}
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                                <MapPin className="size-3 text-destructive" /> Vị trí nhận hàng gốc (Pickup):
                            </span>
                            <p className="text-xs font-semibold text-muted-foreground line-clamp-1 pl-4">
                                {order.senderAddress}
                            </p>
                        </div>

                        {/* Vị trí nhận hàng (droff Address) */}
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                                <MapPin className="size-3 text-destructive" /> Vị trí nhận giao hàng:
                            </span>
                            <p className="text-xs font-semibold text-muted-foreground line-clamp-1 pl-4">
                                {order.dropoffAddress}
                            </p>
                        </div>
                    </div>
                )}

                {/* Timeline các bước tiến độ */}
                <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                    {/* Bước 1: DRIVER_ASSIGNED */}
                    <div className="space-y-2 relative">
                        <span className={`absolute -left-6 top-1 size-3 rounded-full ring-4 ${currentStatus !== "PENDING" && currentStatus !== "SEARCHING_DRIVER"
                            ? "bg-primary ring-primary/20"
                            : "bg-muted ring-muted/20"
                            }`} />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">1. Đã nhận đơn (`DRIVER_ASSIGNED`)</span>
                        <p className="text-xs font-bold text-foreground">{order.senderAddress}</p>
                        {currentStatus === "DRIVER_ASSIGNED" && (
                            <div className="pt-2">
                                <Button
                                    size="sm"
                                    onClick={onPickup}
                                    className="rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs h-10 px-6 cursor-pointer shadow-md"
                                >
                                    Xác nhận đã lấy hàng (`PICKED_UP`)
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Bước 2: PICKED_UP */}
                    <div className="space-y-2 relative">
                        <span className={`absolute -left-6 top-1 size-3 rounded-full ring-4 ${["DELIVERING", "COMPLETED", "FAILED"].includes(currentStatus)
                            ? "bg-primary ring-primary/20"
                            : "bg-muted ring-muted/20"
                            }`} />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">2. Đã lấy hàng (`PICKED_UP`)</span>
                        <p className="text-xs font-semibold text-muted-foreground">Sẵn sàng xuất phát giao đến khách hàng.</p>
                        {currentStatus === "PICKED_UP" && (
                            <div className="pt-2">
                                <Button
                                    size="sm"
                                    onClick={onDeliver}
                                    className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs h-10 px-6 cursor-pointer shadow-md"
                                >
                                    Bắt đầu giao hàng (`DELIVERING`)
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Bước 3: DELIVERING */}
                    <div className="space-y-2 relative">
                        <span className={`absolute -left-6 top-1 size-3 rounded-full ring-4 ${["COMPLETED", "FAILED"].includes(currentStatus)
                            ? "bg-primary ring-primary/20"
                            : currentStatus === "DELIVERING"
                                ? "bg-amber-500 ring-amber-500/20 animate-pulse"
                                : "bg-muted ring-muted/20"
                            }`} />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">3. Đang giao hàng (`DELIVERING`)</span>
                        <p className="text-xs font-bold text-foreground">{order.receiverAddress}</p>
                        {currentStatus === "DELIVERING" && (
                            <div className="pt-2 flex flex-wrap gap-3">
                                <Button
                                    size="sm"
                                    onClick={onComplete}
                                    className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-10 px-6 cursor-pointer shadow-md"
                                >
                                    Đã giao thành công (`COMPLETED`)
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={onFail}
                                    className="rounded-xl font-bold text-xs h-10 px-6 cursor-pointer shadow-md"
                                >
                                    Giao thất bại (`FAILED`)
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Bước 4: Kết thúc */}
                    <div className="space-y-2 relative">
                        <span className={`absolute -left-6 top-1 size-3 rounded-full ring-4 ${currentStatus === "COMPLETED"
                            ? "bg-emerald-600 ring-emerald-600/20"
                            : currentStatus === "FAILED"
                                ? "bg-destructive ring-destructive/20"
                                : "bg-muted ring-muted/20"
                            }`} />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">4. Trạng thái kết thúc</span>
                        <p className="text-xs font-bold text-foreground">
                            {currentStatus === "COMPLETED" && "✅ Đơn hàng đã giao hoàn tất thành công."}
                            {currentStatus === "FAILED" && `❌ Giao thất bại: ${order.failureReason || "Đã ghi nhận lý do"}`}
                            {!["COMPLETED", "FAILED"].includes(currentStatus) && "⏳ Đang chờ hoàn tất chuyến đi."}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}