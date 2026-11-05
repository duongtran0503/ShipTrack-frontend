import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export interface RatingStarDistribution {
    stars: number;
    count: number;
    percentage: number;
}

export interface DriverRatingSummary {
    driverId: number;
    driverName: string;
    avatar?: string;
    phone: string;
    totalReviews: number;
    ratingAvg: number;
    fiveStarCount: number;
    negativeCount: number; // 1-2 sao
}

export interface NegativeReviewItem {
    id: number;
    customerName: string;
    driverName: string;
    orderCode: string;
    stars: number;
    comment: string;
    createdAt: string;
}

export function useReviewsReport() {
    const [timeRange, setTimeRange] = useState<"DAY" | "WEEK" | "MONTH">("MONTH");

    const { data: reportData, isLoading } = useQuery({
        queryKey: ["admin_reviews_report", timeRange],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return {
                averageRating: 4.75,
                totalReviews: 850,
                negativeRate: "3.2%",
                starDistribution: [
                    { stars: 5, count: 680, percentage: 80.0 },
                    { stars: 4, count: 110, percentage: 12.9 },
                    { stars: 3, count: 33, percentage: 3.9 },
                    { stars: 2, count: 17, percentage: 2.0 },
                    { stars: 1, count: 10, percentage: 1.2 },
                ] as RatingStarDistribution[],
                driverSummaries: [
                    {
                        driverId: 4,
                        driverName: "Vũ Minh Tuấn",
                        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
                        phone: "0987654321",
                        totalReviews: 210,
                        ratingAvg: 4.92,
                        fiveStarCount: 195,
                        negativeCount: 1,
                    },
                    {
                        driverId: 2,
                        driverName: "Phạm Hoàng Long",
                        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
                        phone: "0912345678",
                        totalReviews: 135,
                        ratingAvg: 4.85,
                        fiveStarCount: 120,
                        negativeCount: 2,
                    },
                    {
                        driverId: 5,
                        driverName: "Lê Hoàng C",
                        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
                        phone: "0988112233",
                        totalReviews: 19,
                        ratingAvg: 3.45,
                        fiveStarCount: 5,
                        negativeCount: 8,
                    },
                ] as DriverRatingSummary[],
                negativeReviews: [
                    {
                        id: 101,
                        customerName: "Nguyễn Văn A",
                        driverName: "Lê Hoàng C",
                        orderCode: "TRK-X99B12",
                        stars: 1,
                        comment: "Tài xế giao hàng chậm, thái độ cộc lốc với khách hàng.",
                        createdAt: "2026-11-03 16:30",
                    },
                    {
                        id: 102,
                        customerName: "Trần Thị B",
                        driverName: "Lê Hoàng C",
                        orderCode: "TRK-Y88C34",
                        stars: 2,
                        comment: "Hàng bị móp góc, gọi điện không bắt máy.",
                        createdAt: "2026-11-04 10:15",
                    },
                ] as NegativeReviewItem[],
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