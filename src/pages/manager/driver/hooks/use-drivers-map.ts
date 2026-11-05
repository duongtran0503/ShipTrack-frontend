import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export interface MapDriverLocation {
    Id: number;
    Name: string;
    Phone: string;
    AvatarUrl?: string;
    LicensePlate: string;
    VehicleType: string;
    Latitude: number;
    Longitude: number;
    CurrentLocationName: string;
    DeliveryStatus: "ONLINE" | "DELIVERING";
    ActiveOrderCode?: string | null;
}

const MOCK_MAP_DRIVERS: MapDriverLocation[] = [
    {
        Id: 2,
        Name: "Phạm Hoàng Long",
        Phone: "0912345678",
        AvatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
        LicensePlate: "59-G1 123.45",
        VehicleType: "MOTORBIKE",
        Latitude: 10.762622,
        Longitude: 106.682006,
        CurrentLocationName: "Đường Nguyễn Văn Cừ, Quận 5",
        DeliveryStatus: "DELIVERING",
        ActiveOrderCode: "TRK-B91C12",
    },
    {
        Id: 4,
        Name: "Vũ Minh Tuấn",
        Phone: "0987654321",
        AvatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
        LicensePlate: "59-C2 678.90",
        VehicleType: "TRUCK",
        Latitude: 10.776889,
        Longitude: 106.700806,
        CurrentLocationName: "Khu vực Quận 1",
        DeliveryStatus: "ONLINE",
        ActiveOrderCode: null,
    },
    {
        Id: 6,
        Name: "Nguyễn Văn Hùng",
        Phone: "0909123456",
        AvatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
        LicensePlate: "59-P1 888.22",
        VehicleType: "MOTORBIKE",
        Latitude: 10.823099,
        Longitude: 106.629664,
        CurrentLocationName: "Đường Hoàng Văn Thụ, Tân Bình",
        DeliveryStatus: "DELIVERING",
        ActiveOrderCode: "TRK-E99A12",
    },
];

export function useDriversMap() {
    const [searchParams] = useSearchParams();
    const targetedDriverId = searchParams.get("driverId");

    const [drivers, setDrivers] = useState<MapDriverLocation[]>(MOCK_MAP_DRIVERS);
    const [filterType, setFilterType] = useState<"ALL" | "ONLINE" | "DELIVERING">("ALL");
    const [selectedDriver, setSelectedDriver] = useState<MapDriverLocation | null>(
        targetedDriverId ? MOCK_MAP_DRIVERS.find((d) => d.Id === Number(targetedDriverId)) || null : null
    );

    const { isLoading } = useQuery({
        queryKey: ["admin_drivers_map_locations"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return MOCK_MAP_DRIVERS;
        },
    });

    // Giả lập cập nhật tọa độ GPS real-time qua SignalR
    useEffect(() => {
        const interval = setInterval(() => {
            setDrivers((prev) =>
                prev.map((d) => {
                    if (d.DeliveryStatus === "DELIVERING") {
                        return {
                            ...d,
                            Latitude: d.Latitude + (Math.random() - 0.5) * 0.0008,
                            Longitude: d.Longitude + (Math.random() - 0.5) * 0.0008,
                        };
                    }
                    return d;
                })
            );
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const filteredDrivers = drivers.filter((d) => {
        if (filterType === "ONLINE") return d.DeliveryStatus === "ONLINE";
        if (filterType === "DELIVERING") return d.DeliveryStatus === "DELIVERING";
        return true;
    });

    return {
        drivers: filteredDrivers,
        allCount: drivers.length,
        isLoading,
        filterType,
        setFilterType,
        selectedDriver,
        setSelectedDriver,
    };
}