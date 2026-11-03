import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Loader2 } from "lucide-react";

interface Props {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    oldLicensePlate: string;
    isSubmitting: boolean;
    onConfirm: () => void;
}

export function ConfirmReplaceDialog({ isOpen, onOpenChange, oldLicensePlate, isSubmitting, onConfirm }: Props) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md rounded-[28px] p-6 border-border/60 shadow-2xl">
                <div className="size-14 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-2">
                    <AlertTriangle className="size-7" />
                </div>
                <DialogHeader>
                    <DialogTitle className="text-center text-base font-bold text-foreground">
                        Xác nhận thay xe mới?
                    </DialogTitle>
                    <DialogDescription className="text-center text-xs text-muted-foreground leading-relaxed pt-1">
                        Xe cũ (<strong className="text-foreground">{oldLicensePlate}</strong>) sẽ bị vô hiệu hóa. Xe mới sẽ thay thế vị trí hiện tại của bạn.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex items-center gap-3 pt-4 sm:justify-center">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="flex-1 rounded-xl text-xs font-bold h-11"
                    >
                        Hủy bỏ
                    </Button>
                    <Button
                        disabled={isSubmitting}
                        onClick={onConfirm}
                        className="flex-1 rounded-xl bg-[#710105] hover:bg-[#580104] text-white text-xs font-bold h-11 shadow-md gap-2"
                    >
                        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                        Xác nhận thay xe
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}