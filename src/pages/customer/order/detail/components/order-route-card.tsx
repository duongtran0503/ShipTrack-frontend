import { MapPin } from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { OrderItem } from "@/demo_data_services/mockOrderService"

interface Props {
    order: OrderItem
}

export function OrderRouteCard({ order }: Props) {
    return (
        <Card className="rounded-3xl border-border/60 shadow-md">
            <CardHeader className="pb-4 border-b border-border/60">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                    <MapPin className="size-5 text-primary" />
                    <span>Tuyến đường giao nhận</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-2xl bg-primary/10 text-primary shrink-0">
                        <MapPin className="size-5" />
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-[11px] font-bold text-primary uppercase tracking-wider">
                            Điểm lấy hàng (Người gửi)
                        </p>
                        <p className="text-sm font-bold text-foreground">
                            {order.senderAddress}
                        </p>
                    </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 shrink-0">
                        <MapPin className="size-5" />
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                            Điểm giao hàng (Người nhận)
                        </p>
                        <p className="text-sm font-bold text-foreground">
                            {order.receiverAddress}
                        </p>
                        <p className="text-xs text-muted-foreground pt-1">
                            Người nhận:{" "}
                            <strong className="text-foreground">{order.receiverName}</strong>{" "}
                            ({order.receiverPhone})
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}