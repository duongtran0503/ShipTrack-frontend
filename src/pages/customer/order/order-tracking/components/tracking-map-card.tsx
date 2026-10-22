import { Navigation } from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Props {
    etaMinutes: number
    distanceKmLeft: number
}

export function TrackingMapCard({ etaMinutes, distanceKmLeft }: Props) {
    return (
        <Card className="rounded-3xl border-border/60 shadow-md overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Navigation className="size-5 text-primary" />
                    <span>Bản đồ hành trình GPS (Real-time)</span>
                </CardTitle>
                <span className="text-xs text-muted-foreground">
                    Tự động cập nhật mỗi 3s
                </span>
            </CardHeader>

            <CardContent className="p-0 relative">
                {/* Container chứa bản đồ Leaflet */}
                <div id="leaflet-tracking-map" className="h-[480px] w-full z-10" />

                {/* Card nổi hiển thị ETA */}
                <div className="absolute bottom-4 left-4 z-20 bg-card/90 backdrop-blur-md p-4 rounded-2xl border border-border/80 shadow-xl space-y-1">
                    <p className="text-[11px] font-bold text-muted-foreground uppercase">
                        DỰ KIẾN ĐẾN NƠI
                    </p>
                    <p className="text-2xl font-black text-primary">
                        ~ {etaMinutes} phút
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Khoảng cách còn lại:{" "}
                        <strong className="text-foreground">{distanceKmLeft} km</strong>
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}