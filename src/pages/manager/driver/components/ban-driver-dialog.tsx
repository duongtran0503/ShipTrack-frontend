// src/pages/manager/driver/components/ban-driver-dialog.tsx
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import type { DriverResponse } from "@/pages/manager/driver/hooks/use-admin-drivers";
import { Loader2, Lock, Unlock } from "lucide-react";

interface Props {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    driver: DriverResponse | null;
    reason: string;
    setReason: (val: string) => void;
    onConfirm: () => void;
    isPending: boolean;
}

export function BanDriverDialog({ isOpen, onOpenChange, driver, reason, setReason, onConfirm, isPending }: Props) {
    if (!driver) return null;
    const isBanning = driver.IsActive;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="rounded-[24px] max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-base font-bold flex items-center gap-2">
                        {isBanning ? (
                            <><Lock className="size-5 text-destructive" /><span>Khóa tài khoản: {driver.Name}</span></>
                        ) : (
                            <><Unlock className="size-5 text-emerald-600" /><span>Mở khóa tài xế: {driver.Name}</span></>
                        )}
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        {isBanning
                            ? "Vui lòng nhập lý do cụ thể khi vô hiệu hóa tài khoản tài xế này khỏi hệ thống điều phối đơn hàng."
                            : "Hành động này sẽ khôi phục quyền truy cập và cho phép tài xế nhận đơn trở lại."}
                    </DialogDescription>
                </DialogHeader>

                {isBanning && (
                    <div className="space-y-2 py-2">
                        <label className="text-xs font-bold text-foreground">
                            Lý do khóa <span className="text-destructive">*</span>
                        </label>
                        <Textarea
                            placeholder="Nhập lý do vi phạm (VD: Hủy chuyến liên tục, gian lận cước phí...)"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="rounded-xl text-xs min-h-[90px] border-border/60 resize-none"
                        />
                    </div>
                )}

                <DialogFooter className="gap-2 pt-2 sm:justify-end">
                    <Button
                        variant="outline"
                        onClick={() => {
                            onOpenChange(false);
                            setReason("");
                        }}
                        className="rounded-xl text-xs font-bold"
                    >
                        Hủy bỏ
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={isPending}
                        className={`rounded-xl text-xs font-bold ${isBanning ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" : "bg-emerald-600 hover:bg-emerald-700 text-white"}`}
                    >
                        {isPending ? <Loader2 className="size-4 animate-spin mr-1.5" /> : null}
                        {isBanning ? "Xác nhận khóa" : "Xác nhận mở khóa"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}