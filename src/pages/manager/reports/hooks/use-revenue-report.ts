import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export interface RevenueRecord {
    id: number;
    name: string; // Tên tài xế hoặc tên khu vực
    type: "DRIVER" | "AREA";
    totalOrders: number;
    totalRevenue: number;
    commissionFee: number; // Phí hoa hồng hệ thống thu
}

export function useRevenueReport() {
    const [timeRange, setTimeRange] = useState<"DAY" | "WEEK" | "MONTH">("MONTH");
    const [tabType, setTabType] = useState<"DRIVER" | "AREA">("DRIVER");

    const { data: revenueData, isLoading } = useQuery({
        queryKey: ["admin_revenue_report", timeRange],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return {
                totalRevenue: 148500000,
                totalOrders: 1420,
                growthRate: "+12.5% so với kỳ trước",
                chartData: [
                    { label: "Tuần 1", value: 32000000 },
                    { label: "Tuần 2", value: 38000000 },
                    { label: "Tuần 3", value: 41000000 },
                    { label: "Tuần 4", value: 37500000 },
                ],
                breakdown: [
                    { id: 1, name: "Phạm Hoàng Long", type: "DRIVER" as const, totalOrders: 142, totalRevenue: 18450000, commissionFee: 1845000 },
                    { id: 2, name: "Vũ Minh Tuấn", type: "DRIVER" as const, totalOrders: 218, totalRevenue: 32100000, commissionFee: 3210000 },
                    { id: 3, name: "Khu vực Quận 1", type: "AREA" as const, totalOrders: 540, totalRevenue: 68000000, commissionFee: 6800000 },
                    { id: 4, name: "Khu vực Thủ Đức", type: "AREA" as const, totalOrders: 420, totalRevenue: 49950000, commissionFee: 4995000 },
                ],
            };
        },
    });

    const handleExportFile = (fileType: "Excel" | "PDF") => {
        toast.info(`Tính năng xuất file ${fileType} hiện chưa phát triển!`);
    };

    const filteredBreakdown = revenueData?.breakdown.filter((item) => item.type === tabType) || [];

    return {
        revenueData,
        isLoading,
        timeRange,
        setTimeRange,
        tabType,
        setTabType,
        filteredBreakdown,
        handleExportFile,
    };
}