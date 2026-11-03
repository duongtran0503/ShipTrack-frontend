import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface EarningItem {
    id: string;
    trackingCode: string;
    completedAt: string;
    shippingFee: number;
    driverBonus: number;
    platformCommission: number;
    netIncome: number; // Thực nhận
    paymentMethod: "CASH" | "BANK_TRANSFER";
}

export function useDriverEarnings() {
    const [timeRange, setTimeRange] = useState<"TODAY" | "THIS_WEEK" | "THIS_MONTH">("THIS_MONTH")
    const [chartTab, setChartTab] = useState<"WEEK" | "MONTH">("WEEK")

    // Mock dữ liệu thu nhập
    const { data, isLoading } = useQuery({
        queryKey: ["driver_earnings_data", timeRange],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 350))
            return {
                summary: {
                    today: 320000,
                    thisWeek: 2450000,
                    thisMonth: 10850000,
                    pendingWithdrawal: 1250000,
                },
                earningsList: [
                    {
                        id: "earn_01",
                        trackingCode: "ST-7712",
                        completedAt: "20/10/2024 14:30",
                        shippingFee: 45000,
                        driverBonus: 10000,
                        platformCommission: 9000,
                        netIncome: 46000,
                        paymentMethod: "CASH",
                    },
                    {
                        id: "earn_02",
                        trackingCode: "ST-7720",
                        completedAt: "18/10/2024 09:10",
                        shippingFee: 65000,
                        driverBonus: 15000,
                        platformCommission: 13000,
                        netIncome: 67000,
                        paymentMethod: "BANK_TRANSFER",
                    },
                ] as EarningItem[],
            }
        },
    })

    const handleExportReport = (type: "EXCEL" | "PDF") => {
        alert(`Đang tiến hành xuất báo cáo thu nhập dạng ${type}... Vui lòng đợi trong giây lát.`)
    }

    return {
        data,
        isLoading,
        timeRange,
        setTimeRange,
        chartTab,
        setChartTab,
        handleExportReport,
    }
}