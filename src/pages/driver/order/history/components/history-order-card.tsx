import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Clock, MapPin, Navigation, PackageCheck, ShieldAlert, Star, Truck, XCircle } from "lucide-react";
import type { HistoryOrderItem } from "../hooks/use-driver-history";

interface Props {
    order: HistoryOrderItem;
    onClick: () => void;
}

// Hàm cấu hình giao diện (Màu sắc, Icon, Nhãn tiếng Việt) theo từng trạng thái đơn hàng
const getOrderStatusConfig = (status: string) => {
    switch (status) {
        case "DRIVER_ASSIGNED":
            return {
                label: "Đã tiếp nhận đơn và chờ vận chuyển",
                className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
                icon: <Truck className="size-3 text-blue-500" />,
            };
        case "PICKED_UP":
            return {
                label: "Đã lấy hàng",
                className: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
                icon: <PackageCheck className="size-3 text-indigo-500" />,
            };
        case "DELIVERING":
            return {
                label: "Đang giao hàng",
                className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
                icon: <Clock className="size-3 text-amber-500 animate-pulse" />,
            };
        case "COMPLETED":
            return {
                label: "Đã hoàn thành",
                className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
                icon: <CheckCircle2 className="size-3 text-emerald-500" />,
            };
        case "CANCELLED":
            return {
                label: "Đã hủy",
                className: "bg-muted text-muted-foreground border-border",
                icon: <XCircle className="size-3 text-muted-foreground" />,
            };
        case "FAILED":
            return {
                label: "Thất bại",
                className: "bg-destructive/10 text-destructive border-destructive/20",
                icon: <ShieldAlert className="size-3 text-destructive" />,
            };
        default:
            return {
                label: status,
                className: "bg-secondary text-secondary-foreground border-transparent",
                icon: <Clock className="size-3" />,
            };
    }
};

export function HistoryOrderCard({ order, onClick }: Props) {
    const statusConfig = getOrderStatusConfig(order.status);

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
                            className={`text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${statusConfig.className}`}
                        >
                            {statusConfig.icon}
                            {statusConfig.label}
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

                {/* Hiển thị lý do nếu đơn hàng bị FAILED hoặc CANCELLED có kèm lý do */}
                {(order.status === "FAILED" || order.status === "CANCELLED") && order.failureReason && (
                    <div className="p-3 rounded-xl bg-destructive/10 text-destructive text-xs font-semibold flex items-center gap-2">
                        <AlertCircle className="size-4 shrink-0" />
                        <span>Lý do: {order.failureReason}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}