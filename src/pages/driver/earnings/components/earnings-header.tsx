import { Button } from "@/components/ui/button";
import { FileSpreadsheet, FileText } from "lucide-react";

interface Props {
    onExport: (type: "EXCEL" | "PDF") => void;
}

export function EarningsHeader({ onExport }: Props) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
                <h1 className="text-2xl font-black text-foreground">Quản lý thu nhập</h1>
                <p className="text-xs text-muted-foreground">
                    Theo dõi chi tiết số tiền doanh thu, tiền thưởng và lịch sử thực nhận từ các chuyến hàng.
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    onClick={() => onExport("EXCEL")}
                    className="rounded-xl font-bold text-xs h-11 px-4 border-border/60 gap-2 cursor-pointer"
                >
                    <FileSpreadsheet className="size-4 text-emerald-600" /> Xuất Excel
                </Button>
                <Button
                    variant="outline"
                    onClick={() => onExport("PDF")}
                    className="rounded-xl font-bold text-xs h-11 px-4 border-border/60 gap-2 cursor-pointer"
                >
                    <FileText className="size-4 text-rose-600" /> Xuất PDF
                </Button>
            </div>
        </div>
    );
}