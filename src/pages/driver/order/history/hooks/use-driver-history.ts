import { apiClient } from "@/lib/config/axios";
import type { OrderItem } from "@/services/order/type";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";

export interface HistoryOrderItem extends OrderItem {
    completedAt?: string;
    reviewRating?: number;
    reviewComment?: string;
    failureReason?: string;
}

export interface DriverHistoryKpi {
    totalFinished: number;
    completionRate: string;
    failureRate: string;
    avgRating: string;
    avgDeliveryMinutes: number;
    totalDistance: string;
}

export interface ChartItem {
    label: string;
    completed: number;
    failed: number;
}

export function useDriverHistory() {
    const navigate = useNavigate();

    const [statusFilter, setStatusFilter] = useState<string>("ALL");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("latest");
    const [chartPeriodTab, setChartPeriodTab] = useState<"WEEK" | "MONTH">("WEEK");
    const [page, setPage] = useState<number>(0);
    const size = 20;

    // 1. Query danh sách đơn hàng
    const { data: historyData, isLoading: isOrdersLoading } = useQuery({
        queryKey: ["driver_history_orders", statusFilter, searchQuery, sortBy, page],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (statusFilter !== "ALL") params.append("status", statusFilter);
            if (searchQuery.trim()) params.append("q", searchQuery.trim());
            params.append("sort", sortBy);
            params.append("page", page.toString());
            params.append("size", size.toString());

            const response = await apiClient.get(`/drivers/me/orders/history?${params.toString()}`);
            const raw = response as unknown as { items: HistoryOrderItem[], pagination: { totalElements: number, totalPages: number } }
            return raw || { items: [], pagination: { totalElements: 0, totalPages: 1 } };
        },
        staleTime: 0,                    // Dữ liệu lập tức cũ khi mất focus, buộc phải cập nhật khi quay lại
        refetchOnWindowFocus: true,      // Tự động fetch lại dữ liệu khi người dùng bấm vào lại tab trình duyệt
        refetchOnMount: true,            // Tự động fetch lại khi component được mount (vào lại màn hình)
    });

    // 2. Query KPI tổng quan
    const { data: kpiData, isLoading: isKpiLoading } = useQuery({
        queryKey: ["driver_history_kpi"],
        queryFn: async () => {
            const response = await apiClient.get("/drivers/me/orders/history/kpi");
            const raw = response as unknown as DriverHistoryKpi;
            return (raw || {
                totalFinished: 0,
                completionRate: "0",
                failureRate: "0",
                avgRating: "5.0",
                avgDeliveryMinutes: 0,
                totalDistance: "0",
            }) as DriverHistoryKpi;
        },
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });

    // 3. Query biểu đồ
    const { data: chartDataResponse, isLoading: isChartLoading } = useQuery({
        queryKey: ["driver_history_chart", chartPeriodTab],
        queryFn: async () => {
            const response = await apiClient.get(`/drivers/me/orders/history/chart?period=${chartPeriodTab}`);
            const raw = response as unknown as { period: string; chartData: ChartItem[] }
            return (raw || { period: chartPeriodTab, chartData: [] }) as { period: string; chartData: ChartItem[] };
        },
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });

    const orders: HistoryOrderItem[] = historyData?.items || [];
    const pagination = historyData?.pagination || { totalElements: 0, totalPages: 1 };

    const handleResetFilter = () => {
        setStatusFilter("ALL");
        setSearchQuery("");
        setSortBy("latest");
        setPage(0);
    };

    return {
        orders,
        totalOrdersCount: pagination.totalElements || 0,
        totalPages: pagination.totalPages || 1,
        currentPage: page,
        setPage,
        isLoading: isOrdersLoading || isKpiLoading,
        isChartLoading,
        statusFilter,
        setStatusFilter: (val: string) => {
            setStatusFilter(val);
            setPage(0);
        },
        searchQuery,
        setSearchQuery: (val: string) => {
            setSearchQuery(val);
            setPage(0);
        },
        sortBy,
        setSortBy: (val: string) => {
            setSortBy(val);
            setPage(0);
        },
        chartPeriodTab,
        setChartPeriodTab,
        handleResetFilter,
        kpi: {
            totalFinished: kpiData?.totalFinished || 0,
            completionRate: kpiData?.completionRate || "0",
            failureRate: kpiData?.failureRate || "0",
            avgRating: kpiData?.avgRating || "5.0",
            avgDeliveryMinutes: kpiData?.avgDeliveryMinutes || 0,
            totalDistance: kpiData?.totalDistance || "0",
        },
        chartData: chartDataResponse?.chartData || [],
        viewDetail: (id: string | number) => navigate(`/driver/history/${id}`),
    };
}