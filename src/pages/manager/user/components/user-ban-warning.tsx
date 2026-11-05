import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ShieldAlert, UserX } from "lucide-react";
import type { UserDetailType } from "../hooks/use-admin-user-detail";

interface Props {
    user: UserDetailType;
}

export function UserBanWarning({ user }: Props) {
    if (user.IsActive) return null;

    return (
        <Card className="rounded-[24px] border-destructive/40 bg-destructive/5 shadow-sm overflow-hidden">
            <CardHeader className="pb-3 pt-5 px-6 border-b border-destructive/20 bg-destructive/10">
                <CardTitle className="text-sm font-bold text-destructive flex items-center gap-2">
                    <ShieldAlert className="size-5" />
                    <span>Thông tin khóa tài khoản & Vi phạm hệ thống</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <span className="text-muted-foreground block text-[11px]">Thời gian khóa</span>
                        <span className="font-bold text-foreground">{user.BannedAt || "---"}</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground block text-[11px]">Người thực hiện lệnh khóa</span>
                        <span className="font-bold text-foreground">{user.BannedBy || "Admin"}</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground block text-[11px]">Trạng thái hiện tại</span>
                        <span className="font-bold text-destructive flex items-center gap-1 mt-0.5">
                            <UserX className="size-3.5" /> Đã vô hiệu hóa vĩnh viễn / tạm thời
                        </span>
                    </div>
                </div>

                <div>
                    <span className="text-muted-foreground block text-[11px] mb-1">Lý do khóa tài khoản chi tiết</span>
                    <div className="p-3 rounded-xl bg-card border border-destructive/20 text-destructive font-medium">
                        {user.BanReason || "Không có lý do cụ thể được ghi nhận."}
                    </div>
                </div>

                {/* Danh sách cảnh báo (Warning logs) liên quan */}
                {user.WarningLogs && user.WarningLogs.length > 0 && (
                    <div className="pt-2">
                        <span className="text-muted-foreground block text-[11px] mb-2 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <AlertTriangle className="size-3.5 text-amber-500" /> Lịch sử cảnh báo trước khi khóa ({user.WarningLogs.length})
                        </span>
                        <div className="space-y-2">
                            {user.WarningLogs.map((warn) => (
                                <div key={warn.id} className="p-3 rounded-xl bg-card border border-border/60 flex items-start justify-between gap-4">
                                    <div>
                                        <p className="font-semibold text-foreground">{warn.content}</p>
                                        <p className="text-[10px] text-muted-foreground mt-1">Thời gian: {warn.createdAt} • Cấp bởi: {warn.issuedBy}</p>
                                    </div>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20 shrink-0">
                                        Cảnh cáo
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}