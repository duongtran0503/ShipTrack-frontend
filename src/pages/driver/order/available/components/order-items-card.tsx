import { Card } from "@/components/ui/card";

interface Props {
    itemDescription: string;
    itemWeight: string;
    noteForDriver: string;
}

export function OrderItemsCard({ itemDescription, itemWeight, noteForDriver }: Props) {
    return (
        <Card className="rounded-[24px] border-border/50 shadow-sm bg-card p-6 space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Thông tin hàng hóa</h3>
            <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                    <span className="text-muted-foreground">Loại hàng:</span>
                    <span className="font-bold text-foreground">{itemDescription}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                    <span className="text-muted-foreground">Trọng lượng:</span>
                    <span className="font-bold text-foreground">{itemWeight}</span>
                </div>
                <div className="space-y-1 pt-1">
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold">Ghi chú từ khách:</span>
                    <p className="p-2.5 rounded-xl bg-amber-500/10 text-amber-900 dark:text-amber-200 text-[11px] italic leading-relaxed">
                        "{noteForDriver}"
                    </p>
                </div>
            </div>
        </Card>
    );
}