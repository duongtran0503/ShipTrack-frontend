import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReviewsReport } from "@/pages/manager/reports/hooks/use-reviews-report";
import {
    AlertTriangle,
    FileSpreadsheet,
    FileText,
    Loader2,
    MessageSquare,
    Star,
    ThumbsDown,
    UserCheck,
} from "lucide-react";

export default function AdminReviewsReportPage() {
    const { reportData, isLoading, timeRange, setTimeRange, handleExportFile } = useReviewsReport();

    if (isLoading || !reportData) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải báo cáo thống kê đánh giá...
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 pb-12">
            {/* Header & Nút xuất file */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black text-foreground flex items-center gap-2">
                        <Star className="size-6 text-amber-500 fill-amber-500" />
                        <span>Báo cáo thống kê đánh giá chất lượng</span>
                    </h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Phân tích phản hồi từ khách hàng, phân bố số sao và theo dõi các đánh giá tiêu cực cần xử lý.
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
                <span className="text-xs font-bold text-foreground">Kỳ báo cáo:</span>
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

            {/* Các thẻ tổng quan chỉ số đánh giá */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="rounded-[20px] border-border/60 bg-card p-5 flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                        <Star className="size-6 fill-amber-500" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground">Đánh giá trung bình</p>
                        <p className="text-2xl font-black text-foreground mt-0.5">{reportData.averageRating} / 5.0</p>
                    </div>
                </Card>

                <Card className="rounded-[20px] border-border/60 bg-card p-5 flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                        <MessageSquare className="size-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground">Tổng số lượt đánh giá</p>
                        <p className="text-2xl font-black text-foreground mt-0.5">{reportData.totalReviews.toLocaleString("vi-VN")}</p>
                    </div>
                </Card>

                <Card className="rounded-[20px] border-border/60 bg-card p-5 flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
                        <ThumbsDown className="size-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground">Tỷ lệ đánh giá tiêu cực (1-2★)</p>
                        <p className="text-2xl font-black text-rose-600 mt-0.5">{reportData.negativeRate}</p>
                    </div>
                </Card>
            </div>

            {/* Grid phân bố sao & Thống kê theo tài xế */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Biểu đồ Phân bố số sao */}
                <Card className="rounded-[24px] border-border/60 shadow-sm bg-card">
                    <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                        <CardTitle className="text-sm font-bold text-foreground">Phân bố số sao đánh giá</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-3">
                        {reportData.starDistribution.map((item) => (
                            <div key={item.stars} className="flex items-center gap-3 text-xs">
                                <span className="font-bold text-foreground w-10 flex items-center gap-1">
                                    {item.stars} <Star className="size-3 text-amber-500 fill-amber-500" />
                                </span>
                                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                                    <div
                                        style={{ width: `${item.percentage}%` }}
                                        className={`h-full rounded-full ${item.stars <= 2 ? "bg-rose-500" : "bg-amber-500"}`}
                                    />
                                </div>
                                <span className="text-[11px] text-muted-foreground font-mono w-16 text-right">
                                    {item.count} ({item.percentage}%)
                                </span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Bảng thống kê đánh giá theo tài xế */}
                <Card className="rounded-[24px] border-border/60 shadow-sm bg-card lg:col-span-2">
                    <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                        <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                            <UserCheck className="size-4 text-primary" /> Thống kê đánh giá theo tài xế
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto w-full">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-border/40 bg-muted/30 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                                        <th className="p-4 pl-6">Tài xế</th>
                                        <th className="p-4">Tổng lượt</th>
                                        <th className="p-4">Đánh giá TB</th>
                                        <th className="p-4">Lượt 5★</th>
                                        <th className="p-4 pr-6 text-right">Lượt tiêu cực (1-2★)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/30 text-xs">
                                    {reportData.driverSummaries.map((driver) => (
                                        <tr key={driver.driverId} className="hover:bg-muted/20 transition-colors">
                                            <td className="p-4 pl-6">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={driver.avatar || "https://github.com/shadcn.png"}
                                                        alt={driver.driverName}
                                                        className="size-8 rounded-full object-cover border border-border"
                                                    />
                                                    <div>
                                                        <p className="font-bold text-foreground">{driver.driverName}</p>
                                                        <p className="text-[10px] text-muted-foreground">{driver.phone}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 font-semibold text-foreground">{driver.totalReviews}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1 font-bold text-foreground">
                                                    <Star className="size-3.5 text-amber-500 fill-amber-500" />
                                                    <span>{driver.ratingAvg}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 font-bold text-emerald-600">{driver.fiveStarCount}</td>
                                            <td className="p-4 pr-6 text-right">
                                                {driver.negativeCount > 0 ? (
                                                    <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/20 text-[10px] font-bold">
                                                        {driver.negativeCount} lượt
                                                    </Badge>
                                                ) : (
                                                    <span className="text-muted-foreground text-[11px]">0</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Danh sách các đánh giá tiêu cực gần đây cần lưu ý */}
            <Card className="rounded-[24px] border-border/60 shadow-sm bg-card overflow-hidden">
                <CardHeader className="pb-3 pt-5 px-6 border-b border-border/40">
                    <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2 text-rose-600">
                        <AlertTriangle className="size-4" /> Danh sách đánh giá tiêu cực (1-2★) gần đây
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    {reportData.negativeReviews.length > 0 ? (
                        reportData.negativeReviews.map((rev) => (
                            <div key={rev.id} className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-xs space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-foreground">{rev.customerName}</span>
                                        <span className="text-muted-foreground text-[10px]">đã đánh giá tài xế</span>
                                        <span className="font-bold text-primary">{rev.driverName}</span>
                                        <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">#{rev.orderCode}</Badge>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: rev.stars }).map((_, i) => (
                                            <Star key={i} className="size-3.5 text-amber-500 fill-amber-500" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-foreground italic bg-card p-2.5 rounded-xl border border-border/60">"{rev.comment}"</p>
                                <p className="text-[10px] text-muted-foreground text-right">{rev.createdAt}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-xs text-muted-foreground text-center py-4">Không có đánh giá tiêu cực nào trong kỳ báo cáo này.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}