import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { CheckCircle2, MoreHorizontal, TrendingUp, XCircle } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "recharts";
import type { ChartItem } from "../hooks/use-driver-history";

interface Props {
    chartPeriodTab: "WEEK" | "MONTH";
    setChartPeriodTab: (val: "WEEK" | "MONTH") => void;
    chartData: ChartItem[];
    completionRate: string;
    totalCompleted: number;
    totalFailed: number;
}

// ================= CẤU HÌNH BIỂU ĐỒ CỘT =================
const barChartConfig = {
    completed: { label: "Hoàn thành", color: "#10b981" },
    failed: { label: "Thất bại", color: "#ef4444" },
} satisfies ChartConfig;

// ================= CẤU HÌNH BIỂU ĐỒ TRÒN KHUYẾT =================
const pieChartConfig = {
    rate: { label: "Tỷ lệ" },
    completed: { label: "Hoàn thành", color: "#10b981" },
    failed: { label: "Thất bại", color: "var(--muted)" },
} satisfies ChartConfig;

export function HistoryChartCard({
    chartPeriodTab,
    setChartPeriodTab,
    chartData,
    completionRate,
    totalCompleted,
    totalFailed,
}: Props) {
    const rateNumber = parseFloat(completionRate) || 0;

    // Data cho biểu đồ bán nguyệt (180 độ)
    const pieData = [
        { name: "completed", value: rateNumber, fill: "#10b981" },
        { name: "failed", value: Math.max(0, 100 - rateNumber), fill: "var(--muted)" },
    ];

    return (
        <Card className="rounded-[28px] border-border/60 shadow-sm bg-card overflow-hidden">
            <CardHeader className="pb-4 pt-6 px-6 border-b border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                        <TrendingUp className="size-5 text-primary" />
                        <span>Báo cáo & Hiệu suất giao hàng</span>
                    </CardTitle>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex bg-muted/60 p-1 rounded-xl">
                        <button
                            onClick={() => setChartPeriodTab("WEEK")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${chartPeriodTab === "WEEK" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Tuần
                        </button>
                        <button
                            onClick={() => setChartPeriodTab("MONTH")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${chartPeriodTab === "MONTH" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Tháng
                        </button>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-all">
                        <MoreHorizontal className="size-5" />
                    </button>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border/40">

                    {/* ================= CỘT TRÁI: BIỂU ĐỒ CỘT ================= */}
                    <div className="lg:col-span-7 p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-foreground">Số lượng đơn hàng</h3>
                            <div className="flex items-center gap-4 text-[11px] text-muted-foreground font-semibold">
                                <span className="flex items-center gap-1.5">
                                    <span className="size-2.5 rounded-full bg-emerald-500 inline-block" /> Hoàn thành
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="size-2.5 rounded-full bg-destructive inline-block" /> Thất bại
                                </span>
                            </div>
                        </div>

                        {/* Định nghĩa Gradient */}
                        <svg style={{ height: 0, width: 0, position: 'absolute' }}>
                            <defs>
                                <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#059669" stopOpacity={0.9} />
                                </linearGradient>
                                <linearGradient id="failedGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#f87171" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#dc2626" stopOpacity={0.9} />
                                </linearGradient>
                            </defs>
                        </svg>

                        <ChartContainer config={barChartConfig} className="w-full h-[280px]">
                            <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barGap={4}>
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
                                <Bar dataKey="completed" fill="url(#completedGradient)" radius={[6, 6, 0, 0]} maxBarSize={28} />
                                <Bar dataKey="failed" fill="url(#failedGradient)" radius={[6, 6, 0, 0]} maxBarSize={28} />
                            </BarChart>
                        </ChartContainer>
                    </div>

                    {/* ================= CỘT PHẢI: BIỂU ĐỒ BÁN NGUYỆT ================= */}
                    <div className="lg:col-span-5 p-6 flex flex-col justify-between">
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-foreground text-center">Tỷ lệ hoàn thành</h3>

                            <div className="relative w-full h-[160px] flex items-center justify-center mt-2">
                                <ChartContainer config={pieChartConfig} className="w-full h-full">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="85%"
                                            startAngle={180}
                                            endAngle={0}
                                            innerRadius={70}
                                            outerRadius={100}
                                            cornerRadius={8}
                                            stroke="none"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ChartContainer>

                                {/* Nhãn % căn giữa đè lên biểu đồ bán nguyệt */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
                                    <span className="text-3xl font-black text-foreground block leading-none tracking-tight">
                                        {completionRate}%
                                    </span>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1 block">
                                        Hoàn thành
                                    </span>
                                </div>
                            </div>

                            <p className="text-center text-[11px] font-medium text-muted-foreground px-4 pt-2">
                                Tổng hợp hiệu suất thực tế từ các chuyến giao hàng đã hoàn thành.
                            </p>
                        </div>

                        {/* Thẻ thống kê tổng hợp (Bottom Cards) */}
                        <div className="grid grid-cols-2 gap-3 mt-6">
                            <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 border border-border/40">
                                <div className="size-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="size-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Hoàn thành</p>
                                    <p className="text-sm font-black text-foreground">{totalCompleted} <span className="text-[10px] text-muted-foreground font-normal">đơn</span></p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 border border-border/40">
                                <div className="size-9 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                                    <XCircle className="size-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Thất bại</p>
                                    <p className="text-sm font-black text-foreground">{totalFailed} <span className="text-[10px] text-muted-foreground font-normal">đơn</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}