import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export interface DriverPerformanceItem {
    rank: number;
    driverId: number;
    driverName: string;
    phone: string;
    avatar?: string;
    totalTrips: number;
    completionRate: number; // %
    ratingAvg: number; // 5.0
    totalIncome: number; // VND
}

export function useDriverPerformanceReport() {
    const [timeRange, setTimeRange] = useState<"DAY" | "WEEK" | "MONTH">("MONTH");
    const [searchTerm, setSearchTerm] = useState("");

    const { data: drivers = [], isLoading } = useQuery({
        queryKey: ["admin_driver_performance", timeRange],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return [
                {
                    rank: 1,
                    driverId: 4,
                    driverName: "Vũ Minh Tuấn",
                    phone: "0987654321",
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
                    totalTrips: 218,
                    completionRate: 98.6,
                    ratingAvg: 4.92,
                    totalIncome: 32100000,
                },
                {
                    rank: 2,
                    driverId: 2,
                    driverName: "Phạm Hoàng Long",
                    phone: "0912345678",
                    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
                    totalTrips: 142,
                    completionRate: 97.2,
                    ratingAvg: 4.85,
                    totalIncome: 18450000,
                },
                {
                    rank: 3,
                    driverId: 10,
                    driverName: "Hoàng Văn Minh",
                    phone: "0933445566",
                    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
                    totalTrips: 115,
                    completionRate: 95.8,
                    ratingAvg: 4.75,
                    totalIncome: 15200000,
                },
                {
                    rank: 4,
                    driverId: 11,
                    driverName: "Nguyễn Thành Đạt",
                    phone: "0905112233",
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
                    totalTrips: 98,
                    completionRate: 92.4,
                    ratingAvg: 4.60,
                    totalIncome: 12400000,
                },
            ] as DriverPerformanceItem[];
        },
    });

    const filteredDrivers = drivers.filter(
        (d) =>
            d.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.phone.includes(searchTerm)
    );

    const handleExportFile = (fileType: "Excel" | "PDF") => {
        toast.info(`Tính năng xuất file ${fileType} hiện chưa phát triển!`);
    };

    return {
        drivers: filteredDrivers,
        isLoading,
        timeRange,
        setTimeRange,
        searchTerm,
        setSearchTerm,
        handleExportFile,
    };
}