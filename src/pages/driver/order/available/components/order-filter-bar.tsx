import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowUpDown, Check, Filter } from "lucide-react";
import type { SortOption } from "../hooks/use-available-orders";

interface Props {
    minDistance: string;
    setMinDistance: (val: string) => void;
    maxDistance: string;
    setMaxDistance: (val: string) => void;
    sortBy: SortOption;
    setSortBy: (val: SortOption) => void;
}

const sortOptions: { label: string; value: SortOption }[] = [
    { label: "Khoảng cách (Gần -> Xa)", value: "distance" },
    { label: "Thời gian giao hàng (Nhanh nhất)", value: "time_asc" },
    { label: "Thời gian giao hàng (Lâu nhất)", value: "time_desc" },
    { label: "Phí giao hàng cao nhất", value: "fee_desc" },
    { label: "Phí giao hàng thấp nhất", value: "fee_asc" },
];

export function OrderFilterBar({
    minDistance,
    setMinDistance,
    maxDistance,
    setMaxDistance,
    sortBy,
    setSortBy,
}: Props) {
    return (
        <div className="flex items-center gap-3 flex-wrap">
            {/* Lọc khoảng cách Từ - Đến */}
            <div className="flex items-center gap-2 bg-card border border-border/60 px-3 py-1.5 rounded-2xl shadow-sm">
                <Filter className="size-4 text-primary" />
                <span className="text-xs font-bold text-muted-foreground">Khoảng cách (km):</span>
                <div className="flex items-center gap-1.5">
                    <Input
                        type="number"
                        placeholder="Từ"
                        value={minDistance}
                        onChange={(e) => setMinDistance(e.target.value)}
                        className="h-8 w-16 text-xs rounded-xl text-center"
                    />
                    <span className="text-xs text-muted-foreground">-</span>
                    <Input
                        type="number"
                        placeholder="Đến"
                        value={maxDistance}
                        onChange={(e) => setMaxDistance(e.target.value)}
                        className="h-8 w-16 text-xs rounded-xl text-center"
                    />
                </div>
            </div>

            {/* Menu Sắp xếp */}
            <Popover>
                <PopoverTrigger >
                    <Button variant="outline" className="h-10 rounded-2xl text-xs font-bold gap-2 border-border/60">
                        <ArrowUpDown className="size-4 text-primary" />
                        <span>{sortBy ? "Đang sắp xếp" : "Sắp xếp tùy chọn"}</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-2 rounded-2xl shadow-xl border-border/60" align="end">
                    <div className="space-y-1">
                        <div className="px-3 py-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider border-b border-border/40">
                            Chọn kiểu sắp xếp
                        </div>
                        <button
                            onClick={() => setSortBy(null)}
                            className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl font-semibold transition-all ${sortBy === null ? "bg-primary/10 text-primary font-bold" : "hover:bg-muted text-foreground"
                                }`}
                        >
                            <span>Mặc định (Không chọn)</span>
                            {sortBy === null && <Check className="size-4" />}
                        </button>
                        {sortOptions.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => setSortBy(opt.value)}
                                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl font-semibold transition-all ${sortBy === opt.value ? "bg-primary/10 text-primary font-bold" : "hover:bg-muted text-foreground"
                                    }`}
                            >
                                <span>{opt.label}</span>
                                {sortBy === opt.value && <Check className="size-4" />}
                            </button>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}