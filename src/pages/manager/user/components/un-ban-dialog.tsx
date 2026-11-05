import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { BannedUserResponse } from "@/pages/manager/user/hooks/use-admin-banned-users";
import { Unlock } from "lucide-react";

interface Props {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    user: BannedUserResponse | null;
    onConfirm: () => void;
    isPending: boolean;
}

export function UnbanUserDialog({ isOpen, onOpenChange, user, onConfirm, isPending }: Props) {
    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="rounded-[24px] max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-base font-bold flex items-center gap-2 text-emerald-600">
                        <Unlock className="size-5" /> Mở khóa tài khoản: {user.Name}
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        Hành động này sẽ gỡ bỏ trạng thái khóa và khôi phục quyền truy cập hệ thống cho người dùng này.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="gap-2 sm:justify-end">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl text-xs font-bold">
                        Hủy bỏ
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={isPending}
                        className="rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                        Xác nhận mở khóa
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}