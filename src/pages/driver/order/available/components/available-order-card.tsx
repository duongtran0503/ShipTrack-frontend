import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { AvailableOrderItem } from "@/pages/driver/order/available/hooks/use-available-orders";
import { AlertTriangle, CheckCircle2, Clock, Loader2, MapPin, Navigation, Truck } from "lucide-react";
import { useState } from "react";

interface Props {
    order: AvailableOrderItem;
    isAccepting: boolean;
    onAccept: (id: number) => void;
    onViewDetail: (id: number) => void;
}

export function AvailableOrderCard({ order, isAccepting, onAccept, onViewDetail }: Props) {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const handleConfirm = () => {
        onAccept(order.id);
        setShowConfirmDialog(false);
    };

    return (
        <>
            <Card className="rounded-[24px] border-border/60 hover:border-primary/50 shadow-sm transition-all bg-card flex flex-col justify-between group hover:shadow-md">
                <CardContent className="p-6 space-y-4">

                    {/* Header: Mã vận đơn & Cước phí */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs font-bold text-primary bg-accent hover:bg-accent/80 px-3 py-1 rounded-full">
                                #{order.trackingCode}
                            </Badge>
                            <Badge variant="outline" className="text-[10px] text-muted-foreground bg-muted/50 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                                <Truck className="size-3" /> {order.serviceType} ({order.vehicleType})
                            </Badge>
                        </div>
                        <span className="text-base font-black text-[#710105]">
                            {order.shippingFee?.toLocaleString("vi-VN")} đ
                        </span>
                    </div>

                    {/* Địa chỉ Lấy hàng & Giao hàng */}
                    <div className="space-y-2.5 text-xs">
                        <div className="flex items-start gap-2.5">
                            <MapPin className="size-4 text-destructive shrink-0 mt-0.5" />
                            <div className="min-w-0">
                                <span className="text-muted-foreground block text-[10px] uppercase font-bold">Lấy hàng:</span>
                                <p className="font-semibold text-foreground truncate">{order.pickupAddress}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                            <Navigation className="size-4 text-primary shrink-0 mt-0.5" />
                            <div className="min-w-0">
                                <span className="text-muted-foreground block text-[10px] uppercase font-bold">Giao hàng:</span>
                                <p className="font-semibold text-foreground truncate">{order.dropoffAddress}</p>
                            </div>
                        </div>
                    </div>

                    {/* Thống kê khoảng cách & Thời gian */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/40 text-xs font-semibold text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="size-3.5 text-primary" />
                            <span>Cách bạn: <strong className="text-foreground">{order.distanceFromDriverKm} km</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="size-3.5 text-amber-500" />
                            <span>Quãng đường: <strong className="text-foreground">{order.tripDistanceKm} km</strong></span>
                        </div>
                    </div>

                    {/* Các nút thao tác */}
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
                            onClick={() => setShowConfirmDialog(true)} // 👈 Mở Dialog xác nhận riêng cho card này
                            className="h-10 rounded-xl bg-[#710105] hover:bg-[#580104] text-white font-bold text-xs px-6 shadow-md cursor-pointer"
                        >
                            Nhận đơn ngay
                        </Button>
                    </div>

                </CardContent>
            </Card>

            {/* Dialog xác nhận nhận đơn độc lập cho từng đơn hàng */}
            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <DialogContent className="max-w-md rounded-[28px] p-6 bg-card border border-border shadow-2xl">
                    <DialogHeader className="space-y-3">
                        <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                            <AlertTriangle className="size-6" />
                        </div>
                        <DialogTitle className="text-center text-lg font-bold text-foreground">
                            Xác nhận nhận đơn hàng?
                        </DialogTitle>
                        <DialogDescription className="text-center text-xs text-muted-foreground space-y-1">
                            <span>Bạn có chắc chắn muốn nhận đơn hàng mã:</span>
                            <span className="block font-mono font-bold text-foreground text-sm mt-1">
                                #{order.trackingCode}
                            </span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="p-3.5 my-2 rounded-2xl bg-muted/40 border border-border/40 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Phí vận chuyển:</span>
                            <span className="font-bold text-primary font-mono">
                                {order.shippingFee?.toLocaleString("vi-VN")} đ
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Khoảng cách từ bạn:</span>
                            <span className="font-semibold text-foreground">
                                {order.distanceFromDriverKm} km
                            </span>
                        </div>
                    </div>

                    <DialogFooter className="flex items-center justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowConfirmDialog(false)}
                            disabled={isAccepting}
                            className="rounded-xl text-xs font-bold h-11 px-5 cursor-pointer"
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            type="button"
                            disabled={isAccepting}
                            onClick={handleConfirm}
                            className="rounded-xl bg-[#710105] hover:bg-[#580104] text-white font-bold text-xs h-11 px-6 shadow-md cursor-pointer gap-2"
                        >
                            {isAccepting && <Loader2 className="size-4 animate-spin" />}
                            <CheckCircle2 className="size-4" /> Xác nhận nhận đơn
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}