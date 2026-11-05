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
import { useAdminDriverDetail } from "@/pages/manager/driver/hooks/use-admin-driver-detail";
import {
    AlertTriangle,
    ArrowLeft,
    Clock,
    DollarSign,
    FileText,
    Loader2,
    Lock,
    MapPin,
    Star,
    Truck,
    Unlock,
    User
} from "lucide-react";

export default function AdminDriverDetailPage() {
    const {
        driver,
        isLoading,
        handleBack,
        goToMap,
        isBanModalOpen,
        setIsBanModalOpen,
        banReason,
        setBanReason,
        handleToggleDriverStatus,
        isPending,
        licenseWarning,
    } = useAdminDriverDetail();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải chi tiết hồ sơ tài xế...
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
                    <div className="flex items-center gap-3">
                        <img
                            src={driver.AvatarUrl || "https://github.com/shadcn.png"}
                            alt={driver.Name}
                            className="size-12 rounded-full object-cover border border-border"
                        />
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-black text-foreground">Hồ sơ tài xế: {driver.Name}</h1>
                                <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px]">Tài xế</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                ID hệ thống: #{driver.Id} • Tham gia từ: {driver.CreatedAt}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Các nút hành động quản trị */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={goToMap}
                        className="rounded-xl text-xs font-bold border-border/60 hover:bg-accent h-10"
                    >
                        Xem trên bản đồ
                    </Button>
                    <Button
                        variant={driver.IsActive ? "destructive" : "default"}
                        onClick={() => setIsBanModalOpen(true)}
                        className={`rounded-xl text-xs font-bold h-10 ${!driver.IsActive ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}`}
                    >
                        {driver.IsActive ? <Lock className="size-3.5 mr-1.5" /> : <Unlock className="size-3.5 mr-1.5" />}
                        {driver.IsActive ? "Khóa tài xế" : "Mở khóa tài xế"}
                    </Button>
                </div>
            </div>

            {/* 1.1 CẢNH BÁO BẰNG LÁI SẮP HẾT HẠN (QUAN TRỌNG) */}
            {licenseWarning.status !== "NORMAL" && (
                <div
                    className={`p-4 rounded-[20px] border flex items-start gap-3 shadow-sm ${licenseWarning.status === "EXPIRED"
                        ? "bg-destructive/10 border-destructive/30 text-destructive"
                        : "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400"
                        }`}
                >
                    <AlertTriangle className="size-5 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider">Cảnh báo giấy phép lái xe</h4>
                        <p className="text-xs font-semibold mt-0.5">{licenseWarning.message}</p>
                    </div>
                </div>
            )}

            {/* 2. Thẻ thông tin cá nhân & Bằng lái */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Thông tin cơ bản */}
                <Card className="rounded-[24px] border-border/60 shadow-sm bg-card">
                    <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                        <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                            <User className="size-4 text-primary" /> Thông tin cá nhân
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-3 text-xs">
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Họ và tên</span>
                            <span className="font-bold text-foreground text-sm">{driver.Name}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Email liên hệ</span>
                            <span className="font-semibold text-foreground">{driver.Email}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Số điện thoại</span>
                            <span className="font-bold text-foreground">{driver.Phone}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Địa chỉ cư trú</span>
                            <span className="font-semibold text-foreground">{driver.Address}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Thông tin Bằng lái (GPLX) */}
                <Card className="rounded-[24px] border-border/60 shadow-sm bg-card">
                    <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                        <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                            <FileText className="size-4 text-primary" /> Giấy phép lái xe (GPLX)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-3 text-xs">
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Số bằng lái</span>
                            <span className="font-bold font-mono text-foreground text-sm">{driver.LicenseNumber || "---"}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Ngày hết hạn</span>
                            <span className={`font-bold ${licenseWarning.status !== "NORMAL" ? "text-destructive" : "text-foreground"}`}>
                                {driver.LicenseExpiryDate || "---"}
                            </span>
                        </div>
                        <div className="pt-1">
                            <span className="text-muted-foreground block text-[11px] mb-1.5">Ảnh chụp GPLX</span>
                            <div className="grid grid-cols-2 gap-2">
                                <img src={driver.FrontLicenseImageUrl} alt="GPLX Trước" className="rounded-lg h-20 w-full object-cover border border-border" />
                                <img src={driver.BackLicenseImageUrl} alt="GPLX Sau" className="rounded-lg h-20 w-full object-cover border border-border" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Thống kê thu nhập & Đánh giá */}
                <Card className="rounded-[24px] border-border/60 shadow-sm bg-card">
                    <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                        <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                            <DollarSign className="size-4 text-primary" /> Hiệu suất & Thu nhập
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-3 text-xs">
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Tổng thu nhập tích lũy</span>
                            <span className="font-black text-shiptrack-price text-base">{(driver.TotalIncome || 0).toLocaleString("vi-VN")} đ</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Đánh giá trung bình</span>
                            <div className="flex items-center gap-1 font-bold text-foreground mt-0.5">
                                <Star className="size-4 text-amber-500 fill-amber-500" />
                                <span className="text-sm">{driver.RatingAvg} / 5.0</span>
                            </div>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Tổng số chuyến hoàn thành</span>
                            <span className="font-bold text-foreground">{driver.TotalTrips} chuyến</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 3. Phương tiện hiện tại & Khu vực phục vụ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Danh sách phương tiện (DriverVehicle) */}
                <Card className="rounded-[24px] border-border/60 shadow-sm bg-card">
                    <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40">
                        <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                            <Truck className="size-5 text-primary" /> Phương tiện đăng ký ({driver.Vehicles?.length || 0})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-3">
                        {driver.Vehicles && driver.Vehicles.length > 0 ? (
                            driver.Vehicles.map((v) => (
                                <div key={v.id} className="p-4 rounded-2xl border border-border/50 bg-muted/20 flex items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-foreground text-xs">{v.brand}</span>
                                            {v.isDefault && <Badge className="text-[9px] px-1.5 py-0.2">Mặc định</Badge>}
                                        </div>
                                        <p className="text-[11px] text-muted-foreground mt-0.5">
                                            Loại: <span className="font-semibold text-foreground">{v.vehicleType}</span> • Tải trọng: {v.maxWeightKg} kg
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-mono text-xs font-bold bg-card px-2 py-1 rounded-lg border border-border">
                                            {v.licensePlate}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-muted-foreground text-center py-4">Chưa đăng ký phương tiện nào.</p>
                        )}
                    </CardContent>
                </Card>

                {/* Khu vực phục vụ (DriverServiceArea) */}
                <Card className="rounded-[24px] border-border/60 shadow-sm bg-card">
                    <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40">
                        <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                            <MapPin className="size-5 text-primary" /> Khu vực phục vụ hoạt động
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-3">
                        {driver.ServiceAreas && driver.ServiceAreas.length > 0 ? (
                            driver.ServiceAreas.map((area) => (
                                <div key={area.id} className="p-4 rounded-2xl border border-border/50 bg-muted/20 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2.5">
                                        <MapPin className="size-4 text-rose-500 shrink-0" />
                                        <div>
                                            <p className="font-bold text-foreground text-xs">{area.name}</p>
                                            <p className="text-[10px] text-muted-foreground">Bán kính hoạt động: {area.radiusKm} km</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]">Đang hoạt động</Badge>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-muted-foreground text-center py-4">Chưa thiết lập khu vực phục vụ.</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* 4. Lịch sử chuyến đi gần đây */}
            <Card className="rounded-[24px] border-border/60 shadow-sm bg-card overflow-hidden">
                <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40">
                    <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                        <Clock className="size-5 text-primary" /> Lịch sử chuyến đi vận chuyển gần đây
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    {driver.HistoryTrips && driver.HistoryTrips.length > 0 ? (
                        <div className="space-y-3">
                            {driver.HistoryTrips.map((trip) => (
                                <div key={trip.id} className="p-4 rounded-2xl border border-border/50 bg-muted/20 flex items-center justify-between gap-4">
                                    <div>
                                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">#{trip.trackingCode}</span>
                                        <p className="text-xs text-foreground font-medium mt-1">Khách hàng: {trip.customerName}</p>
                                        <p className="text-[10px] text-muted-foreground mt-0.5">Hoàn thành: {trip.completedAt}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-black text-shiptrack-price">+{trip.income.toLocaleString("vi-VN")} đ</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-xs text-muted-foreground">Tài xế chưa thực hiện chuyến đi nào.</div>
                    )}
                </CardContent>
            </Card>

            {/* Modal Khóa / Mở khóa tài xế */}
            <Dialog open={isBanModalOpen} onOpenChange={setIsBanModalOpen}>
                <DialogContent className="rounded-[24px] max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-base font-bold flex items-center gap-2">
                            {driver.IsActive ? (
                                <>
                                    <Lock className="size-5 text-destructive" />
                                    <span>Xác nhận khóa tài xế: {driver.Name}</span>
                                </>
                            ) : (
                                <>
                                    <Unlock className="size-5 text-emerald-600" />
                                    <span>Xác nhận mở khóa tài xế: {driver.Name}</span>
                                </>
                            )}
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            {driver.IsActive
                                ? "Vui lòng nhập lý do cụ thể khi vô hiệu hóa tài khoản tài xế này."
                                : "Khôi phục quyền truy cập hệ thống và cho phép tài xế nhận đơn trở lại."}
                        </DialogDescription>
                    </DialogHeader>

                    {driver.IsActive && (
                        <div className="space-y-2 py-2">
                            <label className="text-xs font-bold text-foreground">
                                Lý do khóa <span className="text-destructive">*</span>
                            </label>
                            <Textarea
                                placeholder="Nhập lý do chi tiết..."
                                value={banReason}
                                onChange={(e) => setBanReason(e.target.value)}
                                className="rounded-xl text-xs min-h-[90px] border-border/60"
                            />
                        </div>
                    )}

                    <DialogFooter className="gap-2 pt-2">
                        <Button variant="outline" onClick={() => setIsBanModalOpen(false)} className="rounded-xl text-xs font-bold">
                            Hủy bỏ
                        </Button>
                        <Button
                            onClick={handleToggleDriverStatus}
                            disabled={isPending}
                            className={`rounded-xl text-xs font-bold ${driver.IsActive ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" : "bg-emerald-600 hover:bg-emerald-700 text-white"}`}
                        >
                            {isPending ? <Loader2 className="size-4 animate-spin mr-1" /> : null}
                            {driver.IsActive ? "Xác nhận khóa" : "Xác nhận mở khóa"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}