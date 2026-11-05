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
import { useRadiusSettings } from "@/pages/manager/settings/hooks/use-radius-settings";
import { AlertCircle, Clock, Loader2, MapPin, Radar, Save, Sliders, Users } from "lucide-react";

export default function AdminRadiusSettingsPage() {
    const {
        formData,
        isLoading,
        handleFormChange,
        handleSaveClick,
        isConfirmModalOpen,
        setIsConfirmModalOpen,
        handleConfirmSave,
        isPending,
    } = useRadiusSettings();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải cấu hình bán kính tìm tài xế...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black text-foreground flex items-center gap-2">
                        <Radar className="size-6 text-primary" />
                        <span>Cấu hình bán kính tìm tài xế</span>
                    </h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Thiết lập phạm vi quét GPS, giới hạn tài xế nhận đơn đồng thời và thời gian timeout điều phối tự động.
                    </p>
                </div>

                <Button
                    onClick={handleSaveClick}
                    className="rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-5 shadow-sm"
                >
                    <Save className="size-4 mr-1.5" /> Lưu cấu hình
                </Button>
            </div>

            {/* Form cấu hình chính */}
            <Card className="rounded-[24px] border-border/60 shadow-sm bg-card max-w-3xl">
                <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                    <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                        <Sliders className="size-4 text-primary" /> Thông số thuật toán ghép đơn & quét bán kính
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* 1. Bán kính tối đa */}
                        <div className="space-y-2">
                            <label className="font-bold text-foreground block flex items-center gap-1.5">
                                <MapPin className="size-4 text-primary" /> Bán kính tìm kiếm tối đa (km) <span className="text-destructive">*</span>
                            </label>
                            <Input
                                type="number"
                                value={formData.maxRadiusKm}
                                onChange={(e) => handleFormChange("maxRadiusKm", Number(e.target.value))}
                                className="rounded-xl text-xs border-border/60 font-semibold h-10"
                            />
                            <p className="text-[10px] text-muted-foreground">Khoảng cách xa nhất hệ thống quét tài xế quanh điểm lấy hàng.</p>
                        </div>

                        {/* 2. Số tài xế tối đa nhận thông báo */}
                        <div className="space-y-2">
                            <label className="font-bold text-foreground block flex items-center gap-1.5">
                                <Users className="size-4 text-primary" /> Số tài xế tối đa nhận thông báo <span className="text-destructive">*</span>
                            </label>
                            <Input
                                type="number"
                                value={formData.maxDriversToNotify}
                                onChange={(e) => handleFormChange("maxDriversToNotify", Number(e.target.value))}
                                className="rounded-xl text-xs border-border/60 font-semibold h-10"
                            />
                            <p className="text-[10px] text-muted-foreground">Số lượng tài xế gần nhất được bắn đơn đồng thời.</p>
                        </div>

                        {/* 3. Thời gian chờ nhận đơn */}
                        <div className="space-y-2">
                            <label className="font-bold text-foreground block flex items-center gap-1.5">
                                <Clock className="size-4 text-primary" /> Thời gian chờ tài xế xác nhận (giây) <span className="text-destructive">*</span>
                            </label>
                            <Input
                                type="number"
                                value={formData.dispatchWaitSeconds}
                                onChange={(e) => handleFormChange("dispatchWaitSeconds", Number(e.target.value))}
                                className="rounded-xl text-xs border-border/60 font-semibold h-10"
                            />
                            <p className="text-[10px] text-muted-foreground">Thời gian tối đa để tài xế bấm nhận đơn trước khi chuyển người khác.</p>
                        </div>

                        {/* 4. Bước nhảy mở rộng bán kính */}
                        <div className="space-y-2">
                            <label className="font-bold text-foreground block flex items-center gap-1.5">
                                <Radar className="size-4 text-primary" /> Bước nhảy mở rộng bán kính (km) <span className="text-destructive">*</span>
                            </label>
                            <Input
                                type="number"
                                value={formData.expandRadiusStepKm}
                                onChange={(e) => handleFormChange("expandRadiusStepKm", Number(e.target.value))}
                                className="rounded-xl text-xs border-border/60 font-semibold h-10"
                            />
                            <p className="text-[10px] text-muted-foreground">Cộng thêm bán kính nếu không có tài xế nào nhận vòng đầu.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Modal Xác nhận lưu */}
            <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
                <DialogContent className="rounded-[24px] max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-base font-bold flex items-center gap-2">
                            <AlertCircle className="size-5 text-amber-500" />
                            <span>Xác nhận thay đổi cấu hình bán kính</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Việc thay đổi bán kính quét và số lượng tài xế thông báo sẽ tác động trực tiếp đến tốc độ ghép đơn hàng trên toàn hệ thống.
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