import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

interface Props {
    message?: string;
    onGoBack: () => void;
}

export function OrderErrorState({ message, onGoBack }: Props) {
    return (
        <div className="text-center py-20 space-y-4 bg-card rounded-[24px] border border-border/50 p-6 shadow-sm">
            <div className="size-16 mx-auto rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
                <XCircle className="size-8" />
            </div>
            <h3 className="text-base font-bold text-foreground">Đơn hàng không khả dụng</h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
                {message || "Đơn hàng này đã bị tài xế khác nhận hoặc không còn tồn tại trên hệ thống."}
            </p>
            <Button
                onClick={onGoBack}
                className="rounded-full bg-[#710105] hover:bg-[#580104] text-white font-bold text-xs px-6"
            >
                Quay lại danh sách đơn
            </Button>
        </div>
    );
}