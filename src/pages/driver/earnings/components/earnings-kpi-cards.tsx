import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, DollarSign, TrendingUp, Wallet } from "lucide-react";
import type { useDriverEarnings } from "../hooks/use-driver-earnings";

interface Props {
    summary: NonNullable<ReturnType<typeof useDriverEarnings>["data"]>["summary"];
}

export function EarningsKpiCards({ summary }: Props) {
    const cardClass = "rounded-[24px] border-border/40 bg-transparent shadow-none p-5 space-y-2 flex flex-col justify-between";

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Hôm nay */}
            <Card className={cardClass}>
                <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Hôm nay</span>
                    <DollarSign className="size-4 text-emerald-600" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-emerald-600">
                        {summary.today.toLocaleString("vi-VN")} đ
                    </h2>
                    <p className="text-[10px] text-muted-foreground mt-1">Cập nhật thời gian thực</p>
                </div>
            </Card>

            {/* Tuần này */}
            <Card className={cardClass}>
                <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Tuần này</span>
                    <TrendingUp className="size-4 text-primary" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-foreground">
                        {summary.thisWeek.toLocaleString("vi-VN")} đ
                    </h2>
                    <p className="text-[10px] text-emerald-600 font-medium mt-1">↑ 8% so với tuần trước</p>
                </div>
            </Card>

            {/* Tháng này */}
            <Card className={cardClass}>
                <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Tháng này</span>
                    <Calendar className="size-4 text-blue-500" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-foreground">
                        {summary.thisMonth.toLocaleString("vi-VN")} đ
                    </h2>
                    <p className="text-[10px] text-emerald-600 font-medium mt-1">↑ 15% so với tháng trước</p>
                </div>
            </Card>

            {/* Số dư chờ rút */}
            <Card className={cardClass}>
                <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Số dư chờ rút</span>
                    <Wallet className="size-4 text-amber-500" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-amber-600">
                        {summary.pendingWithdrawal.toLocaleString("vi-VN")} đ
                    </h2>
                    <Button size="sm" className="mt-1.5 h-7 text-[10px] font-bold rounded-lg bg-amber-600 hover:bg-amber-700 text-white w-fit px-4">
                        Rút tiền ngay
                    </Button>
                </div>
            </Card>
        </div>
    );
}