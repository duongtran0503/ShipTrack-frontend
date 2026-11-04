import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { Loader2, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import type { ChartItemDto } from "../hooks/use-driver-earnings";

interface Props {
    chartTab: "WEEK" | "MONTH";
    setChartTab: (val: "WEEK" | "MONTH") => void;
    chartData: ChartItemDto[];
    isLoading: boolean;
}

const chartConfig = {
    income: {
        label: "Thu nhập",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

export function EarningsChartCard({ chartTab, setChartTab, chartData, isLoading }: Props) {
    return (
        <Card className="rounded-[28px] border-border/60 shadow-sm bg-card overflow-hidden">
            <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                    <TrendingUp className="size-5 text-primary" />
                    <span>Biểu đồ biến động thu nhập</span>
                </CardTitle>
                <div className="flex bg-muted/60 p-1 rounded-xl">
                    <button
                        onClick={() => setChartTab("WEEK")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${chartTab === "WEEK" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                            }`}
                    >
                        Theo Tuần
                    </button>
                    <button
                        onClick={() => setChartTab("MONTH")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${chartTab === "MONTH" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                            }`}
                    >
                        Theo Tháng
                    </button>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                {isLoading ? (
                    <div className="flex items-center justify-center h-[280px] w-full text-xs text-muted-foreground">
                        <Loader2 className="size-5 animate-spin text-primary mr-2" />
                        Đang tải biểu đồ...
                    </div>
                ) : (
                    <ChartContainer config={chartConfig} className="w-full h-[280px]">
                        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
                            <XAxis
                                dataKey="label"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                className="text-xs font-semibold fill-muted-foreground"
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                tickFormatter={(value) => `${value >= 1000 ? `${value / 1000}k` : value}`}
                                className="text-xs font-semibold fill-muted-foreground"
                            />
                            <ChartTooltip
                                cursor={{ stroke: "var(--muted)", strokeWidth: 2 }}
                                content={<ChartTooltipContent indicator="line" className="rounded-2xl shadow-xl border-border/60 bg-card p-3" />}
                            />
                            <Line
                                type="monotone"
                                dataKey="income"
                                stroke="var(--color-income)"
                                strokeWidth={3}
                                dot={{ r: 4, fill: "var(--color-income)", strokeWidth: 2, stroke: "var(--background)" }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
}