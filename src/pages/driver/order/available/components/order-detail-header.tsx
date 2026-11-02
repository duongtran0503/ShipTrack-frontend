import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

interface Props {
    trackingCode: string;
    shippingFee: number;
    isAccepting: boolean;
    onAccept: () => void;
    onReject: () => void;
    onGoBack: () => void;
}

export function OrderDetailHeader({
    trackingCode,
    shippingFee,
    isAccepting,
    onAccept,
    onReject,
    onGoBack,
}: Props) {
    return (
        <div className="space-y-6">
            {/* Header điều hướng */}
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={onGoBack}
                    className="text-xs font-bold gap-2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                    <ArrowLeft className="size-4" />
                    <span>Quay lại danh sách</span>
                </Button>
                <Badge variant="secondary" className="text-xs font-bold text-primary bg-accent hover:bg-accent/80 px-3 py-1 rounded-full">
                    Mã đơn: #{trackingCode}
                </Badge>
            </div>

            {/* Banner tóm tắt phí */}
            <div className="rounded-[24px] bg-gradient-to-r from-[#710105] via-[#8B0000] to-[#b92338] p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                    <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">Thu nhập chuyến đi</span>
                    <h1 className="text-3xl font-black text-white">
                        {shippingFee.toLocaleString("vi-VN")} đ
                    </h1>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button
                        variant="outline"
                        onClick={onReject}
                        className="w-full sm:w-auto h-11 px-6 rounded-full font-bold text-xs bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                        Từ chối đơn
                    </Button>
                    <Button
                        disabled={isAccepting}
                        onClick={onAccept}
                        className="w-full sm:w-auto h-11 px-8 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md btn-shine cursor-pointer"
                    >
                        {isAccepting ? (
                            <>
                                <Loader2 className="size-4 mr-2 animate-spin" />
                                Đang nhận...
                            </>
                        ) : (
                            "Nhận đơn ngay"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}