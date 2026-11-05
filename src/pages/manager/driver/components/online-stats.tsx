import { Card } from "@/components/ui/card";
import type { OnlineDriverResponse } from "@/pages/manager/driver/hooks/use-online-drivers";
import { Package, Radio, Truck } from "lucide-react";

interface Props {
    drivers: OnlineDriverResponse[];
}

export function OnlineStats({ drivers }: Props) {
    const total = drivers.length;
    const onlineCount = drivers.filter((d) => d.DeliveryStatus === "ONLINE").length;
    const deliveringCount = drivers.filter((d) => d.DeliveryStatus === "DELIVERING").length;

    const cardClass = "rounded-[20px] border-border/40 bg-transparent shadow-none p-4 flex items-center gap-4";

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className={cardClass}>
                <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <Radio className="size-5" />
                </div>
                <div className="flex flex-col items-center gap-y-1">
                    <p className="text-[11px] font-semibold text-muted-foreground">Tổng tài xế Online</p>
                    <p className="text-xl font-black text-foreground">{total}</p>
                </div>
            </Card>

            <Card className={cardClass}>
                <div className="size-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                    <Truck className="size-5" />
                </div>
                <div className="flex flex-col items-center gap-y-1">
                    <p className="text-[11px] font-semibold text-muted-foreground">Sẵn sàng nhận đơn</p>
                    <p className="text-xl font-black text-foreground">{onlineCount}</p>
                </div>
            </Card>

            <Card className={cardClass}>
                <div className="size-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <Package className="size-5" />
                </div>
                <div className="flex flex-col items-center gap-y-1">
                    <p className="text-[11px] font-semibold text-muted-foreground">Đang trong chuyến giao</p>
                    <p className="text-xl font-black text-foreground">{deliveringCount}</p>
                </div>
            </Card>
        </div>
    );
}