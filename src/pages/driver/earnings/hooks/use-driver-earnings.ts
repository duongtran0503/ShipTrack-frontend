import { apiClient } from "@/lib/config/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export interface EarningItem {
    id: string;
    trackingCode: string;
    completedAt: string;
    shippingFee: number;
    driverBonus: number;
    platformCommission: number;
    netIncome: number;
    paymentMethod: "CASH" | "BANK_TRANSFER";
}

export interface EarningsSummary {
    today: number;
    thisWeek: number;
    thisMonth: number;
    pendingWithdrawal: number;
}

export interface DriverEarningsData {
    summary: EarningsSummary;
    earningsList: EarningItem[];
    pagination: {
        page: number;
        size: number;
        totalElements: number;
        totalPages: number;
    };
}

export interface ChartItemDto {
    label: string;
    income: number;
}

export interface EarningsChartResponse {
    period: string;
    chartData: ChartItemDto[];
}

export function useDriverEarnings() {
    const [timeRange, setTimeRange] = useState<"TODAY" | "THIS_WEEK" | "THIS_MONTH">("THIS_MONTH");
    const [chartTab, setChartTab] = useState<"WEEK" | "MONTH">("WEEK");
    const [page, setPage] = useState<number>(0);
    const [size] = useState<number>(10);
    const [paymentMethod, setPaymentMethod] = useState<string | undefined>(undefined);

    // 1. Query danh sách thu nhập và tổng quan
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["driver_earnings_data", timeRange, page, size, paymentMethod],
        queryFn: async () => {
            const response = await apiClient.get("/drivers/me/earnings", {
                params: {
                    range: timeRange,
                    page,
                    size,
                    paymentMethod: paymentMethod || undefined,
                },
            });
            return (response?.data || response) as DriverEarningsData;
        },
        staleTime: 30000,
    });

    // 2. Query dữ liệu biểu đồ từ API thực tế /drivers/me/earnings/chart
    const { data: chartResponse, isLoading: isChartLoading } = useQuery({
        queryKey: ["driver_earnings_chart", chartTab],
        queryFn: async () => {
            const response = await apiClient.get("/drivers/me/earnings/chart", {
                params: { period: chartTab },
            });
            console.log(response, "sldjflaskdfjl")
            return response as unknown as EarningsChartResponse;
        },
        staleTime: 30000,
    });

    const handleExportReport = (type: "EXCEL" | "PDF") => {
        toast.info(`Tính năng xuất báo cáo ${type} đang được phát triển.`);
    };

    return {
        data,
        isLoading,
        chartData: chartResponse?.chartData || [],
        isChartLoading,
        timeRange,
        setTimeRange,
        chartTab,
        setChartTab,
        page,
        setPage,
        setPaymentMethod,
        refetchEarnings: refetch,
        handleExportReport,
    };
}