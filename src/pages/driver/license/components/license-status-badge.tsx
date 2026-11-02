import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import type { DriverLicenseInfo } from "../hooks/use-driver-license";

interface Props {
    status: DriverLicenseInfo["approvalStatus"];
}

export function LicenseStatusBadge({ status }: Props) {
    if (status === "APPROVED") {
        return (
            <Badge variant="outline" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs font-bold hover:bg-emerald-500/20">
                <CheckCircle2 className="size-3.5" /> Đã phê duyệt
            </Badge>
        );
    }
    if (status === "PENDING") {
        return (
            <Badge variant="outline" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 border-amber-500/20 text-xs font-bold hover:bg-amber-500/20">
                <Clock className="size-3.5" /> Đang chờ duyệt
            </Badge>
        );
    }
    return (
        <Badge variant="outline" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-destructive/10 text-destructive border-destructive/20 text-xs font-bold hover:bg-destructive/20">
            <XCircle className="size-3.5" /> Bị từ chối
        </Badge>
    );
}