import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import type { UserDetailType } from "../hooks/use-admin-user-detail";

interface Props {
    user: UserDetailType;
}

export function UserActivityHistory({ user }: Props) {
    const isDriver = user.Role === "Driver";
    const hasHistory = isDriver ? (user.HistoryTrips?.length ?? 0) > 0 : (user.HistoryOrders?.length ?? 0) > 0;

    return (
        <Card className="rounded-[20px] border-border/50 shadow-sm bg-card overflow-hidden">
            <CardHeader className=" pt-5 px-5 border-b border-border/40">
                <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Clock className="size-4 text-primary" />
                    <span>{isDriver ? "Lịch sử chuyến đi vận chuyển" : "Lịch sử đơn hàng đã tạo"}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 mt-0">
                {hasHistory ? (
                    <div className="space-y-2.5">
                        {isDriver
                            ? user.HistoryTrips?.map((trip) => (
                                <div key={trip.id} className="p-3.5 rounded-xl border border-border/50 bg-muted/10 flex items-center justify-between gap-4">
                                    <div>
                                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">#{trip.trackingCode}</span>
                                        <p className="text-[11px] text-muted-foreground mt-1">Hoàn thành lúc: {trip.completedAt}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-black text-shiptrack-price">+{trip.income.toLocaleString("vi-VN")} đ</span>
                                    </div>
                                </div>
                            ))
                            : user.HistoryOrders?.map((ord) => (
                                <div key={ord.id} className="p-3.5 rounded-xl border border-border/50 bg-muted/10 flex items-center justify-between gap-4">
                                    <div>
                                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">#{ord.trackingCode}</span>
                                        <p className="text-xs text-foreground font-medium mt-1 truncate max-w-[250px]">Điểm đến: {ord.destination}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className="text-xs font-black text-shiptrack-price">{ord.fee.toLocaleString("vi-VN")} đ</span>
                                        <p className="text-[10px] text-muted-foreground mt-0.5">{ord.status}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-xs text-muted-foreground">
                        {isDriver ? "Tài xế chưa có lịch sử chuyến đi nào." : "Khách hàng chưa tạo đơn hàng nào."}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}