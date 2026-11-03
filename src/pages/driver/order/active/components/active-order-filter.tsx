import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowUpDown, Check } from "lucide-react";
import type { ActiveSortOption } from "../hooks/use-active-orders";

interface Props {
    sortBy: ActiveSortOption;
    setSortBy: (val: ActiveSortOption) => void;
}

const sortOptions: { label: string; value: ActiveSortOption }[] = [
    { label: "Khoảng cách (Gần nhất trước)", value: "distance_asc" },
    { label: "Khoảng cách (Xa nhất trước)", value: "distance_desc" },
    { label: "Phí giao hàng (Cao đến thấp)", value: "fee_desc" },
    { label: "Phí giao hàng (Thấp đến cao)", value: "fee_asc" },
];

export function ActiveOrderFilter({ sortBy, setSortBy }: Props) {
    return (
        <Popover>
            <PopoverTrigger >
                <Button variant="outline" className="h-10 rounded-2xl text-xs font-bold gap-2 border-border/60">
                    <ArrowUpDown className="size-4 text-primary" />
                    <span>{sortBy ? "Đang sắp xếp" : "Sắp xếp đơn hàng"}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-2 rounded-2xl shadow-xl border-border/60" align="end">
                <div className="space-y-1">
                    <div className="px-3 py-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider border-b border-border/40">
                        Tùy chọn sắp xếp
                    </div>
                    <button
                        onClick={() => setSortBy(null)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl font-semibold transition-all ${sortBy === null ? "bg-primary/10 text-primary font-bold" : "hover:bg-muted text-foreground"
                            }`}
                    >
                        <span>Mặc định (Không sắp xếp)</span>
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
    );
}