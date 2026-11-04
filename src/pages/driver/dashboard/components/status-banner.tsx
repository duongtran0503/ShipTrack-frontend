import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Navigation, Power } from "lucide-react";
import { useState } from "react";

interface Props {
    isOnline: boolean;
    isToggling: boolean;
    onToggle: (next: boolean) => void;
}

export function StatusBanner({ isOnline, isToggling, onToggle }: Props) {
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleButtonClick = () => {
        if (isOnline) {
            // Nếu đang online mà muốn chuyển sang offline -> Hiện dialog xác nhận
            setShowConfirmModal(true);
        } else {
            // Nếu đang offline -> Bật online ngay lập tức không cần hỏi
            onToggle(true);
        }
    };

    const handleConfirmOffline = () => {
        onToggle(false);
        setShowConfirmModal(false);
    };

    return (
        <>
            <div
                className={`relative overflow-hidden rounded-[28px] p-8 text-white shadow-xl transition-all duration-500 ${isOnline
                    ? "bg-gradient-to-r from-[#710105] via-[#8B0000] to-[#b92338]"
                    : "bg-gradient-to-r from-[#bbbbbc] via-[#757b83] to-[#3f4752]"
                    }`}
            >
                {/* Hiệu ứng trang trí nền mờ */}
                <div className="absolute -right-10 -top-10 size-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
                <div className="absolute right-1/3 -bottom-10 size-48 rounded-full bg-black/10 blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <div className="space-y-3 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white/90">
                            <Navigation className={`size-3.5 ${isOnline ? "text-amber-300 animate-spin" : "text-gray-300"}`} />
                            <span>Hệ thống Điều phối Tài xế ShipTrack</span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                            {isOnline ? "Bạn đang ở trạng thái Sẵn sàng nhận đơn!" : "Bạn đang ở trạng thái Ngoại tuyến"}
                        </h1>

                        <p className="text-sm text-white/80 leading-relaxed">
                            {isOnline
                                ? "Hệ thống đang tự động tìm kiếm và kết nối các đơn hàng có tuyến đường phù hợp nhất với vị trí của bạn."
                                : "Hãy bật trạng thái sẵn sàng để bắt đầu nhận các chuyến giao hàng và gia tăng thu nhập ngay hôm nay."}
                        </p>
                    </div>

                    {/* Nút Toggle Trạng Thái Siêu Nổi Bật trong Banner */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
                        <Button
                            onClick={handleButtonClick}
                            disabled={isToggling}
                            className={`w-full sm:w-auto h-12 px-8 rounded-2xl font-bold text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-3 ${isOnline
                                ? "bg-white text-[#710105] hover:bg-white/90 shadow-black/10"
                                : "bg-amber-400 text-stone-950 hover:bg-amber-300 shadow-amber-500/20 btn-shine animate-pulse"
                                }`}
                        >
                            <Power className={`size-5 ${isOnline ? "text-[#710105]" : "text-stone-950"}`} />
                            <span>
                                {isToggling
                                    ? "Đang cập nhật..."
                                    : isOnline
                                        ? "Tắt nhận đơn"
                                        : "Bật sẵn sàng ngay"}
                            </span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Hộp thoại Dialog Xác nhận chuyển sang Ngoại tuyến */}
            <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
                <DialogContent className="max-w-md rounded-[28px] p-6 bg-card border border-border shadow-2xl">
                    <DialogHeader className="space-y-3">
                        <div className="size-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
                            <AlertTriangle className="size-6" />
                        </div>
                        <DialogTitle className="text-center text-lg font-bold text-foreground">
                            Xác nhận chuyển sang Ngoại tuyến?
                        </DialogTitle>
                        <DialogDescription className="text-center text-xs text-muted-foreground leading-relaxed">
                            Khi chuyển sang ngoại tuyến, bạn sẽ <strong className="text-foreground">ngừng nhận các đơn hàng mới</strong> từ hệ thống điều phối xung quanh khu vực của bạn.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="flex items-center justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowConfirmModal(false)}
                            disabled={isToggling}
                            className="rounded-xl text-xs font-bold h-11 px-5 cursor-pointer"
                        >
                            Tiếp tục nhận đơn
                        </Button>
                        <Button
                            type="button"
                            disabled={isToggling}
                            onClick={handleConfirmOffline}
                            className="rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold text-xs h-11 px-6 shadow-md cursor-pointer"
                        >
                            Xác nhận ngoại tuyến
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}