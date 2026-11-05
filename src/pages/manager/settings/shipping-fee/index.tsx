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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useShippingFeeSettings } from "@/pages/manager/settings/hooks/use-shipping-fee-settings";
import {
    AlertCircle,
    Calculator,
    DollarSign,
    Flame,
    Loader2,
    Moon,
    Navigation,
    Save,
    Sliders,
    Weight,
} from "lucide-react";

export default function AdminShippingFeeSettingsPage() {
    const {
        formData,
        isLoading,
        handleFormChange,
        handleSaveClick,
        isConfirmModalOpen,
        setIsConfirmModalOpen,
        handleConfirmSave,
        isPending,
        previewDistance,
        setPreviewDistance,
        previewWeight,
        setPreviewWeight,
        isPeakHour,
        setIsPeakHour,
        isNightTime,
        setIsNightTime,
        previewTotalFee,
    } = useShippingFeeSettings();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải bảng giá và cấu hình phí vận chuyển...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black text-foreground flex items-center gap-2">
                        <DollarSign className="size-6 text-primary" />
                        <span>Cấu hình phí vận chuyển</span>
                    </h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Thiết lập cước phí mở cửa, đơn giá mỗi km và các khoản phụ phí giờ cao điểm, cồng kềnh.
                    </p>
                </div>

                <Button
                    onClick={handleSaveClick}
                    className="rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-5 shadow-sm"
                >
                    <Save className="size-4 mr-1.5" /> Lưu cấu hình
                </Button>
            </div>

            {/* Grid 2 Cột: Form cài đặt & Bảng Preview tính cước */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form thiết lập cước phí */}
                <Card className="rounded-[24px] border-border/60 shadow-sm bg-card lg:col-span-2">
                    <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                        <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                            <Sliders className="size-4 text-primary" /> Mức phí cơ bản & Phụ phí
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6 text-xs">
                        {/* 1. Mức phí cơ bản & Km mở cửa */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="font-bold text-foreground block">
                                    Phí cơ bản mở cửa (VNĐ) <span className="text-destructive">*</span>
                                </label>
                                <Input
                                    type="number"
                                    value={formData.baseFee}
                                    onChange={(e) => handleFormChange("baseFee", Number(e.target.value))}
                                    className="rounded-xl text-xs border-border/60 font-semibold"
                                />
                                <p className="text-[10px] text-muted-foreground">Áp dụng cho số km cơ bản ban đầu.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="font-bold text-foreground block">
                                    Số km cơ bản ban đầu (km) <span className="text-destructive">*</span>
                                </label>
                                <Input
                                    type="number"
                                    value={formData.baseDistanceKm}
                                    onChange={(e) => handleFormChange("baseDistanceKm", Number(e.target.value))}
                                    className="rounded-xl text-xs border-border/60 font-semibold"
                                />
                                <p className="text-[10px] text-muted-foreground">Khoảng cách tính cước mở cửa.</p>
                            </div>
                        </div>

                        {/* 2. Đơn giá mỗi km tiếp theo */}
                        <div className="space-y-2">
                            <label className="font-bold text-foreground block">
                                Đơn giá mỗi km tiếp theo (VNĐ/km) <span className="text-destructive">*</span>
                            </label>
                            <Input
                                type="number"
                                value={formData.pricePerKm}
                                onChange={(e) => handleFormChange("pricePerKm", Number(e.target.value))}
                                className="rounded-xl text-xs border-border/60 font-semibold"
                            />
                        </div>

                        {/* 3. Phụ phí */}
                        <div className="pt-2 border-t border-border/40 space-y-4">
                            <h4 className="font-bold text-foreground uppercase text-[11px] tracking-wider text-muted-foreground">
                                Các khoản phụ phí hệ thống
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="font-bold text-foreground block flex items-center gap-1">
                                        <Flame className="size-3.5 text-amber-500" /> Phụ phí cao điểm (%)
                                    </label>
                                    <Input
                                        type="number"
                                        value={formData.peakHourSurcharge}
                                        onChange={(e) => handleFormChange("peakHourSurcharge", Number(e.target.value))}
                                        className="rounded-xl text-xs border-border/60"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="font-bold text-foreground block flex items-center gap-1">
                                        <Moon className="size-3.5 text-indigo-500" /> Phụ phí đêm (VNĐ)
                                    </label>
                                    <Input
                                        type="number"
                                        value={formData.nightSurcharge}
                                        onChange={(e) => handleFormChange("nightSurcharge", Number(e.target.value))}
                                        className="rounded-xl text-xs border-border/60"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="font-bold text-foreground block flex items-center gap-1">
                                        <Weight className="size-3.5 text-rose-500" /> Vượt trọng lượng (VNĐ/kg)
                                    </label>
                                    <Input
                                        type="number"
                                        value={formData.heavyWeightSurcharge}
                                        onChange={(e) => handleFormChange("heavyWeightSurcharge", Number(e.target.value))}
                                        className="rounded-xl text-xs border-border/60"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Bảng Preview tính phí tự động */}
                <Card className="rounded-[24px] border-border/60 shadow-sm bg-card flex flex-col justify-between">
                    <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                        <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                            <Calculator className="size-4 text-primary" /> Bảng tính thử cước phí (Preview)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4 text-xs">
                        <div className="space-y-2">
                            <label className="font-bold text-foreground flex items-center gap-1">
                                <Navigation className="size-3.5 text-primary" /> Quãng đường giả lập (km)
                            </label>
                            <Input
                                type="number"
                                value={previewDistance}
                                onChange={(e) => setPreviewDistance(Number(e.target.value))}
                                className="rounded-xl text-xs border-border/60"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="font-bold text-foreground flex items-center gap-1">
                                <Weight className="size-3.5 text-rose-500" /> Trọng lượng hàng hóa (kg)
                            </label>
                            <Input
                                type="number"
                                value={previewWeight}
                                onChange={(e) => setPreviewWeight(Number(e.target.value))}
                                className="rounded-xl text-xs border-border/60"
                            />
                        </div>

                        <div className="pt-2 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-foreground">Kích hoạt giờ cao điểm</span>
                                <Switch checked={isPeakHour} onCheckedChange={setIsPeakHour} />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-foreground">Kích hoạt phụ phí đêm</span>
                                <Switch checked={isNightTime} onCheckedChange={setIsNightTime} />
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 space-y-1 mt-4">
                            <span className="text-[11px] text-muted-foreground block">Tổng cước ước tính</span>
                            <span className="text-2xl font-black text-shiptrack-price">{previewTotalFee.toLocaleString("vi-VN")} đ</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Modal Xác nhận lưu cấu hình */}
            <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
                <DialogContent className="rounded-[24px] max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-base font-bold flex items-center gap-2">
                            <AlertCircle className="size-5 text-amber-500" />
                            <span>Xác nhận thay đổi cấu hình cước phí</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Các thay đổi về cước phí sẽ ảnh hưởng trực tiếp đến quy trình tính giá của khách hàng và thu nhập tài xế trên toàn hệ thống.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="gap-2 pt-2">
                        <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)} className="rounded-xl text-xs font-bold">
                            Hủy bỏ
                        </Button>
                        <Button
                            onClick={handleConfirmSave}
                            disabled={isPending}
                            className="rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                            {isPending ? <Loader2 className="size-4 animate-spin mr-1" /> : null}
                            Xác nhận áp dụng
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}