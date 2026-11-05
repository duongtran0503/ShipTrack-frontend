import { Button } from "@/components/ui/button";
import { Package, Pause, Play } from "lucide-react";
import type { TripHistoryRecord } from "../hooks/use-tracking-history";

interface Props {
    selectedTrip: TripHistoryRecord | null;
    isPlaying: boolean;
    onTogglePlay: () => void;
}

export function PlaybackMap({ selectedTrip, isPlaying, onTogglePlay }: Props) {
    return (
        <div className="relative h-[360px] rounded-[24px] overflow-hidden border border-border/60 shadow-sm bg-muted/30 flex items-center justify-center">
            {/* Background Lưới */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />

            {selectedTrip ? (
                <div className="absolute inset-6 flex flex-col justify-between pointer-events-none">
                    {/* Thông tin chuyến đi */}
                    <div className="bg-card/90 backdrop-blur-md p-3 rounded-2xl border border-border/60 shadow-lg w-fit pointer-events-auto">
                        <p className="font-bold text-xs text-foreground flex items-center gap-1.5">
                            <Package className="size-4 text-primary" /> #{selectedTrip.trackingCode} - Tài xế: {selectedTrip.driverName}
                        </p>
                    </div>

                    {/* Thanh điều khiển Playback */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-card/90 backdrop-blur-md p-3 rounded-2xl border border-border/60 shadow-lg pointer-events-auto gap-3">
                        <Button
                            size="sm"
                            onClick={onTogglePlay}
                            className="rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-4 w-full sm:w-auto"
                        >
                            {isPlaying ? <Pause className="size-4 mr-1.5" /> : <Play className="size-4 mr-1.5" />}
                            {isPlaying ? "Tạm dừng Playback" : "Phát lại hành trình"}
                        </Button>
                        <span className="text-[10px] sm:text-xs text-muted-foreground font-mono">
                            Lộ trình: {selectedTrip.checkpoints[0].locationName} ➔ {selectedTrip.checkpoints[selectedTrip.checkpoints.length - 1].locationName}
                        </span>
                    </div>
                </div>
            ) : (
                <p className="text-xs text-muted-foreground">Vui lòng chọn một chuyến đi để xem lộ trình.</p>
            )}
        </div>
    );
}