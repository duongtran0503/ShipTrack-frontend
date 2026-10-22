import { ArrowLeft, Radio } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Props {
    trackingCode?: string
    isConnected: boolean
    onBack: () => void
    onGoDashboard: () => void
}

export function TrackingHeader({
    trackingCode,
    isConnected,
    onBack,
    onGoDashboard,
}: Props) {
    return (
        <Card className="rounded-3xl border-border/60 shadow-lg">
            <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onBack}
                        className="gap-1.5 text-xs text-muted-foreground hover:text-primary p-0 h-auto cursor-pointer"
                    >
                        <ArrowLeft className="size-3.5" /> Chi tiết đơn hàng
                    </Button>

                    <div className="flex items-center gap-3 pt-1">
                        <h1 className="text-2xl font-black text-foreground font-mono">
                            Theo dõi Real-time: {trackingCode}
                        </h1>

                        <Badge
                            className={`font-bold px-3 py-1 rounded-full ${isConnected
                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                }`}
                        >
                            <Radio className="size-3.5 mr-1.5 animate-pulse" />
                            {isConnected
                                ? "SignalR Real-time Connected"
                                : "Đang kết nối SignalR..."}
                        </Badge>
                    </div>
                </div>

                <Button
                    variant="outline"
                    onClick={onGoDashboard}
                    className="rounded-2xl border-border font-bold text-xs"
                >
                    Về Dashboard
                </Button>
            </CardContent>
        </Card>
    )
}