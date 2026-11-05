import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { UserResponse } from "@/pages/manager/user/hooks/use-admin-users";
import { Loader2, Lock, Unlock } from "lucide-react";

interface Props {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    user: UserResponse | null;
    reason: string;
    setReason: (val: string) => void;
    onConfirm: () => void;
    isPending: boolean;
}

export function BanUserDialog({ isOpen, onOpenChange, user, reason, setReason, onConfirm, isPending }: Props) {
    if (!user) return null;
    const isBanning = user.IsActive;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="rounded-[24px] max-w-md">
                <DialogHeader>
                    <DialogTitle className={`text-base font-bold flex items-center gap-2 ${isBanning ? "text-destructive" : "text-emerald-600"}`}>
                        {isBanning ? <Lock className="size-5" /> : <Unlock className="size-5" />}
                        {isBanning ? "Khóa tài khoản người dùng" : "Mở khóa tài khoản người dùng"}
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        {isBanning
                            ? `Bạn đang chuẩn bị khóa tài khoản của ${user.Name}. Người dùng này sẽ không thể đăng nhập hoặc thực hiện giao dịch.`
                            : `Bạn đang mở khóa tài khoản của ${user.Name}. Người dùng này sẽ có thể truy cập hệ thống bình thường.`}
                    </DialogDescription>
                </DialogHeader>

                {isBanning && (
                    <div className="space-y-3 py-2">
                        <label className="text-xs font-bold text-foreground">Lý do khóa tài khoản *</label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Nhập lý do chi tiết..."
                            className="w-full h-24 p-3 rounded-xl border border-border bg-card text-xs focus:ring-primary outline-none resize-none"
                        />
                    </div>
                )}

                <DialogFooter className="gap-2 sm:justify-end">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl text-xs font-bold">
                        Hủy bỏ
                    </Button>
                    <Button
                        variant={isBanning ? "destructive" : "default"}
                        onClick={onConfirm}
                        disabled={(isBanning && !reason.trim()) || isPending}
                        className={`rounded-xl text-xs font-bold ${!isBanning ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}`}
                    >
                        {isPending ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
                        {isBanning ? "Xác nhận khóa" : "Xác nhận mở khóa"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}