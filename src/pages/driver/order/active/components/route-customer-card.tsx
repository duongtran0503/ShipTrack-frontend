import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone } from "lucide-react";

interface Props {
    receiverName: string;
    receiverPhone: string;
}

export function RouteCustomerCard({ receiverName, receiverPhone }: Props) {
    return (
        <Card className="rounded-[28px] border-border/60 shadow-sm bg-card p-6 space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Phone className="size-4 text-primary" /> Khách hàng nhận
            </h3>
            <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-base">
                    {receiverName?.charAt(0) || "K"}
                </div>
                <div>
                    <h4 className="text-xs font-bold text-foreground">{receiverName}</h4>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Phone className="size-3" /> {receiverPhone}
                    </p>
                </div>
            </div>
            <div className="pt-2">
                <Button

                    className="w-full h-11 rounded-2xl bg-primary/10 text-primary hover:bg-primary/20 font-bold text-xs shadow-none cursor-pointer"
                >
                    <a href={`tel:${receiverPhone}`} className="flex gap-x-2">
                        <Phone className="size-4 mr-2" /> Gọi điện thông báo sắp đến
                    </a>
                </Button>
            </div>
        </Card>
    );
}