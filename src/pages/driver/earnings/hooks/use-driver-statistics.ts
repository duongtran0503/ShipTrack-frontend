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
    const [statPeriodTab, setStatPeriodTab] = useState<"WEEK" | "MONTH">("WEEK")

    const { data: stats, isLoading } = useQuery({
        queryKey: ["driver_personal_statistics", statPeriodTab],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300))
            return {
                totalTrips: 154,
                completionRate: "92.5",
                failureRate: "7.5",
                avgRating: "4.8",
                avgDeliveryMinutes: 28,
                totalDistanceKm: "1,245.8",
                ranking: {
                    position: 12,
                    totalDrivers: 450,
                    badgeName: "Tài xế Xuất sắc Vàng",
                },
                chartData: statPeriodTab === "WEEK"
                    ? [
                        { label: "T2", completed: 20, failed: 1 },
                        { label: "T3", completed: 24, failed: 2 },
                        { label: "T4", completed: 18, failed: 0 },
                        { label: "T5", completed: 25, failed: 1 },
                        { label: "T6", completed: 30, failed: 3 },
                        { label: "T7", completed: 35, failed: 2 },
                        { label: "CN", completed: 22, failed: 1 },
                    ]
                    : [
                        { label: "Tuần 1", completed: 110, failed: 8 },
                        { label: "Tuần 2", completed: 125, failed: 6 },
                        { label: "Tuần 3", completed: 98, failed: 12 },
                        { label: "Tuần 4", completed: 140, failed: 5 },
                    ],
            } as DriverStatisticsData
        },
    })

    return {
        stats,
        isLoading,
        statPeriodTab,
        setStatPeriodTab,
    }
}