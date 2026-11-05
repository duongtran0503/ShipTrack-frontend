import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export interface OrderStatusStat {
    status: string;
    label: string;
    count: number;
    color: string;
}

export interface DailyOrderStat {
    date: string;
    completed: number;
    cancelled: number;
    delivering: number;
}

export interface DetailedOrderReportRow {
    id: number;
    date: string;
    totalOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    deliveringOrders: number;
    completionRate: number;
}

export function useOrderReports() {
    const [timeRange, setTimeRange] = useState<"DAY" | "WEEK" | "MONTH">("MONTH");

    const { data: reportData, isLoading } = useQuery({
        queryKey: ["admin_order_reports", timeRange],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return {
                totalOrders: 1540,
                completedCount: 1350,
                deliveringCount: 120,
                cancelledCount: 70,
                completionRate: 87.6,
                statusStats: [
                    { status: "COMPLETED", label: "Đã hoàn thành", count: 1350, color: "bg-emerald-500" },
                    { status: "DELIVERING", label: "Đang giao hàng", count: 120, color: "bg-amber-500" },
                    { status: "CANCELLED", label: "Đã hủy đơn", count: 70, color: "bg-rose-500" },
                ] as OrderStatusStat[],
                dailyChartData: [
                    { date: "Tuần 1", completed: 320, cancelled: 15, delivering: 25 },
                    { date: "Tuần 2", completed: 350, cancelled: 18, delivering: 30 },
                    { date: "Tuần 3", completed: 380, cancelled: 20, delivering: 35 },
                    { date: "Tuần 4", completed: 300, cancelled: 17, delivering: 30 },
                ] as DailyOrderStat[],
                detailedTable: [
                    { id: 1, date: "2026-11-04", totalOrders: 180, completedOrders: 160, cancelledOrders: 8, deliveringOrders: 12, completionRate: 88.8 },
                    { id: 2, date: "2026-11-03", totalOrders: 210, completedOrders: 190, cancelledOrders: 10, deliveringOrders: 10, completionRate: 90.4 },
                    { id: 3, date: "2026-11-02", totalOrders: 195, completedOrders: 170, cancelledOrders: 15, deliveringOrders: 10, completionRate: 87.1 },
                    { id: 4, date: "2026-11-01", totalOrders: 165, completedOrders: 145, cancelledOrders: 8, deliveringOrders: 12, completionRate: 87.8 },
                ] as DetailedOrderReportRow[],
            };
        },
    });

    const handleExportFile = (fileType: "Excel" | "PDF") => {
        toast.info(`Tính năng xuất file ${fileType} hiện chưa phát triển!`);
    };

    return {
        reportData,
        isLoading,
        timeRange,
        setTimeRange,
        handleExportFile,
    };
}