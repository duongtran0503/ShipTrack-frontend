import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRevenueReport } from "@/pages/manager/reports/hooks/use-revenue-report";
import { DollarSign, FileSpreadsheet, FileText, Loader2, ShoppingBag, TrendingUp } from "lucide-react";

export default function AdminRevenueReportPage() {
    const {
        revenueData,
        isLoading,
        timeRange,
        setTimeRange,
        tabType,
        setTabType,
        filteredBreakdown,
        handleExportFile,
    } = useRevenueReport();

    if (isLoading || !revenueData) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải báo cáo doanh thu hệ thống...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-12">
            {/* Header & Nút xuất file */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black text-foreground flex items-center gap-2">
                        <DollarSign className="size-6 text-primary" />
                        <span>Báo cáo doanh thu & Tài chính</span>
                    </h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Tổng hợp doanh thu hệ thống, phí hoa hồng và phân tích theo tài xế hoặc khu vực dịch vụ.
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

            {/* Thanh bộ lọc thời gian */}
            <div className="flex items-center justify-between bg-card p-4 rounded-[20px] border border-border/60 shadow-sm">
                <span className="text-xs font-bold text-foreground">Bộ lọc thời gian báo cáo:</span>
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

            {/* Thẻ tổng quan doanh thu */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="rounded-[20px] border-border/60 bg-card p-5 flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                        <DollarSign className="size-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground">Tổng doanh thu hệ thống</p>
                        <p className="text-2xl font-black text-foreground mt-0.5">{revenueData.totalRevenue.toLocaleString("vi-VN")} đ</p>
                    </div>
                </Card>

                <Card className="rounded-[20px] border-border/60 bg-card p-5 flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                        <ShoppingBag className="size-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground">Tổng số đơn hoàn thành</p>
                        <p className="text-2xl font-black text-foreground mt-0.5">{revenueData.totalOrders} đơn</p>
                    </div>
                </Card>

                <Card className="rounded-[20px] border-border/60 bg-card p-5 flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                        <TrendingUp className="size-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground">Tốc độ tăng trưởng</p>
                        <p className="text-sm font-black text-emerald-600 mt-1">{revenueData.growthRate}</p>
                    </div>
                </Card>
            </div>

            {/* Biểu đồ doanh thu trực quan (Simulation Recharts/Chart) */}
            <Card className="rounded-[24px] border-border/60 shadow-sm bg-card">
                <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                    <CardTitle className="text-sm font-bold text-foreground">Biểu đồ tăng trưởng doanh thu theo kỳ</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="h-64 flex items-end justify-around gap-4 pt-6 px-4 bg-muted/20 rounded-2xl border border-border/50">
                        {revenueData.chartData.map((item, idx) => {
                            const maxHeight = 200;
                            const heightPx = (item.value / 50000000) * maxHeight;
                            return (
                                <div key={idx} className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
                                    <span className="text-[10px] font-mono font-bold text-muted-foreground">
                                        {(item.value / 1000000).toFixed(0)}Tr đ
                                    </span>
                                    <div
                                        style={{ height: `${heightPx}px` }}
                                        className="w-full max-w-[60px] bg-primary rounded-t-xl transition-all duration-500 hover:opacity-90"
                                    />
                                    <span className="text-xs font-semibold text-foreground mt-1">{item.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Bảng chi tiết doanh thu phân theo Tài xế / Khu vực */}
            <Card className="rounded-[24px] border-border/60 shadow-sm bg-card overflow-hidden">
                <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-bold text-foreground">Chi tiết phân bổ doanh thu</CardTitle>
                    <div className="flex items-center gap-1.5 bg-muted/50 p-1 rounded-xl border border-border/60">
                        <Button
                            size="sm"
                            variant={tabType === "DRIVER" ? "default" : "ghost"}
                            onClick={() => setTabType("DRIVER")}
                            className="rounded-lg text-xs h-7 px-3 font-semibold"
                        >
                            Theo tài xế
                        </Button>
                        <Button
                            size="sm"
                            variant={tabType === "AREA" ? "default" : "ghost"}
                            onClick={() => setTabType("AREA")}
                            className="rounded-lg text-xs h-7 px-3 font-semibold"
                        >
                            Theo khu vực
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border/40 bg-muted/30 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                                    <th className="p-4 pl-6">{tabType === "DRIVER" ? "Tên tài xế" : "Khu vực phục vụ"}</th>
                                    <th className="p-4">Số lượng đơn</th>
                                    <th className="p-4">Tổng doanh thu</th>
                                    <th className="p-4 pr-6 text-right">Hoa hồng hệ thống thu</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/30 text-xs">
                                {filteredBreakdown.length > 0 ? (
                                    filteredBreakdown.map((row) => (
                                        <tr key={row.id} className="hover:bg-muted/20 transition-colors">
                                            <td className="p-4 pl-6 font-bold text-foreground">{row.name}</td>
                                            <td className="p-4 font-semibold text-foreground">{row.totalOrders} đơn</td>
                                            <td className="p-4 font-black text-shiptrack-price">{row.totalRevenue.toLocaleString("vi-VN")} đ</td>
                                            <td className="p-4 pr-6 text-right font-bold text-emerald-600">
                                                +{row.commissionFee.toLocaleString("vi-VN")} đ
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center py-12 text-xs text-muted-foreground">
                                            Không có dữ liệu doanh thu phù hợp.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}