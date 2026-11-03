import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ActiveOrderDetailItem } from "@/pages/driver/order/active/hooks/use-active-order-detail";
import type { ActiveOrderStatus } from "@/pages/driver/order/active/hooks/use-active-orders";
import { ShieldCheck } from "lucide-react";

interface Props {
    order: ActiveOrderDetailItem;
    currentStatus: ActiveOrderStatus | string;
    onPickup: () => void;
    onDeliver: () => void;
    onComplete: () => void;
    onFail: () => void;
}

export function OrderProgressCard({ order, currentStatus, onPickup, onDeliver, onComplete, onFail }: Props) {
    return (
        <Card className="rounded-[28px] border-border/60 shadow-sm bg-card">
            <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <ShieldCheck className="size-5 text-primary" />
                    <span>Tiến độ thực hiện đơn hàng</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                    {/* Bước 1: DRIVER_ASSIGNED */}
                    <div className="space-y-2 relative">
                        <span className={`absolute -left-6 top-1 size-3 rounded-full ring-4 ${currentStatus !== "PENDING" && currentStatus !== "SEARCHING_DRIVER"
                            ? "bg-primary ring-primary/20"
                            : "bg-muted ring-muted/20"
                            }`} />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">1. Đã nhận đơn (`DRIVER_ASSIGNED`)</span>
                        <p className="text-xs font-bold text-foreground">{order.senderAddress}</p>
                        {currentStatus === "DRIVER_ASSIGNED" && (
                            <div className="pt-2">
                                <Button
                                    size="sm"
                                    onClick={onPickup}
                                    className="rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs h-10 px-6 cursor-pointer shadow-md"
                                >
                                    Xác nhận đã lấy hàng (`PICKED_UP`)
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Bước 2: PICKED_UP */}
                    <div className="space-y-2 relative">
                        <span className={`absolute -left-6 top-1 size-3 rounded-full ring-4 ${["DELIVERING", "COMPLETED", "FAILED"].includes(currentStatus)
                            ? "bg-primary ring-primary/20"
                            : "bg-muted ring-muted/20"
                            }`} />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">2. Đã lấy hàng (`PICKED_UP`)</span>
                        <p className="text-xs font-semibold text-muted-foreground">Sẵn sàng xuất phát giao đến khách hàng.</p>
                        {currentStatus === "PICKED_UP" && (
                            <div className="pt-2">
                                <Button
                                    size="sm"
                                    onClick={onDeliver}
                                    className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs h-10 px-6 cursor-pointer shadow-md"
                                >
                                    Bắt đầu giao hàng (`DELIVERING`)
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Bước 3: DELIVERING */}
                    <div className="space-y-2 relative">
                        <span className={`absolute -left-6 top-1 size-3 rounded-full ring-4 ${["COMPLETED", "FAILED"].includes(currentStatus)
                            ? "bg-primary ring-primary/20"
                            : currentStatus === "DELIVERING"
                                ? "bg-amber-500 ring-amber-500/20 animate-pulse"
                                : "bg-muted ring-muted/20"
                            }`} />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">3. Đang giao hàng (`DELIVERING`)</span>
                        <p className="text-xs font-bold text-foreground">{order.receiverAddress}</p>
                        {currentStatus === "DELIVERING" && (
                            <div className="pt-2 flex flex-wrap gap-3">
                                <Button
                                    size="sm"
                                    onClick={onComplete}
                                    className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-10 px-6 cursor-pointer shadow-md"
                                >
                                    Đã giao thành công (`COMPLETED`)
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={onFail}
                                    className="rounded-xl font-bold text-xs h-10 px-6 cursor-pointer shadow-md"
                                >
                                    Giao thất bại (`FAILED`)
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Bước 4: Kết thúc */}
                    <div className="space-y-2 relative">
                        <span className={`absolute -left-6 top-1 size-3 rounded-full ring-4 ${currentStatus === "COMPLETED"
                            ? "bg-emerald-600 ring-emerald-600/20"
                            : currentStatus === "FAILED"
                                ? "bg-destructive ring-destructive/20"
                                : "bg-muted ring-muted/20"
                            }`} />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">4. Trạng thái kết thúc</span>
                        <p className="text-xs font-bold text-foreground">
                            {currentStatus === "COMPLETED" && "✅ Đơn hàng đã giao hoàn tất thành công."}
                            {currentStatus === "FAILED" && `❌ Giao thất bại: ${order.failureReason || "Đã ghi nhận lý do"}`}
                            {!["COMPLETED", "FAILED"].includes(currentStatus) && "⏳ Đang chờ hoàn tất chuyến đi."}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}