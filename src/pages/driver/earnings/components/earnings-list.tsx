import type { EarningItem } from "../hooks/use-driver-earnings";
import { EarningItemCard } from "./earning-item-card";

interface Props {
    earningsList: EarningItem[];
    timeRange: "TODAY" | "THIS_WEEK" | "THIS_MONTH";
    setTimeRange: (val: "TODAY" | "THIS_WEEK" | "THIS_MONTH") => void;
}

export function EarningsList({ earningsList, timeRange, setTimeRange }: Props) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h2 className="text-base font-bold text-foreground">Chi tiết thu nhập các chuyến gần đây</h2>
                <div className="flex bg-muted/60 p-1 rounded-xl">
                    <button
                        onClick={() => setTimeRange("TODAY")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${timeRange === "TODAY" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Hôm nay
                    </button>
                    <button
                        onClick={() => setTimeRange("THIS_WEEK")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${timeRange === "THIS_WEEK" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Tuần này
                    </button>
                    <button
                        onClick={() => setTimeRange("THIS_MONTH")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${timeRange === "THIS_MONTH" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Tháng này
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                {earningsList.length > 0 ? (
                    earningsList.map((item) => <EarningItemCard key={item.id} item={item} />)
                ) : (
                    <div className="text-center py-10 text-xs text-muted-foreground bg-card rounded-2xl border border-border/50">
                        Không có dữ liệu thu nhập trong khoảng thời gian này.
                    </div>
                )}
            </div>
        </div>
    );
}