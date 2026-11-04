import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ActiveOrderSummary } from "@/pages/driver/dashboard/hooks/use-driver-dashboard";
import { ArrowRight, CheckCircle2, Clock, Eye, MapPin, Package, PackageCheck, ShieldAlert, Truck, XCircle } from "lucide-react";
import { useNavigate } from "react-router";

interface Props {
    orders: ActiveOrderSummary[];
    isLoading: boolean;
    goToActiveOrders: () => void;
    goToAvailableOrders: () => void;
    goToOrderDetail: (id: string | number) => void;
}

// Hàm cấu hình huy hiệu trạng thái đồng bộ với hệ thống
const getOrderStatusConfig = (status: string) => {
    switch (status) {
        case "DRIVER_ASSIGNED":
            return {
                label: "Đã phân tài xế",
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

export function ActiveOrdersTable({
    orders,
    isLoading,
    goToActiveOrders,
    goToAvailableOrders,
    goToOrderDetail,
}: Props) {
    const navigate = useNavigate();

    return (
        <Card className="rounded-[24px] border-border/50 shadow-sm bg-card overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-4 pt-6 px-6 border-b border-border/40">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <Package className="size-5 text-primary" />
                    <span>Đơn hàng đang thực hiện</span>
                </CardTitle>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={goToActiveOrders}
                    className="text-xs font-bold text-primary hover:bg-accent cursor-pointer"
                >
                    Xem tất cả <ArrowRight className="size-3.5 ml-1" />
                </Button>
            </CardHeader>

            <CardContent className="p-6">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-10 space-y-3">
                        <div className="size-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-xs text-muted-foreground animate-pulse">
                            Đang tải danh sách đơn...
                        </p>
                    </div>
                ) : orders.length > 0 ? (
                    <div className="space-y-3">
                        {orders.map((order) => {
                            const statusConfig = getOrderStatusConfig(order.status);

                            return (
                                <div
                                    key={order.id}
                                    onClick={() => goToOrderDetail(order.id)}
                                    className="p-4 rounded-2xl border border-border/60 hover:border-primary/50 bg-muted/10 hover:bg-card hover:shadow-sm transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                                >
                                    {/* Cột trái: Thông tin đơn */}
                                    <div className="space-y-2 flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                                                #{order.trackingCode}
                                            </span>
                                            <Badge
                                                variant="outline"
                                                className={`text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 ${statusConfig.className}`}
                                            >
                                                {statusConfig.icon}
                                                {statusConfig.label}
                                            </Badge>
                                        </div>
                                        <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                                            <MapPin className="size-4 text-destructive shrink-0" />
                                            <span className="line-clamp-1 leading-relaxed" title={`${order.pickupAddress} → ${order.dropoffAddress}`}>
                                                {order.pickupAddress} <span className="mx-1 text-foreground/30">→</span> {order.dropoffAddress}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Cột phải: Giá và Thao tác */}
                                    <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-border/40">
                                        <div className="flex flex-col md:items-end">
                                            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Phí giao</span>
                                            <span className="text-base font-black text-shiptrack-price leading-none">
                                                {order.shippingFee?.toLocaleString("vi-VN")} đ
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/driver/orders/${order.id}`);
                                                }}
                                                className="h-9 rounded-xl text-xs font-bold hidden sm:flex border-border/60 hover:bg-muted"
                                            >
                                                <Eye className="size-4 mr-1.5 text-slate-500" /> Chi tiết
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="h-9 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold px-5 shadow-sm group-hover:shadow-md transition-all"
                                            >
                                                Xử lý
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12 space-y-4">
                        <div className="size-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto text-muted-foreground/40">
                            <Package className="size-8" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-foreground">Chưa có đơn hàng nào</p>
                            <p className="text-xs text-muted-foreground">Bạn chưa nhận đơn hàng nào đang giao.</p>
                        </div>
                        <Button
                            onClick={goToAvailableOrders}
                            size="sm"
                            className="rounded-full bg-primary text-white font-bold text-xs px-6 h-10 shadow-md"
                        >
                            Nhận đơn mới ngay
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}