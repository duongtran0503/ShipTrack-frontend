import { Clock } from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import type { TimelineStep } from "@/pages/customer/order/detail/helpers/order-timeline"

interface Props {
    steps: TimelineStep[]
}

export function OrderTimeline({ steps }: Props) {
    return (
        <Card className="rounded-3xl border-border/60 shadow-md">
            <CardHeader className="pb-4 border-b border-border/60">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Clock className="size-5 text-primary" />
                    <span>Hành trình đơn hàng (Timeline)</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="pt-6">
                <div className="relative border-l-2 border-border/80 ml-4 space-y-8 pl-6">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative">
                            <span
                                className={`absolute -left-[31px] top-0 size-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step.current
                                    ? "bg-primary text-white ring-4 ring-primary/20 scale-110"
                                    : step.completed
                                        ? "bg-emerald-500 text-white"
                                        : "bg-muted border-2 border-border text-muted-foreground"
                                    }`}
                            >
                                {step.completed ? "✓" : idx + 1}
                            </span>

                            <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <h4
                                        className={`text-sm font-bold ${step.current
                                            ? "text-primary"
                                            : step.completed
                                                ? "text-foreground"
                                                : "text-muted-foreground"
                                            }`}
                                    >
                                        {step.title}
                                    </h4>
                                    {step.time && (
                                        <span className="text-[11px] font-medium text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md">
                                            {step.time}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}