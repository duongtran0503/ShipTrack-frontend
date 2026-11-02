import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clock, ShieldAlert, XCircle } from "lucide-react";
import type { DriverLicenseInfo } from "../hooks/use-driver-license";

interface Props {
    license: DriverLicenseInfo;
    expiryInfo: ReturnType<ReturnType<typeof import("../hooks/use-driver-license").useDriverLicense>["checkExpiryStatus"]>;
}

export function LicenseAlerts({ license, expiryInfo }: Props) {
    return (
        <div className="space-y-4">
            {license.approvalStatus === "PENDING" && (
                <Alert className="rounded-2xl bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200">
                    <Clock className="size-5 text-amber-600" />
                    <AlertTitle className="text-xs font-bold mt-0.5">Đang chờ quản trị viên phê duyệt</AlertTitle>
                    <AlertDescription className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                        Thông tin bằng lái mới của bạn đang được xét duyệt. Bạn vẫn có thể hoạt động bình thường bằng thông tin cũ cho đến khi hoàn tất.
                    </AlertDescription>
                </Alert>
            )}

            {license.approvalStatus === "REJECTED" && (
                <Alert variant="destructive" className="rounded-2xl">
                    <XCircle className="size-5" />
                    <AlertTitle className="text-xs font-bold mt-0.5">Bằng lái bị từ chối phê duyệt</AlertTitle>
                    <AlertDescription className="text-xs mt-1">
                        {license.rejectionReason || "Ảnh chụp không rõ nét hoặc thông tin không trùng khớp. Vui lòng cập nhật lại."}
                    </AlertDescription>
                </Alert>
            )}

            {expiryInfo.isExpired && (
                <Alert variant="destructive" className="rounded-2xl bg-destructive/15 border-destructive/40">
                    <ShieldAlert className="size-6 animate-bounce" />
                    <AlertTitle className="text-sm font-bold mt-0.5">Bằng lái đã hết hạn!</AlertTitle>
                    <AlertDescription className="text-xs mt-1">
                        Tài khoản của bạn sẽ bị tạm ngưng nhận đơn cho đến khi cập nhật giấy phép lái xe hợp lệ mới.
                    </AlertDescription>
                </Alert>
            )}

            {expiryInfo.isNearExpiry && !expiryInfo.isExpired && (
                <Alert className="rounded-2xl bg-amber-500/15 border-amber-500/40 text-amber-800 dark:text-amber-300">
                    <ShieldAlert className="size-6 text-amber-600" />
                    <AlertTitle className="text-sm font-bold mt-0.5">Bằng lái sắp hết hạn (Còn {expiryInfo.daysLeft} ngày)</AlertTitle>
                    <AlertDescription className="text-xs mt-1">
                        Vui lòng chuẩn bị gia hạn và cập nhật lại thông tin trước khi bằng lái chính thức hết hiệu lực.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
}