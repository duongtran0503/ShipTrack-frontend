import { CheckpointTimeline } from "@/pages/manager/tracking/components/checkpoint-timeline";
import { PlaybackMap } from "@/pages/manager/tracking/components/playback-map";
import { TripList } from "@/pages/manager/tracking/components/trip-list";
import { useTrackingHistory } from "@/pages/manager/tracking/hooks/use-tracking-history";
import { History, Loader2 } from "lucide-react";


export default function AdminTrackingHistoryPage() {
    const {
        records,
        isLoading,
        selectedTrip,
        handleSelectTrip,
        searchTerm,
        setSearchTerm,
        isPlaying,
        togglePlay,
    } = useTrackingHistory();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải lịch sử hành trình vận chuyển...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-xl font-black text-foreground flex items-center gap-2">
                    <History className="size-6 text-primary" />
                    <span>Lịch sử hành trình & Phát lại (Playback)</span>
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                    Tra cứu và xem lại chi tiết lộ trình di chuyển của tài xế theo mốc thời gian hoàn thành chuyến đi.
                </p>
            </div>

            {/* Layout chính: Danh sách chuyến & Bản đồ playback + Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cột trái: Danh sách các chuyến */}
                <div className="lg:col-span-1">
                    <TripList
                        records={records}
                        selectedTrip={selectedTrip}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onSelectTrip={handleSelectTrip}
                    />
                </div>

                {/* Cột phải: Bản đồ + Timeline */}
                <div className="lg:col-span-2 space-y-6">
                    <PlaybackMap
                        selectedTrip={selectedTrip}
                        isPlaying={isPlaying}
                        onTogglePlay={togglePlay}
                    />
                    <CheckpointTimeline selectedTrip={selectedTrip} />
                </div>
            </div>
        </div>
    );
}