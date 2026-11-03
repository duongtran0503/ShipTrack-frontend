import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason: string) => void;
    isLoading: boolean;
}

const FAILURE_REASONS = [
    "Khách không có nhà / Không nghe máy",
    "Khách từ chối nhận hàng",
    "Sai địa chỉ hoặc địa chỉ không tồn tại",
    "Hàng hóa bị hư hỏng trước khi giao",
    "Lý do khác",
];

export function FailureReasonModal({ isOpen, onClose, onConfirm, isLoading }: Props) {
    const [selectedReason, setSelectedReason] = useState(FAILURE_REASONS[0]);

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="rounded-[28px] border-border/60">
                <AlertDialogHeader className="space-y-2">
                    <AlertDialogTitle className="text-base font-bold text-foreground">Chọn lý do giao thất bại</AlertDialogTitle>
                    <AlertDialogDescription className="text-xs text-muted-foreground leading-relaxed">
                        Vui lòng chọn lý do cụ thể để hệ thống ghi nhận và thông báo cho bộ phận vận hành hỗ trợ xử lý đơn hàng.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-2 py-2">
                    {FAILURE_REASONS.map((reason) => (
                        <button
                            key={reason}
                            onClick={() => setSelectedReason(reason)}
                            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all border ${selectedReason === reason
                                ? "bg-destructive/10 border-destructive text-destructive font-bold"
                                : "bg-muted/30 border-border/40 text-foreground hover:bg-muted"
                                }`}
                        >
                            {reason}
                        </button>
                    ))}
                </div>

                <AlertDialogFooter className="pt-2">
                    <Button
                        variant="outline"
                        disabled={isLoading}
                        onClick={onClose}
                        className="rounded-xl text-xs font-bold h-10"
                    >
                        Hủy bỏ
                    </Button>
                    <Button
                        disabled={isLoading}
                        onClick={() => onConfirm(selectedReason)}
                        className="rounded-xl text-xs font-bold h-10 bg-destructive hover:bg-destructive/90 text-white"
                    >
                        {isLoading && <Loader2 className="size-4 animate-spin mr-1.5" />}
                        Xác nhận giao thất bại
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}