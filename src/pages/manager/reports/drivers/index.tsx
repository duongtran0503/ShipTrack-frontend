import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDriverPerformanceReport, type DriverPerformanceItem } from "@/pages/manager/reports/hooks/use-driver-performance-report";
import { Award, FileSpreadsheet, FileText, Loader2, Search, Star, Users } from "lucide-react";

export default function AdminDriverPerformancePage() {
    const {
        drivers,
        isLoading,
        timeRange,
        setTimeRange,
        searchTerm,
        setSearchTerm,
        handleExportFile,
    } = useDriverPerformanceReport();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải báo cáo hiệu suất tài xế...
            </div>
        );
    }

    const renderRankBadge = (rank: number) => {
        if (rank === 1) return <span className="text-base font-black px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20">🥇 Top 1</span>;
        if (rank === 2) return <span className="text-base font-black px-2.5 py-1 rounded-xl bg-slate-400/10 text-slate-600 border border-slate-400/20">🥈 Top 2</span>;
        if (rank === 3) return <span className="text-base font-black px-2.5 py-1 rounded-xl bg-amber-700/10 text-amber-700 border border-amber-700/20">🥉 Top 3</span>;
        return <span className="text-xs font-bold text-muted-foreground px-3 py-1">#{rank}</span>;
    };

    return (
        <div className="w-full space-y-6 pb-12">
            {/* Header & Nút xuất file */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black text-foreground flex items-center gap-2">
                        <Award className="size-6 text-primary" />
                        <span>Báo cáo hiệu suất & Bảng xếp hạng tài xế</span>
                    </h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Đánh giá năng suất vận chuyển, tỷ lệ hoàn thành chuyến đi, điểm đánh giá trung bình và thu nhập tài xế.
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

            {/* Thanh bộ lọc thời gian & Tìm kiếm */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card p-4 rounded-[20px] border border-border/60 shadow-sm">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                        placeholder="Tìm tên tài xế, SĐT..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 text-xs rounded-xl border-border/60 h-10"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
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

            {/* Bảng xếp hạng tài xế */}
            <Card className="rounded-[24px] border-border/60 shadow-sm bg-card overflow-hidden">
                <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                    <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                        <Users className="size-4 text-primary" /> Bảng xếp hạng hiệu suất tài xế hàng đầu
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border/40 bg-muted/30 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                                    <th className="p-4 pl-6">Xếp hạng</th>
                                    <th className="p-4">Tài xế</th>
                                    <th className="p-4">Số chuyến hoàn thành</th>
                                    <th className="p-4">Tỷ lệ thành công</th>
                                    <th className="p-4">Đánh giá TB</th>
                                    <th className="p-4 pr-6 text-right">Tổng thu nhập</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/30 text-xs">
                                {drivers.length > 0 ? (
                                    drivers.map((driver: DriverPerformanceItem) => (
                                        <tr key={driver.driverId} className="hover:bg-muted/20 transition-colors">
                                            <td className="p-4 pl-6">{renderRankBadge(driver.rank)}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={driver.avatar || "https://github.com/shadcn.png"}
                                                        alt={driver.driverName}
                                                        className="size-9 rounded-full object-cover border border-border"
                                                    />
                                                    <div>
                                                        <p className="font-bold text-foreground">{driver.driverName}</p>
                                                        <p className="text-[10px] text-muted-foreground">{driver.phone}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 font-bold text-foreground">{driver.totalTrips} chuyến</td>
                                            <td className="p-4">
                                                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] font-bold">
                                                    {driver.completionRate}%
                                                </Badge>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1 font-bold text-foreground">
                                                    <Star className="size-3.5 text-amber-500 fill-amber-500" />
                                                    <span>{driver.ratingAvg}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 pr-6 text-right font-black text-shiptrack-price">
                                                {driver.totalIncome.toLocaleString("vi-VN")} đ
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center py-12 text-xs text-muted-foreground">
                                            Không tìm thấy tài xế nào phù hợp.
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