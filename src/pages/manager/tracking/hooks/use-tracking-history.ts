import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface HistoryCheckpoint {
    time: string;
    locationName: string;
    lat: number;
    lng: number;
    description: string;
}

export interface TripHistoryRecord {
    id: string;
    trackingCode: string;
    driverName: string;
    driverPhone: string;
    customerName: string;
    date: string;
    status: string;
    checkpoints: HistoryCheckpoint[];
}

const MOCK_HISTORY_RECORDS: TripHistoryRecord[] = [
    {
        id: "h1",
        trackingCode: "TRK-A83F20",
        driverName: "Phạm Hoàng Long",
        driverPhone: "0912345678",
        customerName: "Nguyễn Văn A",
        date: "2026-11-03",
        status: "COMPLETED",
        checkpoints: [
            { time: "08:30", locationName: "Kho tổng Q.5", lat: 10.762, lng: 106.682, description: "Tài xế tiếp nhận đơn hàng tại kho" },
            { time: "09:05", locationName: "Đường Trần Hưng Đạo, Q.1", lat: 10.771, lng: 106.691, description: "Đang di chuyển qua điểm kẹt xe" },
            { time: "09:40", locationName: "135 Nam Kỳ Khởi Nghĩa, Q.1", lat: 10.782, lng: 106.695, description: "Giao hàng thành công cho khách hàng" },
        ],
    },
    {
        id: "h2",
        trackingCode: "TRK-C77D88",
        driverName: "Vũ Minh Tuấn",
        driverPhone: "0987654321",
        customerName: "Trần Thị B",
        date: "2026-11-04",
        status: "COMPLETED",
        checkpoints: [
            { time: "13:10", locationName: "Điểm nhận hàng Thủ Đức", lat: 10.845, lng: 106.795, description: "Nhận kiện hàng tải trọng lớn" },
            { time: "14:00", locationName: "Xa lộ Hà Nội", lat: 10.810, lng: 106.740, description: "Di chuyển ổn định trên tuyến đường chính" },
            { time: "14:45", locationName: "Khu công nghệ cao Q.9", lat: 10.850, lng: 106.800, description: "Hoàn thành chuyến đi" },
        ],
    },
];

export function useTrackingHistory() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTrip, setSelectedTrip] = useState<TripHistoryRecord | null>(MOCK_HISTORY_RECORDS[0]);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [playbackIndex, setPlaybackIndex] = useState<number>(0);

    const { data: records = MOCK_HISTORY_RECORDS, isLoading } = useQuery({
        queryKey: ["admin_trip_history"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return MOCK_HISTORY_RECORDS;
        },
    });

    const filteredRecords = records.filter(
        (r) =>
            r.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectTrip = (trip: TripHistoryRecord) => {
        setSelectedTrip(trip);
        setIsPlaying(false);
        setPlaybackIndex(0);
    };

    const togglePlay = () => {
        setIsPlaying((prev) => !prev);
    };

    return {
        records: filteredRecords,
        isLoading,
        selectedTrip,
        handleSelectTrip,
        searchTerm,
        setSearchTerm,
        isPlaying,
        togglePlay,
        playbackIndex,
    };
}