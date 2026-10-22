// src/pages/customer/orders/tracking/components/tracking-address-card.tsx
import { MapPin, ShieldCheck } from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface Props {
    receiverAddress?: string
    receiverName?: string
    receiverPhone?: string
}

export function TrackingAddressCard({
    receiverAddress,
    receiverName,
    receiverPhone,
}: Props) {
    return (
        <Card className="rounded-3xl border-border/60 shadow-md">
            <CardHeader className="pb-3 border-b border-border/60">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                    <MapPin className="size-5 text-emerald-600" />
                    <span>Địa chỉ nhận hàng</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-5 space-y-3 text-xs">
                <div>
                    <p className="font-bold text-foreground text-sm">
                        {receiverAddress}
                    </p>
                    <p className="text-muted-foreground pt-1">
                        Người nhận:{" "}
                        <strong className="text-foreground">{receiverName}</strong> (
                        {receiverPhone})
                    </p>
                </div>

                <Separator />

                <div className="flex items-center gap-2 text-emerald-600 font-semibold pt-1">
                    <ShieldCheck className="size-4" />
                    <span>Đã mua bảo hiểm vận chuyển hàng hóa</span>
                </div>
            </CardContent>
        </Card>
    )
}