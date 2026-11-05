import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { TripHistoryRecord } from "../hooks/use-tracking-history";

interface Props {
    records: TripHistoryRecord[];
    selectedTrip: TripHistoryRecord | null;
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    onSelectTrip: (trip: TripHistoryRecord) => void;
}

export function TripList({ records, selectedTrip, searchTerm, setSearchTerm, onSelectTrip }: Props) {
    return (
        <Card className="rounded-[24px] border-border/60 shadow-sm bg-card overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-border/40 bg-muted/30">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                        placeholder="Tìm mã vận đơn, tài xế..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 text-xs rounded-xl border-border/60 h-9"
                    />
                </div>
            </div>
            <CardContent className="p-4 space-y-3 overflow-y-auto max-h-[520px] flex-1">
                {records.length > 0 ? (
                    records.map((trip) => (
                        <button
                            key={trip.id}
                            onClick={() => onSelectTrip(trip)}
                            className={`w-full text-left p-3.5 rounded-2xl border transition-all ${selectedTrip?.id === trip.id
                                ? "bg-primary/5 border-primary shadow-sm"
                                : "bg-card border-border/60 hover:bg-muted/40"
                                }`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-primary text-xs">#{trip.trackingCode}</span>
                                <Badge className="text-[9px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-none">
                                    Hoàn thành
                                </Badge>
                            </div>
                            <p className="font-semibold text-foreground text-xs">{trip.driverName}</p>
                            <p className="text-[10px] text-muted-foreground mt-1 flex items-center justify-between">
                                <span>Ngày: {trip.date}</span>
                                <span>{trip.checkpoints.length} mốc GPS</span>
                            </p>
                        </button>
                    ))
                ) : (
                    <div className="text-center py-10 text-xs text-muted-foreground">
                        Không tìm thấy chuyến đi nào.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}