import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { DriverApprovalResponse } from "@/pages/manager/driver/hooks/use-driver-approvals";
import { CheckCircle2, FileText, Loader2 } from "lucide-react";

interface Props {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    driver: DriverApprovalResponse | null;
    onApprove: (id: number) => void;
    onReject: (driver: DriverApprovalResponse) => void;
    isApproving: boolean;
}

export function ApprovalDetailDialog({ isOpen, onOpenChange, driver, onApprove, onReject, isApproving }: Props) {
    if (!driver) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="rounded-[24px] max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-base font-bold flex items-center gap-2">
                        <FileText className="size-5 text-primary" />
                        <span>Chi tiết hồ sơ: {driver.Name}</span>
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        Kiểm tra kỹ thông tin giấy phép lái xe và ảnh chụp thực tế trước khi phê duyệt.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 text-xs py-2">
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Họ và tên</span>
                            <span className="font-bold text-foreground text-sm">{driver.Name}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Số điện thoại</span>
                            <span className="font-bold text-foreground">{driver.Phone}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Email đăng nhập</span>
                            <span className="font-bold text-foreground">{driver.Email}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Số bằng lái</span>
                            <span className="font-bold text-foreground">{driver.LicenseNumber} (Hạn: {driver.LicenseExpiryDate})</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Phương tiện & Dòng xe</span>
                            <span className="font-bold text-foreground">{driver.VehicleBrand} - {driver.VehicleModel}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block text-[11px]">Biển số xe</span>
                            <span className="font-bold font-mono text-foreground">{driver.LicensePlate}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <span className="font-bold text-foreground block">Ảnh chụp Giấy phép lái xe (GPLX)</span>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border border-border/60 rounded-xl overflow-hidden bg-muted/20">
                                <p className="text-[10px] font-semibold text-muted-foreground p-2 bg-muted/50 border-b border-border/40 text-center">Mặt trước GPLX</p>
                                <img src={driver.FrontLicenseImageUrl} alt="GPLX Mặt trước" className="w-full h-36 object-cover" />
                            </div>
                            <div className="border border-border/60 rounded-xl overflow-hidden bg-muted/20">
                                <p className="text-[10px] font-semibold text-muted-foreground p-2 bg-muted/50 border-b border-border/40 text-center">Mặt sau GPLX</p>
                                <img src={driver.BackLicenseImageUrl} alt="GPLX Mặt sau" className="w-full h-36 object-cover" />
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2 pt-2 border-t border-border/40 sm:justify-end">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="rounded-xl text-xs font-bold"
                    >
                        Đóng
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => onReject(driver)}
                        className="rounded-xl text-xs font-bold"
                    >
                        Từ chối hồ sơ
                    </Button>
                    <Button
                        onClick={() => onApprove(driver.Id)}
                        disabled={isApproving}
                        className="rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                        {isApproving ? <Loader2 className="size-4 animate-spin mr-1" /> : <CheckCircle2 className="size-4 mr-1" />}
                        Phê duyệt ngay
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}