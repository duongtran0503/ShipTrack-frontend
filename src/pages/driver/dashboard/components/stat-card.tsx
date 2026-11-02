import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
    label: string;
    value: ReactNode;
    hint?: ReactNode;
    icon: LucideIcon;
    iconBgClass?: string;
    iconColorClass?: string;
    hoverBorderClass?: string;
    valueClass?: string;
    onClick?: () => void;
}

export function StatCard({
    label,
    value,
    hint,
    icon: Icon,
    iconBgClass = "bg-primary/10",
    iconColorClass = "text-primary",
    hoverBorderClass = "hover:border-primary/40",
    valueClass = "text-foreground",
    onClick,
}: Props) {
    return (
        <Card
            onClick={onClick}
            className={`rounded-[20px] border-border/60 shadow-sm ${hoverBorderClass} transition-all cursor-pointer group bg-card`}
        >
            <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {label}
                    </p>
                    <h4 className={`text-2xl font-black ${valueClass}`}>{value}</h4>
                    {hint && <div className="pt-1">{hint}</div>}
                </div>
                <div
                    className={`size-12 rounded-2xl ${iconBgClass} ${iconColorClass} flex items-center justify-center shrink-0`}
                >
                    <Icon className="size-6" />
                </div>
            </CardContent>
        </Card>
    );
}