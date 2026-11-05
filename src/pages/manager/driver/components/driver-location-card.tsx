import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { MapDriverLocation } from "@/pages/manager/driver/hooks/use-drivers-map";
import { MapPin, Package, Phone, Radio, User } from "lucide-react";

interface Props {
    driver: MapDriverLocation | null;
}

export function DriverLocationCard({ driver }: Props) {
    return (
        <Card className="rounded-[24px] border-border/60 shadow-sm bg-card flex flex-col justify-between overflow-hidden">
            <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-border/40 pb-4">
                    <h3 className="text-sm font-black text-foreground flex items-center gap-2">
                        <Radio className="size-4 text-primary animate-pulse" />
                        <span>Thông tin định vị tài xế</span>
                    </h3>
                    <Badge className="text-[10px] font-bold">GPS Trực tuyến</Badge>
                </div>

                {driver ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <img
                                src={driver.AvatarUrl || "https://github.com/shadcn.png"}
                                alt={driver.Name}
                                className="size-12 rounded-full object-cover border border-border shadow"
                            />
                            <div>
                                <h4 className="font-bold text-foreground text-base">{driver.Name}</h4>
                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                    <Phone className="size-3" /> {driver.Phone}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-muted/30 border border-border/50 text-xs">
                            <div>
                                <span className="text-muted-foreground block text-[10px]">Biển số xe</span>
                                <span className="font-mono font-bold text-foreground">{driver.LicensePlate}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block text-[10px]">Phương tiện</span>
                                <span className="font-bold text-foreground">{driver.VehicleType}</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <span className="text-muted-foreground text-[11px] block">Vị trí hiện tại (GPS)</span>
                            <div className="p-3 rounded-xl bg-card border border-border/60 flex items-start gap-2">
                                <MapPin className="size-4 text-rose-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-foreground text-xs">{driver.CurrentLocationName}</p>
                                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                                        Lat: {driver.Latitude.toFixed(4)}, Lng: {driver.Longitude.toFixed(4)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {driver.ActiveOrderCode && (
                            <div className="space-y-1">
                                <span className="text-muted-foreground text-[11px] block">Đơn hàng đang thực hiện</span>
                                <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Package className="size-4 text-primary" />
                                        <span className="font-bold text-primary text-xs">#{driver.ActiveOrderCode}</span>
                                    </div>
                                    <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px]">Đang giao</Badge>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center text-muted-foreground">
                        <User className="size-10 mb-2 opacity-40" />
                        <p className="text-xs">Vui lòng chọn một tài xế trên bản đồ để xem chi tiết vị trí GPS và đơn hàng.</p>
                    </div>
                )}
            </CardContent>

            <div className="p-4 bg-muted/30 border-t border-border/40 text-center">
                <p className="text-[10px] text-muted-foreground">
                    Hệ thống tự động cập nhật vị trí mỗi 4 giây qua WebSocket/SignalR.
                </p>
            </div>
        </Card>
    );
}