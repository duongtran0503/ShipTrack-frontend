import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import type { Notification } from "../types";

interface Props {
    notifications: Notification[];
}

export function NotificationsCard({ notifications }: Props) {
    return (
        <Card className="rounded-[24px] border-border/50 shadow-sm bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-4 pt-6 px-6 border-b border-border/40">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <Bell className="size-5 text-amber-500" />
                    <span>Thông báo mới</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                {notifications.length > 0 ? (
                    notifications.map((notif, idx) => (
                        <div
                            key={idx}
                            className="p-3.5 rounded-2xl bg-muted/30 border border-border/40 space-y-1"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-foreground">
                                    {notif.title || "Hệ thống"}
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                    {notif.time || "Vừa xong"}
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {notif.message || notif.content}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-6 text-xs text-muted-foreground">
                        Không có thông báo mới nào.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}