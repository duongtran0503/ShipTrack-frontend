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
import { Loader2, ShieldAlert } from "lucide-react";
import type { VehicleApprovalItem } from "../hooks/use-vehicle-approvals";

interface Props {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    vehicle: VehicleApprovalItem | null;
    reason: string;
    setReason: (val: string) => void;
    onConfirm: () => void;
    isRejecting: boolean;
}

export function RejectVehicleDialog({ isOpen, onOpenChange, vehicle, reason, setReason, onConfirm, isRejecting }: Props) {
    if (!vehicle) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="rounded-[24px] max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-base font-bold flex items-center gap-2 text-destructive">
                        <ShieldAlert className="size-5" />
                        <span>Từ chối phương tiện: {vehicle.licensePlate}</span>
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        Vui lòng nhập lý do từ chối. Hệ thống sẽ gửi thông báo phản hồi này cho tài xế để cập nhật lại thông tin xe.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-2 py-2">
                    <label className="text-xs font-bold text-foreground">
                        Lý do từ chối <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                        placeholder="Nhập lý do (VD: Ảnh biển số không rõ nét, sai thông tin tải trọng...)"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="rounded-xl text-xs min-h-[100px] border-border/60 resize-none"
                    />
                </div>

                <DialogFooter className="gap-2 sm:justify-end">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="rounded-xl text-xs font-bold"
                    >
                        Hủy bỏ
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={isRejecting}
                        className="rounded-xl text-xs font-bold bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    >
                        {isRejecting ? <Loader2 className="size-4 animate-spin mr-1" /> : null}
                        Xác nhận từ chối
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}