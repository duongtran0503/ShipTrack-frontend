import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowRight, ShieldAlert, Truck } from "lucide-react";
import type { AdminDashboardKpi } from "../hooks/use-admin-dashboard";

interface Props {
    kpi: AdminDashboardKpi;
    goToOrders: () => void;
    goToDriverApprovals: () => void;
    goToVehicleApprovals: () => void;
}

export function SystemAlerts({ kpi, goToOrders, goToDriverApprovals, goToVehicleApprovals }: Props) {
    const hasAlerts = kpi.stuckOrdersCount > 0 || kpi.pendingDriversCount > 0 || kpi.pendingVehiclesCount > 0;
    if (!hasAlerts) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {kpi.stuckOrdersCount > 0 && (
                <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
                            <AlertTriangle className="size-5" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Đơn tồn đọng</p>
                            <p className="text-sm font-black">{kpi.stuckOrdersCount} đơn hàng chưa có tài xế nhận quá lâu</p>
                        </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={goToOrders} className="rounded-xl border-amber-500/40 text-amber-700 hover:bg-amber-500/20 text-xs font-bold shrink-0">
                        Xử lý <ArrowRight className="size-3.5 ml-1" />
                    </Button>
                </div>
            )}

            {kpi.pendingDriversCount > 0 && (
                <div className="flex items-center justify-between p-4 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive-foreground dark:text-red-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-destructive/20 text-destructive">
                            <ShieldAlert className="size-5" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-destructive">Duyệt tài xế</p>
                            <p className="text-sm font-black text-foreground">{kpi.pendingDriversCount} hồ sơ tài xế đang chờ xét duyệt</p>
                        </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={goToDriverApprovals} className="rounded-xl border-destructive/40 text-destructive hover:bg-destructive/20 text-xs font-bold shrink-0">
                        Duyệt ngay <ArrowRight className="size-3.5 ml-1" />
                    </Button>
                </div>
            )}

            {kpi.pendingVehiclesCount > 0 && (
                <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-900 dark:text-blue-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400">
                            <Truck className="size-5" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Duyệt phương tiện</p>
                            <p className="text-sm font-black">{kpi.pendingVehiclesCount} phương tiện mới đăng ký chờ duyệt</p>
                        </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={goToVehicleApprovals} className="rounded-xl border-blue-500/40 text-blue-700 hover:bg-blue-500/20 text-xs font-bold shrink-0">
                        Xem xe <ArrowRight className="size-3.5 ml-1" />
                    </Button>
                </div>
            )}
        </div>
    );
}