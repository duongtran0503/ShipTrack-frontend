import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import type { TripHistoryRecord } from "../hooks/use-tracking-history";

interface Props {
    selectedTrip: TripHistoryRecord | null;
}

export function CheckpointTimeline({ selectedTrip }: Props) {
    return (
        <Card className="rounded-[24px] border-border/60 shadow-sm bg-card">
            <CardContent className="p-6 space-y-4">
                <h3 className="text-sm font-black text-foreground flex items-center gap-2">
                    <Clock className="size-4 text-primary" />
                    <span>Timeline mốc thời gian hành trình</span>
                </h3>

                {selectedTrip ? (
                    <div className="space-y-4 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-border/60">
                        {selectedTrip.checkpoints.map((cp, idx) => (
                            <div key={idx} className="relative flex items-start gap-4 pl-8">
                                <span className="absolute left-1.5 top-1 size-3 rounded-full bg-primary border-2 border-background shadow" />
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-bold text-foreground text-xs">{cp.locationName}</span>
                                        <span className="text-[10px] text-muted-foreground font-mono font-semibold bg-muted/50 px-1.5 py-0.5 rounded">
                                            {cp.time}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">{cp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-6 text-xs text-muted-foreground">
                        Chưa có dữ liệu mốc thời gian.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}