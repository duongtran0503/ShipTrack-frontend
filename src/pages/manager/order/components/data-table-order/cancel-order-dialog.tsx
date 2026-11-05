import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";

interface Props {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    reason: string;
    setReason: (val: string) => void;
    onConfirm: () => void;
}

export function CancelOrderDialog({ isOpen, onOpenChange, reason, setReason, onConfirm }: Props) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="rounded-[24px] max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-base font-bold flex items-center gap-2 text-destructive">
                        <AlertCircle className="size-5" /> Xác nhận hủy đơn hàng
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        Hành động này sẽ can thiệp hủy đơn hàng khỏi hệ thống. Vui lòng nhập lý do cụ thể.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 py-2">
                    <label className="text-xs font-bold text-foreground">Lý do hủy đơn *</label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Nhập lý do chi tiết..."
                        className="w-full h-24 p-3 rounded-xl border border-border bg-card text-xs focus:ring-primary outline-none resize-none"
                    />
                </div>

                <DialogFooter className="gap-2 sm:justify-end">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl text-xs font-bold">
                        Hủy bỏ
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={!reason.trim()}
                        className="rounded-xl text-xs font-bold"
                    >
                        Xác nhận hủy đơn
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}