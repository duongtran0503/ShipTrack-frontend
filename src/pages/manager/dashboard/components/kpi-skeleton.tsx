import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function KpiSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {[...Array(4)].map((_, i) => (
                <Card key={i} className="rounded-[24px] border-border/60 shadow-sm bg-card p-6">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-24 bg-muted/60" />
                        <Skeleton className="size-11 rounded-2xl bg-muted/60" />
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                        <Skeleton className="h-8 w-16 bg-muted/60" />
                        <Skeleton className="h-4 w-20 bg-muted/60" />
                    </div>
                </Card>
            ))}
        </div>
    );
}