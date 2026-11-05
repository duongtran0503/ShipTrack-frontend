import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation, Phone } from "lucide-react";
import type { LiveDriverMarker, LiveOrderMarker } from "../hooks/use-live-tracking-map";

interface Props {
    entity: { type: "DRIVER" | "ORDER"; data: any } | null;
}

export function EntityDetailPanel({ entity }: Props) {
    return (
        <Card className="rounded-[24px] border-border/60 shadow-sm bg-card flex flex-col justify-between overflow-hidden h-full">
            <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-border/40 pb-4">
                    <h3 className="text-sm font-black text-foreground flex items-center gap-2">
                        <Navigation className="size-4 text-primary" />
                        <span>Thông tin chi tiết thực tế</span>
                    </h3>
                    <Badge className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Real-time</Badge>
                </div>

                {entity ? (
                    entity.type === "DRIVER" ? (
                        // --- Giao diện Tài xế ---
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <img
                                    src={(entity.data as LiveDriverMarker).avatar || "https://github.com/shadcn.png"}
                                    alt={(entity.data as LiveDriverMarker).name}
                                    className="size-12 rounded-full object-cover border shadow"
                                />
                                <div>
                                    <h4 className="font-bold text-foreground text-base">{(entity.data as LiveDriverMarker).name}</h4>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                        <Phone className="size-3" /> {(entity.data as LiveDriverMarker).phone}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-muted/30 border border-border/50 text-xs">
                                <div>
                                    <span className="text-muted-foreground block text-[10px]">Biển số xe</span>
                                    <span className="font-mono font-bold text-foreground">{(entity.data as LiveDriverMarker).licensePlate}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground block text-[10px]">Loại xe</span>
                                    <span className="font-bold text-foreground">{(entity.data as LiveDriverMarker).vehicleType}</span>
                                </div>
                            </div>
                            {(entity.data as LiveDriverMarker).currentOrderCode && (
                                <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs">
                                    <span className="text-muted-foreground block text-[10px]">Đang thực hiện đơn</span>
                                    <span className="font-bold text-primary text-sm">#{(entity.data as LiveDriverMarker).currentOrderCode}</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        // --- Giao diện Đơn hàng ---
                        <div className="space-y-4 text-xs">
                            <div className="p-3 rounded-2xl bg-muted/30 border border-border/50 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Mã vận đơn</span>
                                    <span className="font-bold text-primary text-sm">#{(entity.data as LiveOrderMarker).trackingCode}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Tài xế nhận</span>
                                    <span className="font-bold text-foreground">{(entity.data as LiveOrderMarker).assignedDriverName || "Chưa gán"}</span>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <span className="text-muted-foreground font-semibold">Điểm lấy hàng (Pickup)</span>
                                <p className="p-2.5 rounded-xl bg-card border border-border/60 font-medium text-foreground">
                                    {(entity.data as LiveOrderMarker).pickupAddress}
                                </p>
                            </div>
                            <div className="space-y-1.5">
                                <span className="text-muted-foreground font-semibold">Điểm giao hàng (Dropoff)</span>
                                <p className="p-2.5 rounded-xl bg-card border border-border/60 font-medium text-foreground">
                                    {(entity.data as LiveOrderMarker).deliveryAddress}
                                </p>
                            </div>
                        </div>
                    )
                ) : (
                    // --- Trạng thái rỗng ---
                    <div className="flex flex-col items-center justify-center py-24 text-center text-muted-foreground">
                        <MapPin className="size-10 mb-2 opacity-40 text-primary" />
                        <p className="text-xs">Nhấp vào icon tài xế hoặc đơn hàng trên bản đồ để xem thông tin chi tiết.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}