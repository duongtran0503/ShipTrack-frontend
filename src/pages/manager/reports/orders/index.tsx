import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrderReports, type DetailedOrderReportRow } from "@/pages/manager/reports/hooks/use-order-reports";
import { CheckCircle2, FileSpreadsheet, FileText, Loader2, Package, PieChart, Truck, XCircle } from "lucide-react";

export default function AdminOrderReportsPage() {
    const { reportData, isLoading, timeRange, setTimeRange, handleExportFile } = useOrderReports();

    if (isLoading || !reportData) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải báo cáo thống kê đơn hàng...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-12">
            {/* Header & Nút xuất file */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black text-foreground flex items-center gap-2">
                        <Package className="size-6 text-primary" />
                        <span>Báo cáo thống kê đơn hàng</span>
                    </h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Tổng hợp tình trạng đơn hàng, tỷ lệ hoàn thành và xu hướng tăng trưởng vận chuyển theo thời gian.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleExportFile("Excel")}
                        className="rounded-xl text-xs font-bold border-border/60 hover:bg-accent h-10"
                    >
                        <FileSpreadsheet className="size-4 mr-1.5 text-emerald-600" /> Xuất Excel
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleExportFile("PDF")}
                        className="rounded-xl text-xs font-bold border-border/60 hover:bg-accent h-10"
                    >
                        <FileText className="size-4 mr-1.5 text-rose-600" /> Xuất PDF
                    </Button>
                </div>
            </div>

            {/* Bộ lọc thời gian */}
            <div className="flex items-center justify-between bg-card p-4 rounded-[20px] border border-border/60 shadow-sm">
                <span className="text-xs font-bold text-foreground">Kỳ thống kê:</span>
                <div className="flex items-center gap-2">
                    {[
                        { label: "Theo Ngày", value: "DAY" },
                        { label: "Theo Tuần", value: "WEEK" },
                        { label: "Theo Tháng", value: "MONTH" },
                    ].map((tab) => (
                        <Button
                            key={tab.value}
                            variant={timeRange === tab.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTimeRange(tab.value as any)}
                            className="rounded-xl text-xs font-semibold h-9"
                        >
                            {tab.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Các thẻ tổng quan chỉ số đơn hàng */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <Card className="rounded-[20px] border-border/60 bg-card p-5 flex items-center gap-4">
                    <div className="size-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Package className="size-5" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground">Tổng đơn hàng</p>
                        <p className="text-2xl font-black text-foreground mt-0.5">{reportData.totalOrders.toLocaleString("vi-VN")}</p>
                    </div>
                </Card>

                <Card className="rounded-[20px] border-border/60 bg-card p-5 flex items-center gap-4">
                    <div className="size-11 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="size-5" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground">Đã hoàn thành</p>
                        <p className="text-2xl font-black text-foreground mt-0.5">{reportData.completedCount.toLocaleString("vi-VN")}</p>
                    </div>
                </Card>

                <Card className="rounded-[20px] border-border/60 bg-card p-5 flex items-center gap-4">
                    <div className="size-11 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                        <Truck className="size-5" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground">Đang đi giao</p>
                        <p className="text-2xl font-black text-foreground mt-0.5">{reportData.deliveringCount.toLocaleString("vi-VN")}</p>
                    </div>
                </Card>

                <Card className="rounded-[20px] border-border/60 bg-card p-5 flex items-center gap-4">
                    <div className="size-11 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
                        <XCircle className="size-5" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground">Đã hủy đơn</p>
                        <p className="text-2xl font-black text-foreground mt-0.5">{reportData.cancelledCount.toLocaleString("vi-VN")}</p>
                    </div>
                </Card>
            </div>

            {/* Grid 2 Biểu đồ: Trạng thái & Theo kỳ */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Biểu đồ Phân bổ trạng thái */}
                <Card className="rounded-[24px] border-border/60 shadow-sm bg-card">
                    <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                        <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                            <PieChart className="size-4 text-primary" /> Đơn hàng theo trạng thái
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        {reportData.statusStats.map((st) => {
                            const percent = ((st.count / reportData.totalOrders) * 100).toFixed(1);
                            return (
                                <div key={st.status} className="space-y-1.5 text-xs">
                                    <div className="flex items-center justify-between font-semibold">
                                        <span className="text-foreground">{st.label}</span>
                                        <span className="text-muted-foreground">{st.count} đơn ({percent}%)</span>
                                    </div>
                                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                                        <div style={{ width: `${percent}%` }} className={`h-full ${st.color} rounded-full`} />
                                    </div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>

                {/* Biểu đồ số lượng đơn hàng theo kỳ */}
                <Card className="rounded-[24px] border-border/60 shadow-sm bg-card lg:col-span-2">
                    <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                        <CardTitle className="text-sm font-bold text-foreground">Xu hướng đơn hàng theo kỳ</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-56 flex items-end justify-around gap-4 pt-6 px-4 bg-muted/20 rounded-2xl border border-border/50">
                            {reportData.dailyChartData.map((d, idx) => {
                                const total = d.completed + d.delivering + d.cancelled;
                                const heightPx = (total / 450) * 180;
                                return (
                                    <div key={idx} className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
                                        <span className="text-[10px] font-mono font-bold text-muted-foreground">{total} đơn</span>
                                        <div style={{ height: `${heightPx}px` }} className="w-full max-w-[48px] bg-primary rounded-t-xl transition-all hover:opacity-90 flex flex-col justify-end overflow-hidden">
                                            <div className="bg-rose-500 w-full" style={{ height: `${(d.cancelled / total) * 100}%` }} />
                                            <div className="bg-amber-500 w-full" style={{ height: `${(d.delivering / total) * 100}%` }} />
                                            <div className="bg-emerald-500 w-full" style={{ height: `${(d.completed / total) * 100}%` }} />
                                        </div>
                                        <span className="text-xs font-semibold text-foreground mt-1">{d.date}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bảng thống kê chi tiết */}
            <Card className="rounded-[24px] border-border/60 shadow-sm bg-card overflow-hidden">
                <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                    <CardTitle className="text-sm font-bold text-foreground">Bảng dữ liệu chi tiết đơn hàng</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border/40 bg-muted/30 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                                    <th className="p-4 pl-6">Thời gian</th>
                                    <th className="p-4">Tổng số đơn</th>
                                    <th className="p-4">Đã hoàn thành</th>
                                    <th className="p-4">Đang giao</th>
                                    <th className="p-4">Đã hủy</th>
                                    <th className="p-4 pr-6 text-right">Tỷ lệ hoàn thành</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/30 text-xs">
                                {reportData.detailedTable.map((row: DetailedOrderReportRow) => (
                                    <tr key={row.id} className="hover:bg-muted/20 transition-colors">
                                        <td className="p-4 pl-6 font-bold text-foreground">{row.date}</td>
                                        <td className="p-4 font-semibold text-foreground">{row.totalOrders} đơn</td>
                                        <td className="p-4 font-bold text-emerald-600">{row.completedOrders}</td>
                                        <td className="p-4 font-bold text-amber-600">{row.deliveringOrders}</td>
                                        <td className="p-4 font-bold text-rose-600">{row.cancelledOrders}</td>
                                        <td className="p-4 pr-6 text-right font-black text-primary">
                                            <Badge className="bg-primary/10 text-primary border-primary/20 text-[11px]">
                                                {row.completionRate}%
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}