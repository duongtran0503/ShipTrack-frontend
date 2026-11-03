import { AlertTriangle } from "lucide-react";

export function RegisterWarning() {
    return (
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
                <AlertTriangle className="size-5 text-amber-600 shrink-0" /> LƯU Ý QUAN TRỌNG VỀ LOẠI XE
            </div>
            <p className="leading-relaxed">
                Loại xe bạn chọn sẽ được <strong>CỐ ĐỊNH VĨNH VIỄN</strong> và không thể thay đổi sau khi đăng ký thành công. Vui lòng chọn đúng loại phương tiện bạn sẽ sử dụng để thực hiện giao hàng.
            </p>
        </div>
    );
}