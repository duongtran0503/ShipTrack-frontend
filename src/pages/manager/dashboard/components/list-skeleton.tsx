import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ListSkeleton() {
    return (
        <Card className="rounded-[24px] border-border/60 shadow-sm bg-card overflow-hidden">
            <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40">
                <Skeleton className="h-5 w-40 bg-muted/60" />
            </CardHeader>
            <CardContent className="p-6 space-y-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-4 rounded-2xl border border-border/50 bg-muted/10 flex items-center gap-4">
                        <Skeleton className="size-10 rounded-full bg-muted/60 shrink-0" />
                        <div className="space-y-2 w-full">
                            <Skeleton className="h-4 w-1/3 bg-muted/60" />
                            <Skeleton className="h-3 w-2/3 bg-muted/60" />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}