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
import { useTimeoutSettings } from "@/pages/manager/settings/hooks/use-timeout-settings";
import { AlertCircle, Clock, Hourglass, Loader2, Save, ShieldAlert, Timer } from "lucide-react";

export default function AdminTimeoutSettingsPage() {
    const {
        formData,
        isLoading,
        handleFormChange,
        handleSaveClick,
        isConfirmModalOpen,
        setIsConfirmModalOpen,
        handleConfirmSave,
        isPending,
    } = useTimeoutSettings();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải cấu hình thời gian timeout...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black text-foreground flex items-center gap-2">
                        <Clock className="size-6 text-primary" />
                        <span>Cấu hình thời gian Timeout hệ thống</span>
                    </h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Thiết lập thời gian chờ tài xế nhận đơn, giới hạn thời gian giao hàng và cơ chế tự động hủy đơn hàng quá hạn.
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
                        <Timer className="size-4 text-primary" /> Thông số thời gian giới hạn
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* 1. Thời gian chờ tài xế nhận đơn */}
                        <div className="space-y-2">
                            <label className="font-bold text-foreground block flex items-center gap-1.5">
                                <Hourglass className="size-4 text-primary" /> Chờ tài xế nhận đơn (phút) <span className="text-destructive">*</span>
                            </label>
                            <Input
                                type="number"
                                value={formData.driverAcceptTimeoutMinutes}
                                onChange={(e) => handleFormChange("driverAcceptTimeoutMinutes", Number(e.target.value))}
                                className="rounded-xl text-xs border-border/60 font-semibold h-10"
                            />
                            <p className="text-[10px] text-muted-foreground">Thời gian tài xế có để xác nhận đơn trước khi chuyển người khác.</p>
                        </div>

                        {/* 2. Thời gian giao hàng tối đa */}
                        <div className="space-y-2">
                            <label className="font-bold text-foreground block flex items-center gap-1.5">
                                <Clock className="size-4 text-primary" /> Thời gian giao hàng tối đa (giờ) <span className="text-destructive">*</span>
                            </label>
                            <Input
                                type="number"
                                value={formData.maxDeliveryTimeHours}
                                onChange={(e) => handleFormChange("maxDeliveryTimeHours", Number(e.target.value))}
                                className="rounded-xl text-xs border-border/60 font-semibold h-10"
                            />
                            <p className="text-[10px] text-muted-foreground">Cảnh báo hoặc báo cáo đơn quá hạn nếu vượt quá thời gian này.</p>
                        </div>

                        {/* 3. Tự động hủy đơn chưa có tài xế */}
                        <div className="space-y-2">
                            <label className="font-bold text-foreground block flex items-center gap-1.5">
                                <ShieldAlert className="size-4 text-destructive" /> Tự động hủy đơn không có tài xế (phút) <span className="text-destructive">*</span>
                            </label>
                            <Input
                                type="number"
                                value={formData.autoCancelUnassignedMinutes}
                                onChange={(e) => handleFormChange("autoCancelUnassignedMinutes", Number(e.target.value))}
                                className="rounded-xl text-xs border-border/60 font-semibold h-10"
                            />
                            <p className="text-[10px] text-muted-foreground">Thời gian hệ thống cố gắng tìm tài xế trước khi hủy đơn tự động.</p>
                        </div>

                        {/* 4. Tài xế mất tín hiệu offline */}
                        <div className="space-y-2">
                            <label className="font-bold text-foreground block flex items-center gap-1.5">
                                <Timer className="size-4 text-amber-500" /> Timeout mất tín hiệu tài xế (phút) <span className="text-destructive">*</span>
                            </label>
                            <Input
                                type="number"
                                value={formData.driverInactiveTimeoutMinutes}
                                onChange={(e) => handleFormChange("driverInactiveTimeoutMinutes", Number(e.target.value))}
                                className="rounded-xl text-xs border-border/60 font-semibold h-10"
                            />
                            <p className="text-[10px] text-muted-foreground">Chuyển trạng thái tài xế sang Offline nếu mất kết nối GPS.</p>
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
                            <span>Xác nhận thay đổi thời gian timeout</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Việc thay đổi các mốc thời gian timeout sẽ ảnh hưởng trực tiếp đến chu trình xử lý đơn hàng tự động của toàn bộ hệ thống.
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