import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useAdminOrderDetail } from "@/pages/manager/order/hooks/use-admin-order-detail";
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle2,
    Clock,
    MapPin,
    Package,
    Phone,
    ShieldAlert,
    Truck,
    User,
    UserCheck,
    XCircle,
} from "lucide-react";

export default function AdminOrderDetailPage() {
    const {
        order,
        isLoading,
        availableDrivers,
        handleBack,
        isAssignModalOpen,
        setIsAssignModalOpen,
        isCancelModalOpen,
        setIsCancelModalOpen,
        cancelReason,
        setCancelReason,
        assignDriver,
        handleConfirmCancel,
    } = useAdminOrderDetail();

    const renderStatusBadge = (status: string) => {
        switch (status) {
            case "SEARCHING_DRIVER":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">
                        <Clock className="size-3.5" /> Đang tìm tài xế
                    </span>
                );
            case "DRIVER_ASSIGNED":
            case "PICKED_UP":
            case "DELIVERING":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20">
                        <Truck className="size-3.5" /> Đang vận chuyển
                    </span>
                );
            case "COMPLETED":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        <CheckCircle2 className="size-3.5" /> Đã hoàn thành
                    </span>
                );
            case "CANCELLED":
            case "FAILED":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-destructive/10 text-destructive border border-destructive/20">
                        <XCircle className="size-3.5" /> Đã hủy / Thất bại
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-muted text-muted-foreground">
                        {status}
                    </span>
                );
        }
    };

    if (isLoading) {
        return <div className="w-full py-20 text-center text-xs text-muted-foreground">Đang tải chi tiết đơn hàng...</div>;
    }

    return (
        <div className="w-full space-y-6 pb-12">
            {/* Header & Quay lại */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={handleBack} className="rounded-xl size-10 p-0 border-border/60 hover:bg-accent">
                        <ArrowLeft className="size-4" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-black text-foreground">Chi tiết đơn hàng #{order.trackingCode}</h1>
                            {renderStatusBadge(order.status)}
                        </div>
                        <p className="text-xs text-muted-foreground ">Khởi tạo lúc: {order.createdAt}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {order.status === "SEARCHING_DRIVER" && (
                        <Button onClick={() => setIsAssignModalOpen(true)} className="rounded-xl bg-primary text-primary-foreground text-xs font-bold px-4">
                            <UserCheck className="size-4 mr-1.5" /> Gán tài xế thủ công
                        </Button>
                    )}
                    {order.status !== "COMPLETED" && order.status !== "CANCELLED" && order.status !== "FAILED" && (
                        <Button variant="destructive" onClick={() => setIsCancelModalOpen(true)} className="rounded-xl text-xs font-bold px-4">
                            <XCircle className="size-4 mr-1.5" /> Hủy đơn hàng
                        </Button>
                    )}
                </div>
            </div>

            {/* Nội dung chính 2 cột */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                {/* Cột trái: Lộ trình, Bưu kiện & Timeline */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Lộ trình */}
                    <Card className="rounded-[24px] border-border/60 shadow-sm bg-card overflow-hidden">
                        <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40">
                            <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                                <MapPin className="size-5 text-primary" />
                                <span>Lộ trình vận chuyển</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 space-y-6 mt-0">
                            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.7 before:bg-border">
                                <div className="relative">
                                    <span className="absolute -left-6 top-1 size-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Điểm gửi hàng (Sender)</p>
                                    <p className="text-sm font-bold text-foreground mt-1">{order.senderAddress}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Liên hệ: <span className="font-semibold text-foreground">{order.senderName || "Không có"}</span> ({order.senderPhone || "N/A"})
                                    </p>
                                </div>

                                <div className="relative">
                                    <span className="absolute -left-6 top-1 size-3 rounded-full bg-primary ring-4 ring-primary/20" />
                                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Điểm nhận hàng (Receiver)</p>
                                    <p className="text-sm font-bold text-foreground mt-1">{order.receiverAddress}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Liên hệ: <span className="font-semibold text-foreground">{order.receiverName}</span> ({order.receiverPhone})
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/40 text-xs">
                                <div>
                                    <span className="text-muted-foreground block">Khoảng cách</span>
                                    <span className="font-bold text-foreground text-sm">{order.distanceKm} km</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground block">Loại xe</span>
                                    <span className="font-bold text-foreground text-sm">{order.vehicleType}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground block">Thanh toán</span>
                                    <span className="font-bold text-foreground text-sm">{order.paymentMethod}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bưu kiện */}
                    <Card className="rounded-[24px] border-border/60 shadow-sm bg-card overflow-hidden">
                        <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40">
                            <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                                <Package className="size-5 text-primary" />
                                <span>Thông tin bưu kiện</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                            <div className="p-4 rounded-2xl bg-muted/25 border border-border/50">
                                <span className="text-muted-foreground block">Tên hàng hóa</span>
                                <span className="font-bold text-foreground text-sm mt-1 block">{order.packageName}</span>
                            </div>
                            <div className="p-4 rounded-2xl bg-muted/25 border border-border/50">
                                <span className="text-muted-foreground block">Trọng lượng</span>
                                <span className="font-bold text-foreground text-sm mt-1 block">{order.weightKg} kg</span>
                            </div>
                            <div className="p-4 rounded-2xl bg-muted/25 border border-border/50">
                                <span className="text-muted-foreground block">Cồng kềnh / Tận cửa</span>
                                <span className="font-bold text-foreground text-sm mt-1 block">
                                    {order.isBulky ? "Có" : "Không"} / {order.isDoorDelivery ? "Có" : "Không"}
                                </span>
                            </div>
                            <div className="p-4 rounded-2xl bg-muted/25 border border-border/50">
                                <span className="text-muted-foreground block">Cước phí</span>
                                <span className="font-bold text-shiptrack-price text-sm mt-1 block">
                                    {order.shippingFee.toLocaleString("vi-VN")} đ
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timeline trạng thái */}
                    <Card className="rounded-[24px] border-border/60 shadow-sm bg-card overflow-hidden">
                        <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40">
                            <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                                <Clock className="size-5 text-primary" />
                                <span>Timeline trạng thái đơn hàng</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                {order.timeline?.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="size-2.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                        <div>
                                            <p className="text-xs font-bold text-foreground">{item.title}</p>
                                            <p className="text-[11px] text-muted-foreground">{item.description}</p>
                                            <span className="text-[10px] text-muted-foreground/80">{item.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Cột phải: Tài xế & Khách hàng */}
                <div className="space-y-6">
                    {/* Tài xế */}
                    <Card className="rounded-[24px] border-border/60 shadow-sm bg-card overflow-hidden">
                        <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40">
                            <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                                <Truck className="size-5 text-primary" />
                                <span>Tài xế nhận đơn</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            {order.driverName ? (
                                <div className="flex items-center gap-3">
                                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                        {order.driverName.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-foreground">{order.driverName}</p>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                            <Phone className="size-3" /> {order.driverPhone}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-6 text-xs text-muted-foreground space-y-3">
                                    <ShieldAlert className="size-8 text-amber-500 mx-auto" />
                                    <p>Chưa có tài xế tiếp nhận đơn hàng này.</p>
                                    {order.status === "SEARCHING_DRIVER" && (
                                        <Button
                                            size="default"
                                            onClick={() => setIsAssignModalOpen(true)}
                                            className="rounded-xl bg-primary py-5 text-primary-foreground text-xs font-bold w-full"
                                        >
                                            Gán tài xế thủ công ngay
                                        </Button>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Khách hàng */}
                    <Card className="rounded-[24px] border-border/60 shadow-sm bg-card overflow-hidden">
                        <CardHeader className="  px-6 border-b border-border/40">
                            <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                                <User className="size-5 text-primary" />
                                <span>Khách hàng tạo đơn</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 mt-0">
                            <div className="flex items-center gap-3">
                                <div className="size-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold text-lg">
                                    {order.senderName?.charAt(0) || "K"}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground">{order.senderName || "Khách lẻ"}</p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                        <Phone className="size-3" /> {order.senderPhone || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Modal Gán tài xế thủ công */}
            <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
                <DialogContent className="rounded-[24px] max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-base font-bold flex items-center gap-2 text-primary">
                            <UserCheck className="size-5" /> Gán tài xế thủ công
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Chọn tài xế đang hoạt động gần nhất để điều phối cho đơn hàng #{order.trackingCode}.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3 py-2 max-h-60 overflow-y-auto">
                        {availableDrivers.map((driver) => (
                            <div key={driver.id} className="p-3 rounded-2xl border border-border/60 bg-muted/20 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-bold text-foreground">{driver.fullName}</p>
                                    <p className="text-[11px] text-muted-foreground">{driver.vehicle} • Cách {driver.distance}</p>
                                </div>
                                <Button
                                    size="sm"
                                    onClick={() => assignDriver(driver.id)}
                                    className="h-8 rounded-xl bg-primary text-white text-xs font-bold px-3"
                                >
                                    Chọn gán
                                </Button>
                            </div>
                        ))}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAssignModalOpen(false)} className="rounded-xl text-xs font-bold w-full">
                            Đóng
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal Hủy đơn */}
            <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
                <DialogContent className="rounded-[24px] max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-base font-bold flex items-center gap-2 text-destructive">
                            <AlertCircle className="size-5" /> Xác nhận hủy đơn hàng
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Hành động này sẽ hủy đơn hàng khỏi hệ thống quản trị. Vui lòng nhập lý do.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3 py-2">
                        <label className="text-xs font-bold text-foreground">Lý do hủy đơn *</label>
                        <textarea
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            placeholder="Nhập lý do chi tiết..."
                            className="w-full h-24 p-3 rounded-xl border border-border bg-card text-xs focus:ring-primary outline-none"
                        />
                    </div>

                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setIsCancelModalOpen(false)} className="rounded-xl text-xs font-bold">
                            Hủy bỏ
                        </Button>
                        <Button variant="destructive" onClick={handleConfirmCancel} disabled={!cancelReason.trim()} className="rounded-xl text-xs font-bold">
                            Xác nhận hủy
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}