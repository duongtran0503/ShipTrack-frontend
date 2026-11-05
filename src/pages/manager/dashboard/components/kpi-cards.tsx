import { DollarSign, Package, TrendingUp, Users } from "lucide-react";
import type { AdminDashboardKpi } from "../hooks/use-admin-dashboard";

interface Props {
    kpi: AdminDashboardKpi;
    goToOrders: () => void;
    goToDriverApprovals: () => void;
    goToReports: () => void;
}

export function KpiCards({ kpi, goToOrders, goToDriverApprovals, goToReports }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <div onClick={goToOrders} className="p-6 rounded-[24px] bg-card border border-border/60 hover:border-primary/50 shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Đơn mới hôm nay</span>
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                        <Package className="size-5" />
                    </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-foreground">{kpi.newOrdersToday}</span>
                    <span className="text-xs text-muted-foreground font-medium">đơn hàng</span>
                </div>
            </div>

            <div onClick={goToDriverApprovals} className="p-6 rounded-[24px] bg-card border border-border/60 hover:border-emerald-500/50 shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Tài xế Online</span>
                    <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 group-hover:scale-110 transition-transform">
                        <Users className="size-5" />
                    </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-foreground">{kpi.onlineDrivers}</span>
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" /> Sẵn sàng
                    </span>
                </div>
            </div>

            <div onClick={goToOrders} className="p-6 rounded-[24px] bg-card border border-border/60 hover:border-blue-500/50 shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Đơn đang giao</span>
                    <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 group-hover:scale-110 transition-transform">
                        <TrendingUp className="size-5" />
                    </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-foreground">{kpi.activeDeliveries}</span>
                    <span className="text-xs text-muted-foreground font-medium">đang vận chuyển</span>
                </div>
            </div>

            <div onClick={goToReports} className="p-6 rounded-[24px] bg-card border border-border/60 hover:border-amber-500/50 shadow-sm transition-all cursor-pointer group">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Doanh thu hôm nay</span>
                    <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 group-hover:scale-110 transition-transform">
                        <DollarSign className="size-5" />
                    </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-shiptrack-price">
                        {kpi.todayRevenue.toLocaleString("vi-VN")} đ
                    </span>
                </div>
            </div>
        </div>
    );
}