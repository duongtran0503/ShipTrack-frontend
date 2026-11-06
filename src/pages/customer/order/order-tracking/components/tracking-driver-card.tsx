import { Bike, PhoneCall, Star } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Props {
    driverName?: string
    driverPhone?: string
    driverLicensePlate?: string
    onCall?: () => void
}

export function TrackingDriverCard({
    driverName,
    driverPhone,
    driverLicensePlate,
    onCall,
}: Props) {
    return (
        <Card className="rounded-3xl border-border/60 shadow-md">
            <CardHeader className="pb-3 border-b border-border/60">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Bike className="size-5 text-primary" />
                    <span>Tài xế đang giao hàng</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                    <Avatar className="size-12 border-2 border-primary/20">
                        <AvatarFallback className="bg-primary text-white font-bold">
                            {driverName ? driverName.charAt(0) : "T"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-0.5">
                        <h3 className="text-sm font-bold text-foreground">
                            {driverName || "Đang cập nhật tài xế..."}
                        </h3>
                        <p className="text-xs text-muted-foreground font-medium">
                            SĐT: {driverPhone || "---"}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold pt-0.5">
                            <Star className="size-3.5 fill-amber-500" />
                            <span>4.9 / 5.0 (120 đánh giá)</span>
                        </div>
                    </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-muted/40 text-xs space-y-2 border border-border/50">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Loại phương tiện:</span>
                        <span className="font-bold">Xe máy giao hàng</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Biển số xe:</span>
                        <span className="font-bold text-primary font-mono">
                            {driverLicensePlate || "---"}
                        </span>
                    </div>
                </div>

                <Button
                    onClick={onCall}
                    disabled={!driverPhone}
                    className="w-full rounded-2xl gap-2 font-bold text-xs h-11 animate-btn-gradient btn-shine text-white border-none shadow-md cursor-pointer disabled:opacity-50"
                >
                    <PhoneCall className="size-4" />
                    <span>Gọi điện trực tiếp cho Tài xế</span>
                </Button>
            </CardContent>
        </Card>
    )
}