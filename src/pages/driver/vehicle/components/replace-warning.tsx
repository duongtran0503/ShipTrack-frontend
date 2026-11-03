import { AlertTriangle } from "lucide-react";

interface Props {
    vehicleTypeLabel: string;
    oldLicensePlate: string;
}

export function ReplaceWarning({ vehicleTypeLabel, oldLicensePlate }: Props) {
    return (
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
                <AlertTriangle className="size-5 text-amber-600 shrink-0" /> LƯU Ý KHI THAY XE MỚI
            </div>
            <ul className="list-disc pl-4 space-y-1">
                <li>Loại xe của bạn được giữ nguyên: <strong>{vehicleTypeLabel}</strong> (Không thể thay đổi sang loại xe khác).</li>
                <li>Xe cũ ({oldLicensePlate}) sẽ bị vô hiệu hóa trên hệ thống.</li>
                <li>Xe mới sẽ trở thành phương tiện hoạt động chính thức sau khi được Admin phê duyệt.</li>
            </ul>
        </div>
    );
}