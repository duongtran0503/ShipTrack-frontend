import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useNotificationSettings } from "@/pages/manager/settings/hooks/use-notification-settings";
import { AlertCircle, Bell, Loader2, MessageSquareText, Save, Smartphone } from "lucide-react";

export default function AdminNotificationSettingsPage() {
    const {
        formData,
        isLoading,
        handleToggle,
        handleTemplateChange,
        handleSaveClick,
        isConfirmModalOpen,
        setIsConfirmModalOpen,
        handleConfirmSave,
        isPending,
    } = useNotificationSettings();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải cấu hình thông báo...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black text-foreground flex items-center gap-2">
                        <Bell className="size-6 text-primary" />
                        <span>Cấu hình Kênh & Mẫu Thông báo</span>
                    </h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Bật/tắt các kênh gửi thông báo tự động (Push, SMS, Email) và tùy chỉnh nội dung mẫu tin nhắn.
                    </p>
                </div>

                <Button
                    onClick={handleSaveClick}
                    className="rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-5 shadow-sm"
                >
                    <Save className="size-4 mr-1.5" /> Lưu cấu hình
                </Button>
            </div>

            <div className="space-y-6 max-w-3xl">
                {/* 1. Bật/tắt các kênh thông báo */}
                <Card className="rounded-[24px] border-border/60 shadow-sm bg-card">
                    <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                        <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                            <Smartphone className="size-4 text-primary" /> Kênh phát sóng thông báo
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4 text-xs">
                        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/30 border border-border/50">
                            <div>
                                <p className="font-bold text-foreground">Push Notification (App)</p>
                                <p className="text-[10px] text-muted-foreground">Gửi thông báo trực tiếp qua ứng dụng di động của tài xế và khách hàng.</p>
                            </div>
                            <Switch checked={formData.enablePush} onCheckedChange={(val) => handleToggle("enablePush", val)} />
                        </div>

                        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/30 border border-border/50">
                            <div>
                                <p className="font-bold text-foreground">Tin nhắn SMS</p>
                                <p className="text-[10px] text-muted-foreground">Gửi SMS thông báo mã OTP, trạng thái đơn hàng quan trọng qua nhà mạng.</p>
                            </div>
                            <Switch checked={formData.enableSms} onCheckedChange={(val) => handleToggle("enableSms", val)} />
                        </div>

                        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/30 border border-border/50">
                            <div>
                                <p className="font-bold text-foreground">Email tự động</p>
                                <p className="text-[10px] text-muted-foreground">Gửi email hóa đơn điện tử và xác nhận giao dịch tài chính.</p>
                            </div>
                            <Switch checked={formData.enableEmail} onCheckedChange={(val) => handleToggle("enableEmail", val)} />
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Mẫu nội dung thông báo (Templates) */}
                <Card className="rounded-[24px] border-border/60 shadow-sm bg-card">
                    <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                        <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                            <MessageSquareText className="size-4 text-primary" /> Mẫu nội dung thông báo (Templates)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-5 text-xs">
                        <div className="space-y-2">
                            <label className="font-bold text-foreground block">
                                Mẫu thông báo: Khi tạo đơn hàng thành công
                            </label>
                            <Textarea
                                value={formData.orderCreatedTemplate}
                                onChange={(e) => handleTemplateChange("orderCreatedTemplate", e.target.value)}
                                className="rounded-xl text-xs min-h-[70px] border-border/60"
                            />
                            <p className="text-[10px] text-muted-foreground">Biến hỗ trợ: <code className="font-mono text-primary">{"{OrderCode}"}</code>, <code className="font-mono text-primary">{"{CustomerName}"}</code></p>
                        </div>

                        <div className="space-y-2">
                            <label className="font-bold text-foreground block">
                                Mẫu thông báo: Khi tài xế nhận đơn
                            </label>
                            <Textarea
                                value={formData.orderAssignedTemplate}
                                onChange={(e) => handleTemplateChange("orderAssignedTemplate", e.target.value)}
                                className="rounded-xl text-xs min-h-[70px] border-border/60"
                            />
                            <p className="text-[10px] text-muted-foreground">Biến hỗ trợ: <code className="font-mono text-primary">{"{OrderCode}"}</code>, <code className="font-mono text-primary">{"{DriverName}"}</code>, <code className="font-mono text-primary">{"{DriverPhone}"}</code></p>
                        </div>

                        <div className="space-y-2">
                            <label className="font-bold text-foreground block">
                                Mẫu thông báo: Khi hoàn thành đơn hàng
                            </label>
                            <Textarea
                                value={formData.orderCompletedTemplate}
                                onChange={(e) => handleTemplateChange("orderCompletedTemplate", e.target.value)}
                                className="rounded-xl text-xs min-h-[70px] border-border/60"
                            />
                            <p className="text-[10px] text-muted-foreground">Biến hỗ trợ: <code className="font-mono text-primary">{"{OrderCode}"}</code></p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Modal Xác nhận lưu */}
            <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
                <DialogContent className="rounded-[24px] max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-base font-bold flex items-center gap-2">
                            <AlertCircle className="size-5 text-amber-500" />
                            <span>Xác nhận cập nhật cấu hình thông báo</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Các thay đổi về mẫu tin nhắn và kênh phát sóng sẽ được áp dụng ngay lập tức cho các thông báo gửi đến người dùng tiếp theo.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="gap-2 pt-2">
                        <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)} className="rounded-xl text-xs font-bold">
                            Hủy bỏ
                        </Button>
                        <Button
                            onClick={handleConfirmSave}
                            disabled={isPending}
                            className="rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                            {isPending ? <Loader2 className="size-4 animate-spin mr-1" /> : null}
                            Xác nhận áp dụng
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}