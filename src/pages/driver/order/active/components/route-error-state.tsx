import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface Props {
    message?: string;
    onGoBack: () => void;
}

export function RouteErrorState({ message, onGoBack }: Props) {
    return (
        <div className="w-full max-w-md mx-auto text-center py-20 space-y-4 bg-card rounded-[24px] border border-border/50 p-6 shadow-sm">
            <div className="size-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
                <AlertCircle className="size-8" />
            </div>
            <h3 className="text-base font-bold text-foreground">Không tìm thấy lộ trình đơn hàng</h3>
            <p className="text-xs text-muted-foreground">
                {message || "Đơn hàng không tồn tại."}
            </p>
            <Button onClick={onGoBack} className="rounded-full bg-[#710105] hover:bg-[#580104] text-white font-bold text-xs px-6">
                Quay lại chi tiết đơn
            </Button>
        </div>
    );
}