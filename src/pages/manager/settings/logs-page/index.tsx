import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSystemLogs, type SystemLogItem } from "@/pages/manager/settings/hooks/use-system-logs";
import {
    AlertOctagon,
    AlertTriangle,
    Download,
    Info,
    Loader2,
    Search,
    Terminal,
} from "lucide-react";

export default function AdminSystemLogsPage() {
    const {
        logs,
        isLoading,
        searchTerm,
        setSearchTerm,
        levelFilter,
        setLevelFilter,
        handleExportLogs,
    } = useSystemLogs();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 text-xs text-muted-foreground w-full">
                <Loader2 className="size-6 animate-spin text-primary mr-2" />
                Đang tải nhật ký hệ thống (System Logs)...
            </div>
        );
    }

    const renderLevelBadge = (level: "INFO" | "WARNING" | "ERROR") => {
        if (level === "ERROR") {
            return (
                <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/20 text-[10px] font-bold flex items-center gap-1 w-fit">
                    <AlertOctagon className="size-3" /> ERROR
                </Badge>
            );
        }
        if (level === "WARNING") {
            return (
                <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px] font-bold flex items-center gap-1 w-fit">
                    <AlertTriangle className="size-3" /> WARNING
                </Badge>
            );
        }
        return (
            <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 text-[10px] font-bold flex items-center gap-1 w-fit">
                <Info className="size-3" /> INFO
            </Badge>
        );
    };

    return (
        <div className="w-full space-y-6 pb-12">
            {/* Header & Nút xuất log */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-black text-foreground flex items-center gap-2">
                        <Terminal className="size-6 text-primary" />
                        <span>Nhật ký hệ thống (System Logs)</span>
                    </h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Giám sát các sự kiện, lỗi ngoại lệ và lịch sử hoạt động bảo mật của hệ thống Shiptrack.
                    </p>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportLogs}
                    className="rounded-xl text-xs font-bold border-border/60 hover:bg-accent h-10 px-4"
                >
                    <Download className="size-4 mr-1.5 text-primary" /> Xuất file Log
                </Button>
            </div>

            {/* Thanh tìm kiếm & Bộ lọc cấp độ */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card p-4 rounded-[20px] border border-border/60 shadow-sm">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                        placeholder="Tìm nội dung log, module, user..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 text-xs rounded-xl border-border/60 h-10"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {[
                        { label: "Tất cả", value: "ALL" },
                        { label: "Info", value: "INFO" },
                        { label: "Warning", value: "WARNING" },
                        { label: "Error", value: "ERROR" },
                    ].map((tab) => (
                        <Button
                            key={tab.value}
                            variant={levelFilter === tab.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => setLevelFilter(tab.value)}
                            className="rounded-xl text-xs font-semibold h-9"
                        >
                            {tab.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Bảng danh sách Log (Highlight ERROR / WARNING) */}
            <Card className="rounded-[24px] border-border/60 shadow-sm bg-card overflow-hidden">
                <CardContent className="p-0">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border/40 bg-muted/30 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                                    <th className="p-4 pl-6">Thời gian</th>
                                    <th className="p-4">Cấp độ (Level)</th>
                                    <th className="p-4">Phân hệ (Category)</th>
                                    <th className="p-4">Nội dung thông báo</th>
                                    <th className="p-4 pr-6 text-right">Tác nhân (User)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/30 text-xs font-mono">
                                {logs.length > 0 ? (
                                    logs.map((log: SystemLogItem) => {
                                        const isError = log.level === "ERROR";
                                        const isWarning = log.level === "WARNING";
                                        return (
                                            <tr
                                                key={log.id}
                                                className={`transition-colors ${isError
                                                    ? "bg-rose-500/10 hover:bg-rose-500/15"
                                                    : isWarning
                                                        ? "bg-amber-500/5 hover:bg-amber-500/10"
                                                        : "hover:bg-muted/20"
                                                    }`}
                                            >
                                                <td className="p-4 pl-6 text-muted-foreground">{log.timestamp}</td>
                                                <td className="p-4">{renderLevelBadge(log.level)}</td>
                                                <td className="p-4 font-bold text-foreground">{log.category}</td>
                                                <td className={`p-4 ${isError ? "font-bold text-rose-700 dark:text-rose-300" : "text-foreground"}`}>
                                                    {log.message}
                                                </td>
                                                <td className="p-4 pr-6 text-right text-muted-foreground">{log.user || "System"}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center py-12 text-xs text-muted-foreground font-sans">
                                            Không tìm thấy bản ghi log nào phù hợp.
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