import { Card } from "@/components/ui/card";
import { Phone } from "lucide-react";

interface Props {
    customerName: string;
    customerPhone: string;
}

export function CustomerInfoCard({ customerName, customerPhone }: Props) {
    return (
        <Card className="rounded-[24px] border-border/50 shadow-sm bg-card p-6 space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Khách hàng</h3>
            <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                    {customerName.charAt(0)}
                </div>
                <div>
                    <h4 className="text-xs font-bold text-foreground">{customerName}</h4>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Phone className="size-3" /> {customerPhone}
                    </p>
                </div>
            </div>
        </Card>
    );
}