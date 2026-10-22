import type { LucideIcon } from "lucide-react"

import { cn } from "cn"

interface Props {
    label: string
    value: string | number | undefined
    hint: string
    icon: LucideIcon
    isLoading?: boolean
    iconBgClass: string
    valueClass?: string
}

export function StatCard({
    label,
    value,
    hint,
    icon: Icon,
    isLoading,
    iconBgClass,
    valueClass,
}: Props) {
    return (
        <div className="p-5 rounded-3xl bg-card border border-border/60 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">
                    {label}
                </span>
                <div className={cn("p-2.5 rounded-2xl", iconBgClass)}>
                    <Icon className="size-5" />
                </div>
            </div>
            <p className={cn("text-2xl md:text-3xl font-extrabold text-foreground", valueClass)}>
                {isLoading ? "..." : value}
            </p>
            <p className="text-[11px] text-muted-foreground">{hint}</p>
        </div>
    )
}