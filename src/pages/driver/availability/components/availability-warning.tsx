import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import type { DriverAvailabilityState } from "../hooks/use-driver-availability";

interface Props {
    availability: DriverAvailabilityState;
    canBeOnline: boolean;
}

export function AvailabilityWarning({ availability, canBeOnline }: Props) {
    if (canBeOnline) return null;

    return (
        <Alert variant="destructive" className="rounded-2xl bg-destructive/10 border-destructive/30">
            <AlertTriangle className="size-6" />
            <AlertTitle className="text-xs font-bold mt-0.5">Tài khoản chưa đủ điều kiện nhận đơn</AlertTitle>
            <AlertDescription className="text-xs mt-1">
                {!availability.defaultVehicle
                    ? "Bạn chưa đăng ký phương tiện mặc định."
                    : "Bằng lái xe của bạn chưa được phê duyệt hoặc đã hết hạn."}
            </AlertDescription>
        </Alert>
    );
}