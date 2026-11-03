import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, RotateCcw, Search } from "lucide-react";

interface Props {
    statusFilter: string;
    setStatusFilter: (val: string) => void;
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    sortBy: string;
    setSortBy: (val: string) => void;
    onReset: () => void;
}

export function HistoryFilterBar({
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    onReset,
}: Props) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-[24px] bg-card border border-border/60 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                {/* Lọc Trạng thái */}
                <div className="flex bg-muted/60 p-1 rounded-2xl">
                    {["ALL", "COMPLETED", "FAILED"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${statusFilter === status
                                ? status === "COMPLETED"
                                    ? "bg-card text-emerald-600 shadow-sm"
                                    : status === "FAILED"
                                        ? "bg-card text-destructive shadow-sm"
                                        : "bg-card text-foreground shadow-sm"
                                : "text-muted-foreground"
                                }`}
                        >
                            {status === "ALL" ? "Tất cả" : status === "COMPLETED" ? "Hoàn thành" : "Thất bại"}
                        </button>
                    ))}
                </div>

                {/* Ô tìm kiếm */}
                <div className="relative min-w-[240px] flex-1 sm:flex-none">
                    <Search className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
                    <Input
                        placeholder="Tìm kiếm mã đơn, địa chỉ..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-10 pl-10 rounded-xl text-xs bg-muted/40 border-border/60"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Sắp xếp */}
                <div className="flex items-center gap-2">
                    <ArrowUpDown className="size-4 text-muted-foreground" />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="h-10 px-3 rounded-xl text-xs bg-muted/40 border border-border/60 font-semibold text-foreground cursor-pointer focus:outline-none"
                    >
                        <option value="latest">Mới nhất</option>
                        <option value="oldest">Cũ nhất</option>
                        <option value="fee_desc">Phí cao nhất</option>
                    </select>
                </div>

                {/* Nút Reset */}
                {(statusFilter !== "ALL" || searchQuery !== "" || sortBy !== "latest") && (
                    <Button
                        variant="outline"
                        onClick={onReset}
                        className="h-10 px-4 rounded-xl text-xs font-bold gap-1.5 border-border/60"
                    >
                        <RotateCcw className="size-3.5" /> Reset
                    </Button>
                )}
            </div>
        </div>
    );
}