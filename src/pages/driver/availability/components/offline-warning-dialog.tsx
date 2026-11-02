import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface Props {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    activeOrdersCount: number;
    onConfirm: () => void;
}

export function OfflineWarningDialog({ isOpen, onOpenChange, activeOrdersCount, onConfirm }: Props) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md rounded-[24px] p-6 border-border/50 shadow-xl">
                <DialogHeader>
                    <div className="flex items-center gap-3 text-amber-500 mb-2">
                        <AlertTriangle className="size-6" />
                        <DialogTitle className="text-base font-bold text-foreground">
                            Bạn vẫn đang có đơn hàng chưa xong!
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-xs text-muted-foreground leading-relaxed pt-1">
                        Bạn đang có <strong className="text-foreground">{activeOrdersCount} đơn hàng</strong> chưa hoàn thành. Việc tắt trạng thái sẵn sàng có thể ảnh hưởng đến hiệu suất và điểm uy tín tài xế. Bạn có chắc chắn muốn chuyển sang ngoại tuyến?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex items-center justify-end gap-3 pt-2 sm:justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onOpenChange(false)}
                        className="rounded-full text-xs font-bold"
                    >
                        Tiếp tục giao hàng
                    </Button>
                    <Button
                        size="sm"
                        onClick={onConfirm}
                        className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs font-bold"
                    >
                        Vẫn tắt nhận đơn
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}