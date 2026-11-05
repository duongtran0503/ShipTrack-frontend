import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Eye, EyeOff, PackageCheck, Phone, ShieldAlert, User } from "lucide-react";
import type { UserDetailType } from "../hooks/use-admin-user-detail";

interface Props {
    user: UserDetailType;
    showSensitiveInfo: boolean;
    toggleShowSensitiveInfo: () => void;
}

export function UserInfoCards({ user, showSensitiveInfo, toggleShowSensitiveInfo }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {/* Thẻ 1: Thông tin cơ bản */}
            <Card className="rounded-[20px] border-border/50 shadow-sm bg-card overflow-hidden flex flex-col">
                <CardHeader className=" pt-5 px-5 border-b border-border/40">
                    <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                        <User className="size-4 text-primary" /> Thông tin cơ bản
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3.5 text-xs flex-1 mt-0 pt-0">
                    <div>
                        <span className="text-muted-foreground block text-[11px] mb-0.5">Họ và tên</span>
                        <span className="font-bold text-foreground text-sm">{user.Name}</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground block text-[11px] mb-0.5">Email đăng nhập</span>
                        <span className="font-semibold text-foreground">{user.Email}</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground block text-[11px] mb-1">Trạng thái hệ thống</span>
                        {user.IsActive ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                                <CheckCircle2 className="size-3" /> Đang hoạt động
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-destructive/10 text-destructive border border-destructive/20" title={user.BanReason || undefined}>
                                <ShieldAlert className="size-3" /> Đã khóa
                            </span>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Thẻ 2: Thông tin nhạy cảm */}
            <Card className="rounded-[20px] border-primary/20 shadow-sm bg-primary/5 overflow-hidden flex flex-col">
                <CardHeader className=" pt-5 px-5 border-b border-primary/10 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-bold text-primary flex items-center gap-2">
                        <Phone className="size-4" /> Thông tin nhạy cảm
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleShowSensitiveInfo}
                        className="h-7 px-2 text-xs text-primary hover:bg-primary/10 rounded-lg flex items-center gap-1 font-bold"
                    >
                        {showSensitiveInfo ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        <span>{showSensitiveInfo ? "Ẩn" : "Hiện"}</span>
                    </Button>
                </CardHeader>
                <CardContent className="p-5 pt-0 mt-0 space-y-3.5 text-xs flex-1">
                    <div>
                        <span className="text-muted-foreground block text-[11px] mb-0.5">Số điện thoại liên lạc</span>
                        <span className="font-black text-foreground text-sm tracking-wide">
                            {showSensitiveInfo ? user.Phone : "•••• ••• •••"}
                        </span>
                    </div>
                    <div>
                        <span className="text-muted-foreground block text-[11px] mb-0.5">Địa chỉ cư trú</span>
                        <span className="font-semibold text-foreground">
                            {showSensitiveInfo ? (user.Address || "Chưa cập nhật địa chỉ") : "•••••••••••••••••••••••••••••"}
                        </span>
                    </div>
                    {user.Role === "Driver" && (
                        <div>
                            <span className="text-muted-foreground block text-[11px] mb-1">Biển số xe đăng ký</span>
                            <span className="font-mono font-bold text-foreground bg-card px-2 py-0.5 rounded border border-border inline-block">
                                {showSensitiveInfo ? (user.LicensePlate || "Chưa có biển số") : "••••••••••"}
                            </span>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Thẻ 3: Thống kê hoạt động */}
            <Card className="rounded-[20px] border-border/50 shadow-sm bg-card overflow-hidden flex flex-col">
                <CardHeader className=" pt-5 px-5 border-b border-border/40">
                    <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                        <PackageCheck className="size-4 text-primary" /> Thống kê hoạt động
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-3.5 pt-0 mt-0 text-xs flex-1">
                    <div>
                        <span className="text-muted-foreground block text-[11px] mb-0.5">
                            {user.Role === "Driver" ? "Tổng chuyến hoàn thành" : "Tổng đơn hoàn thành"}
                        </span>
                        <span className="font-black text-foreground text-base">{user.TotalCompletedOrders || 0} đơn</span>
                    </div>
                    <div>
                        <span className="text-muted-foreground block text-[11px] mb-0.5">Tổng giá trị giao dịch</span>
                        <span className="font-black text-shiptrack-price text-base">{(user.TotalSpentOrEarned || 0).toLocaleString("vi-VN")} đ</span>
                    </div>
                    {user.Role === "Driver" && (
                        <div>
                            <span className="text-muted-foreground block text-[11px] mb-1">Trạng thái nhận đơn</span>
                            <span className="font-bold text-foreground block">
                                {user.Online ? (
                                    <span className="text-emerald-600 flex items-center gap-1"><span className="size-2 rounded-full bg-emerald-500 animate-pulse" /> Đang trực tuyến</span>
                                ) : (
                                    <span className="text-muted-foreground">○ Ngoại tuyến</span>
                                )}
                            </span>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}