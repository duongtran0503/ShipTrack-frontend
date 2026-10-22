import { Package } from "lucide-react"

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

export function OrderFeeCard({ order }: Props) {
    return (
        <Card className="rounded-3xl border-border/60 shadow-md">
            <CardHeader className="pb-3 border-b border-border/60">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Package className="size-5 text-primary" />
                    <span>Thông tin cước phí</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-5 space-y-3 text-xs">
                <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Tên kiện hàng:</span>
                    <span className="font-bold text-foreground">
                        {order.packageName}
                    </span>
                </div>
                <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Khối lượng:</span>
                    <span className="font-bold text-foreground">
                        {order.weightKg || 0.5} kg
                    </span>
                </div>

                <Separator />

                <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Phí vận chuyển gốc:</span>
                    <span className="font-medium text-foreground">
                        {order.shippingFee.toLocaleString("vi-VN")} đ
                    </span>
                </div>
                <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Bảo hiểm hàng hóa:</span>
                    <span className="font-medium text-emerald-600">Miễn phí</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-accent/50 border border-primary/20 space-y-1 text-center mt-2">
                    <p className="text-[11px] text-muted-foreground font-semibold">
                        TỔNG THANH TOÁN
                    </p>
                    <p className="text-2xl font-black text-shiptrack-price">
                        {order.shippingFee.toLocaleString("vi-VN")} đ
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}