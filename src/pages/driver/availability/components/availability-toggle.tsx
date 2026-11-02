import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Power } from "lucide-react";
import type { DriverAvailabilityState } from "../hooks/use-driver-availability";

interface Props {
    availability: DriverAvailabilityState;
    isToggling: boolean;
    canBeOnline: boolean;
    onToggle: (nextStatus: boolean) => void;
}

export function AvailabilityToggle({ availability, isToggling, canBeOnline, onToggle }: Props) {
    return (
        <Card
            className={`rounded-[28px] border transition-all duration-500 overflow-hidden shadow-lg ${availability.isOnline
                ? "bg-linear-to-r from-[#710105]/10 via-card to-card border-primary/40 shadow-primary/5"
                : "bg-muted/30 border-border/80"
                }`}
        >
            <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5 text-center md:text-left">
                    <div
                        className={`size-20 rounded-3xl flex items-center justify-center shrink-0 shadow-inner transition-colors duration-300 ${availability.isOnline ? "bg-primary text-white animate-pulse" : "bg-muted text-muted-foreground"
                            }`}
                    >
                        <Power className="size-10" />
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <span
                                className={`inline-block size-3 rounded-full ${availability.isOnline ? "bg-emerald-500 animate-ping" : "bg-muted-foreground"
                                    }`}
                            />
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Trạng thái hiện tại:</span>
                            <span
                                className={`text-xs font-black px-2.5 py-0.5 rounded-full ${availability.isOnline
                                    ? "bg-emerald-500/10 text-emerald-600"
                                    : "bg-muted text-muted-foreground"
                                    }`}
                            >
                                {availability.statusText}
                            </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-foreground">
                            {availability.isOnline
                                ? "Đang sẵn sàng nhận đơn hàng mới"
                                : "Đang tạm dừng nhận đơn (Ngoại tuyến)"}
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            {availability.isOnline
                                ? "Hệ thống đang quét các đơn hàng khả dụng trong khu vực của bạn."
                                : "Bật công tắc bên cạnh để bắt đầu nhận chuyến và gia tăng thu nhập."}
                        </p>
                    </div>
                </div>

                {/* Toggle lớn ON/OFF */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                    <Switch
                        checked={availability.isOnline}
                        disabled={isToggling || !canBeOnline}
                        onCheckedChange={onToggle}
                        className="scale-150 data-[state=checked]:bg-primary"
                    />
                    <span className="text-[11px] font-bold text-muted-foreground pt-3">
                        {availability.isOnline ? "Đang BẬT" : "Đang TẮT"}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}