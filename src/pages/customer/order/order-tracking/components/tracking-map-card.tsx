import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Navigation } from "lucide-react"

interface Props {
    senderAddress?: string
    receiverAddress?: string
    distanceKm?: number
    status?: string
}

export function TrackingMapCard({
    senderAddress,
    receiverAddress,
    distanceKm,
    status,
}: Props) {
    return (
        <Card className="rounded-3xl border-border/60 shadow-md overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Navigation className="size-5 text-primary" />
                    <span>Lộ trình vận chuyển đơn hàng</span>
                </CardTitle>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {status || "Đang xử lý"}
                </span>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
                {/* Sơ đồ tuyến đường trực quan */}
                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                    {/* Điểm lấy hàng */}
                    <div className="relative space-y-1">
                        <span className="absolute -left-6 top-1 size-3 rounded-full bg-primary ring-4 ring-primary/20" />
                        <p className="text-[11px] font-bold text-muted-foreground uppercase">
                            Điểm lấy hàng (Pickup)
                        </p>
                        <p className="text-sm font-bold text-foreground">
                            {senderAddress || "Đang cập nhật địa chỉ gửi..."}
                        </p>
                    </div>

                    {/* Điểm giao hàng */}
                    <div className="relative space-y-1">
                        <span className="absolute -left-6 top-1 size-3 rounded-full bg-emerald-600 ring-4 ring-emerald-600/20" />
                        <p className="text-[11px] font-bold text-muted-foreground uppercase">
                            Điểm giao hàng (Dropoff)
                        </p>
                        <p className="text-sm font-bold text-foreground">
                            {receiverAddress || "Đang cập nhật địa chỉ nhận..."}
                        </p>
                    </div>
                </div>

                {/* Thông tin thống kê khoảng cách */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50 text-xs">
                    <div className="p-4 rounded-2xl bg-muted/40 border border-border/40 space-y-1">
                        <span className="text-muted-foreground block font-medium">Khoảng cách tuyến đường</span>
                        <span className="text-lg font-black text-foreground">
                            {distanceKm ? `${distanceKm} km` : "---"}
                        </span>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/40 border border-border/40 space-y-1">
                        <span className="text-muted-foreground block font-medium">Dự kiến thời gian</span>
                        <span className="text-lg font-black text-primary">~ 15 - 30 phút</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}