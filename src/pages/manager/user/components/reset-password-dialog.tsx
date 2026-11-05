import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { KeyRound } from "lucide-react";

interface Props {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    email: string;
    onConfirm: () => void;
    isPending: boolean;
}

export function ResetPasswordDialog({ isOpen, onOpenChange, email, onConfirm, isPending }: Props) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="rounded-[24px] max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-base font-bold flex items-center gap-2 text-amber-600">
                        <KeyRound className="size-5" /> Reset mật khẩu người dùng
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        Hệ thống sẽ tạo mật khẩu ngẫu nhiên mới và tự động gửi email thông báo mật khẩu mới đến: <span className="font-bold text-foreground">{email}</span>.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="gap-2 sm:justify-end">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl text-xs font-bold">
                        Hủy bỏ
                    </Button>
                    <Button onClick={onConfirm} disabled={isPending} className="rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white">
                        Xác nhận gửi email
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}