import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface Props {
    chartData: Array<{ label: string; completed: number; failed: number }>;
    statPeriodTab: "WEEK" | "MONTH";
    setStatPeriodTab: (val: "WEEK" | "MONTH") => void;
}

const chartConfig = {
    completed: { label: "Hoàn thành", color: "#10b981" }, // Emerald
    failed: { label: "Thất bại", color: "#ef4444" }, // Red
} satisfies ChartConfig;

export function StatisticsChartCard({ chartData, statPeriodTab, setStatPeriodTab }: Props) {
    return (
        <Card className="rounded-[28px] border-border/60 shadow-sm bg-card overflow-hidden">
            <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                        <TrendingUp className="size-5 text-primary" />
                        <span>Biểu đồ so sánh hiệu suất vận chuyển</span>
                    </CardTitle>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                        <span className="flex items-center gap-1.5 font-semibold">
                            <span className="size-2.5 rounded-full bg-emerald-500 inline-block" /> Hoàn thành
                        </span>
                        <span className="flex items-center gap-1.5 font-semibold">
                            <span className="size-2.5 rounded-full bg-destructive inline-block" /> Thất bại
                        </span>
                    </div>
                </div>

                <div className="flex bg-muted/60 p-1 rounded-xl">
                    <button
                        onClick={() => setStatPeriodTab("WEEK")}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${statPeriodTab === "WEEK" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                            }`}
                    >
                        Theo Tuần
                    </button>
                    <button
                        onClick={() => setStatPeriodTab("MONTH")}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${statPeriodTab === "MONTH" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                            }`}
                    >
                        Theo Tháng
                    </button>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <ChartContainer config={chartConfig} className="w-full h-[300px]">
                    <BarChart data={chartData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }} barGap={4}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
                        <XAxis
                            dataKey="label"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={12}
                            className="text-xs font-semibold fill-muted-foreground"
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={12}
                            className="text-xs font-semibold fill-muted-foreground"
                        />
                        <ChartTooltip
                            cursor={{ fill: "var(--muted)", opacity: 0.2, radius: 8 }}
                            content={<ChartTooltipContent indicator="line" className="rounded-2xl shadow-xl border-border/60 bg-card p-3" />}
                        />
                        <Bar dataKey="completed" fill="var(--color-completed)" radius={[4, 4, 0, 0]} maxBarSize={32} />
                        <Bar dataKey="failed" fill="var(--color-failed)" radius={[4, 4, 0, 0]} maxBarSize={32} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}