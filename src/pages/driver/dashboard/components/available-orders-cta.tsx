import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Props {
    onClick: () => void;
}

export function AvailableOrdersCta({ onClick }: Props) {
    return (
        <Card className="rounded-[24px] border-border/50 shadow-sm bg-gradient-to-r from-accent via-card to-card p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                    <h3 className="text-base font-bold text-foreground">
                        Sẵn sàng nhận thêm chuyến mới?
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Có nhiều đơn hàng đang chờ tài xế khu vực gần bạn với mức phí hấp dẫn.
                    </p>
                </div>
                <Button
                    onClick={onClick}
                    className="h-11 px-6 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-md animate-btn-gradient btn-shine shrink-0 cursor-pointer"
                >
                    Xem đơn hàng khả dụng
                </Button>
            </div>
        </Card>
    );
}