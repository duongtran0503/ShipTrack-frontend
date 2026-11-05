import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";
import { useAdminVehicleDetail } from "@/pages/manager/vehicles/hooks/use-admin-vehicle-detail";
import {
    ArrowLeft,
    CheckCircle2,
    Clock,
    FileText,
    Loader2,
    ShieldAlert,
    Truck,
    User,
    XCircle,
} from "lucide-react";

export default function AdminVehicleDetailPage() {
    const {
        vehicle,
        isLoading,
        handleBack,
        goToDriverDetail,
        isRejectModalOpen,
        setIsRejectModalOpen,
        rejectReason,
        setRejectReason,
        handleConfirmApprove,
        handleConfirmReject,
        isApproving,
        isRejecting,
    } = useAdminVehicleDetail();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải thông tin chi tiết phương tiện...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-12">
            {/* 1. Header & Điều hướng */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={handleBack} className="rounded-xl size-10 p-0 border-border/60 hover:bg-accent">
                        <ArrowLeft className="size-4" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-black text-foreground">Chi tiết xe: {vehicle.licensePlate}</h1>
                            {vehicle.isVerified ? (
                                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]">Đã kiểm duyệt</Badge>
                            ) : (
                                <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px]">Chờ phê duyệt</Badge>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Loại phương tiện: <span className="font-semibold text-foreground">{vehicle.vehicleType}</span> • Đăng ký: {vehicle.registeredAt}
                        </p>
                    </div>
                </div>

                {/* Nút thao tác duyệt / từ chối nếu xe đang chờ duyệt */}
                {!vehicle.isVerified && (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="destructive"
                            onClick={() => setIsRejectModalOpen(true)}
                            className="rounded-xl text-xs font-bold h-10 px-4"
                        >
                            <XCircle className="size-4 mr-1.5" /> Từ chối
                        </Button>
                        <Button
                            onClick={handleConfirmApprove}
                            disabled={isApproving}
                            className="rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white h-10 px-4"
                        >
                            {isApproving ? <Loader2 className="size-4 animate-spin mr-1.5" /> : <CheckCircle2 className="size-4 mr-1.5" />}
                            Phê duyệt xe
                        </Button>
                    </div>
                )}
            </div>

            {/* 2. Thông tin xe & Tài xế sở hữu */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Thông số kỹ thuật xe */}
                <Card className="rounded-[24px] border-border/60 shadow-sm bg-card md:col-span-2">
                    <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                        <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                            <Truck className="size-4 text-primary" /> Thông số kỹ thuật phương tiện
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 grid grid-cols-2 gap-4 text-xs">
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Biển số xe</span>
                            <span className="font-mono font-black text-foreground text-base">{vehicle.licensePlate}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Loại phương tiện</span>
                            <span className="font-bold text-foreground text-sm">{vehicle.vehicleType}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Hãng & Dòng xe (Model)</span>
                            <span className="font-semibold text-foreground">{vehicle.brand} - {vehicle.model || "Standard"}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Màu sắc</span>
                            <span className="font-semibold text-foreground">{vehicle.color || "Không rõ"}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Tải trọng tối đa cho phép</span>
                            <span className="font-bold text-foreground">{vehicle.maxWeightKg} kg</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Trạng thái Active chính</span>
                            <span className="font-bold text-foreground">{vehicle.isDefault ? "Đang là xe hoạt động chính" : "Xe phụ"}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Thông tin tài xế sở hữu */}
                <Card className="rounded-[24px] border-border/60 shadow-sm bg-card">
                    <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                        <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                            <User className="size-4 text-primary" /> Tài xế sở hữu
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4 text-xs">
                        <div className="flex items-center gap-3">
                            <img
                                src={vehicle.driverAvatar || "https://github.com/shadcn.png"}
                                alt={vehicle.driverName}
                                className="size-10 rounded-full object-cover border border-border"
                            />
                            <div>
                                <p className="font-bold text-foreground">{vehicle.driverName}</p>
                                <p className="text-[10px] text-muted-foreground">{vehicle.driverPhone}</p>
                            </div>
                        </div>

                        <div>
                            <span className="text-muted-foreground block text-[11px]">Địa chỉ liên hệ</span>
                            <span className="font-medium text-foreground">{vehicle.ownerAddress || "TP.HCM"}</span>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => goToDriverDetail(vehicle.driverId)}
                            className="w-full rounded-xl text-xs font-bold border-border/60 hover:bg-accent"
                        >
                            Xem hồ sơ tài xế chi tiết
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* 3. Hình ảnh xe, biển số & giấy tờ xe */}
            <Card className="rounded-[24px] border-border/60 shadow-sm bg-card">
                <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                    <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                        <FileText className="size-4 text-primary" /> Hình ảnh thực tế & Giấy tờ kiểm duyệt
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="border border-border/60 rounded-2xl overflow-hidden bg-muted/20">
                            <p className="text-[11px] font-semibold text-muted-foreground p-2.5 bg-muted/50 border-b border-border/40 text-center">Ảnh tổng quan xe</p>
                            <img src={vehicle.vehicleImageUrl} alt="Ảnh xe" className="w-full h-44 object-cover" />
                        </div>
                        <div className="border border-border/60 rounded-2xl overflow-hidden bg-muted/20">
                            <p className="text-[11px] font-semibold text-muted-foreground p-2.5 bg-muted/50 border-b border-border/40 text-center">Ảnh chụp biển số xe</p>
                            <img src={vehicle.licensePlateImageUrl} alt="Ảnh biển số" className="w-full h-44 object-cover" />
                        </div>
                        <div className="border border-border/60 rounded-2xl overflow-hidden bg-muted/20">
                            <p className="text-[11px] font-semibold text-muted-foreground p-2.5 bg-muted/50 border-b border-border/40 text-center">Giấy đăng ký xe (Cavet)</p>
                            <img src={vehicle.registrationPaperUrl} alt="Giấy đăng ký xe" className="w-full h-44 object-cover" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 4. Lịch sử thay đổi / Hoạt động */}
            <Card className="rounded-[24px] border-border/60 shadow-sm bg-card">
                <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                    <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                        <Clock className="size-4 text-primary" /> Lịch sử hoạt động & Kiểm duyệt
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    {vehicle.historyLogs && vehicle.historyLogs.length > 0 ? (
                        <div className="space-y-3">
                            {vehicle.historyLogs.map((log) => (
                                <div key={log.id} className="p-3.5 rounded-2xl border border-border/50 bg-muted/20 flex items-center justify-between gap-4 text-xs">
                                    <div>
                                        <p className="font-semibold text-foreground">{log.action}</p>
                                        <p className="text-[10px] text-muted-foreground mt-0.5">Thực hiện bởi: {log.performedBy}</p>
                                    </div>
                                    <span className="text-[11px] text-muted-foreground font-mono">{log.timestamp}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-xs text-muted-foreground text-center py-4">Chưa có lịch sử ghi nhận.</p>
                    )}
                </CardContent>
            </Card>

            {/* Modal Từ chối phương tiện */}
            <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
                <DialogContent className="rounded-[24px] max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-base font-bold flex items-center gap-2 text-destructive">
                            <ShieldAlert className="size-5" />
                            <span>Từ chối phương tiện: {vehicle.licensePlate}</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Vui lòng nhập lý do từ chối để hệ thống gửi thông báo phản hồi cho tài xế.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-2 py-2">
                        <label className="text-xs font-bold text-foreground">
                            Lý do từ chối <span className="text-destructive">*</span>
                        </label>
                        <Textarea
                            placeholder="Nhập lý do chi tiết..."
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="rounded-xl text-xs min-h-[100px] border-border/60"
                        />
                    </div>

                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setIsRejectModalOpen(false)} className="rounded-xl text-xs font-bold">
                            Hủy bỏ
                        </Button>
                        <Button
                            onClick={handleConfirmReject}
                            disabled={isRejecting}
                            className="rounded-xl text-xs font-bold bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                        >
                            {isRejecting ? <Loader2 className="size-4 animate-spin mr-1" /> : null}
                            Xác nhận từ chối
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}