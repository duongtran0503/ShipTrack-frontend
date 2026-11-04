import { ShieldAlert, Truck } from "lucide-react";
import type { DriverAvailabilityState } from "../hooks/use-driver-availability";

interface Props {
    availability: DriverAvailabilityState;
    canBeOnline: boolean;
}

export function AvailabilityWarning({ availability, canBeOnline }: Props) {
    if (canBeOnline) return null;

    const hasNoVehicle = !availability.defaultVehicle;

    return (
        <div className="p-4 rounded-[24px] bg-destructive/10 border border-destructive/20 flex items-start gap-3.5 text-xs text-destructive animate-fade-in">
            <div className="size-10 rounded-2xl bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                {hasNoVehicle ? <Truck className="size-5" /> : <ShieldAlert className="size-5" />}
            </div>
            <div className="space-y-1">
                <h4 className="font-bold text-sm">
                    {hasNoVehicle ? "Chưa thiết lập phương tiện hoạt động" : "Phương tiện chưa được phê duyệt"}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                    {hasNoVehicle
                        ? "Bạn bắt buộc phải đăng ký và chọn một phương tiện mặc định đã được duyệt để có thể bật trạng thái trực tuyến nhận đơn."
                        : "Phương tiện của bạn đang trong trạng thái chờ quản trị viên xét duyệt. Vui lòng quay lại sau hoặc liên hệ hỗ trợ."}
                </p>
            </div>
        </div>
    );
}