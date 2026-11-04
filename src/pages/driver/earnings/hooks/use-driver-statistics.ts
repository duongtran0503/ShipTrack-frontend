import { apiClient } from "@/lib/config/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface DriverStatisticsData {
    totalTrips: number;
    completionRate: string;
    failureRate: string;
    avgRating: string;
    avgDeliveryMinutes: number;
    totalDistanceKm: string;
    ranking: {
        position: number;
        totalDrivers: number;
        badgeName: string;
    };
    chartData: Array<{ label: string; completed: number; failed: number }>;
}

export function useDriverStatistics() {
    const [statPeriodTab, setStatPeriodTab] = useState<"WEEK" | "MONTH">("WEEK");

    // Gọi API thực tế: GET /api/drivers/me/statistics
    const { data: stats, isLoading, refetch } = useQuery({
        queryKey: ["driver_personal_statistics", statPeriodTab],
        queryFn: async () => {
            const response = await apiClient.get("/drivers/me/statistics", {
                params: {
                    period: statPeriodTab,
                },
            });
            console.log("dslkfjaslkdfjsaldkf", response)
            const raw = response;

            return raw as unknown as DriverStatisticsData;
        },
        staleTime: 30000,
    });
    console.log("sfsadfsd", stats)
    return {
        stats,
        isLoading,
        statPeriodTab,
        setStatPeriodTab,
        refetchStats: refetch,
    };
}