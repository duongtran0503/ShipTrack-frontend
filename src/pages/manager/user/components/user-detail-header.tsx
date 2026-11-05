import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit3, KeyRound, Lock, Unlock } from "lucide-react";
import type { UserDetailType } from "../hooks/use-admin-user-detail";

interface Props {
    user: UserDetailType;
    onBack: () => void;
    onEdit: () => void;
    onResetPassword: () => void;
    onBanToggle: () => void;
}

export function UserDetailHeader({ user, onBack, onEdit, onResetPassword, onBanToggle }: Props) {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2">
            {/* Phần thông tin bên trái */}
            <div className="flex items-start gap-4">
                <Button variant="outline" size="icon" onClick={onBack} className="rounded-xl size-10 border-border/60 hover:bg-accent shrink-0 mt-0.5">
                    <ArrowLeft className="size-4" />
                </Button>
                <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                        <h1 className="text-xl font-black text-foreground">Hồ sơ: {user.Name}</h1>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${user.Role === "Driver" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" : "bg-blue-500/10 text-blue-600 border-blue-500/20"}`}>
                            {user.Role === "Driver" ? "Tài xế" : "Khách hàng"}
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        ID hệ thống: #{user.Id} • Tham gia từ: {user.CreatedAt || "---"}
                    </p>
                </div>
            </div>

            {/* Phần nút thao tác bên phải */}
            <div className="flex flex-wrap items-center gap-2.5">
                <Button
                    variant="outline"
                    onClick={onEdit}
                    className="rounded-xl h-9 text-xs font-bold border-border/60 hover:bg-accent"
                >
                    <Edit3 className="size-3.5 mr-1.5" /> Chỉnh sửa
                </Button>
                <Button
                    variant="outline"
                    onClick={onResetPassword}
                    className="rounded-xl h-9 text-xs font-bold border-amber-500/30 text-amber-600 hover:bg-amber-500/10"
                >
                    <KeyRound className="size-3.5 mr-1.5" /> Reset mật khẩu
                </Button>
                <Button
                    variant={user.IsActive ? "destructive" : "default"}
                    onClick={onBanToggle}
                    className={`rounded-xl h-9 text-xs font-bold ${!user.IsActive ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}`}
                >
                    {user.IsActive ? <Lock className="size-3.5 mr-1.5" /> : <Unlock className="size-3.5 mr-1.5" />}
                    {user.IsActive ? "Khóa tài khoản" : "Mở khóa"}
                </Button>
            </div>
        </div>
    );
}