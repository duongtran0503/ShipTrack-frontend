import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export interface OnlineDriverResponse {
    Id: number;
    Name: string;
    Phone: string;
    AvatarUrl?: string;
    LicensePlate: string;
    VehicleType: string;
    Latitude: number;
    Longitude: number;
    CurrentLocationName: string;
    DeliveryStatus: "ONLINE" | "DELIVERING"; // Ready hoặc đang giao
    ActiveOrder?: {
        id: string;
        trackingCode: string;
        pickupAddress: string;
        deliveryAddress: string;
    } | null;
    LastUpdated: string;
}

const MOCK_ONLINE_DRIVERS: OnlineDriverResponse[] = [
    {
        Id: 2,
        Name: "Phạm Hoàng Long",
        Phone: "0912345678",
        AvatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
        LicensePlate: "59-G1 123.45",
        VehicleType: "MOTORBIKE",
        Latitude: 10.762622,
        Longitude: 106.682006,
        CurrentLocationName: "Quận 5, TP.HCM",
        DeliveryStatus: "DELIVERING",
        ActiveOrder: {
            id: "102",
            trackingCode: "TRK-B91C12",
            pickupAddress: "135 Nam Kỳ Khởi Nghĩa, Q.1",
            deliveryAddress: "456 Lê Văn Việt, Thủ Đức",
        },
        LastUpdated: "Vừa xong",
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
        CurrentLocationName: "Quận 1, TP.HCM",
        DeliveryStatus: "ONLINE",
        ActiveOrder: null,
        LastUpdated: "1 phút trước",
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
        CurrentLocationName: "Tân Bình, TP.HCM",
        DeliveryStatus: "DELIVERING",
        ActiveOrder: {
            id: "105",
            trackingCode: "TRK-E99A12",
            pickupAddress: "12 Hoàng Văn Thụ, Tân Bình",
            deliveryAddress: "88 Nguyễn Trãi, Q.5",
        },
        LastUpdated: "Vừa xong",
    },
];

export function useOnlineDrivers() {
    const navigate = useNavigate();
    const [driversList, setDriversList] = useState<OnlineDriverResponse[]>(MOCK_ONLINE_DRIVERS);

    // Query danh sách tài xế online
    const { isLoading } = useQuery({
        queryKey: ["admin_online_drivers"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return MOCK_ONLINE_DRIVERS;
        },
    });

    // Giả lập nhận tín hiệu Real-time qua SignalR kết nối GPS tài xế di chuyển
    useEffect(() => {
        const interval = setInterval(() => {
            setDriversList((prev) =>
                prev.map((driver) => {
                    if (driver.DeliveryStatus === "DELIVERING") {
                        return {
                            ...driver,
                            Latitude: driver.Latitude + (Math.random() - 0.5) * 0.001,
                            Longitude: driver.Longitude + (Math.random() - 0.5) * 0.001,
                            LastUpdated: "Vừa xong",
                        };
                    }
                    return driver;
                })
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const goToMap = (driverId?: number) => {
        if (driverId) {
            navigate(`/manager/drivers/map?driverId=${driverId}`);
        } else {
            navigate("/manager/drivers/map");
        }
    };

    const goToDriverDetail = (id: number) => navigate(`/manager/drivers/${id}`);
    const goToOrderDetail = (orderId: string) => navigate(`/manager/orders/${orderId}`);

    return {
        drivers: driversList,
        isLoading,
        goToMap,
        goToDriverDetail,
        goToOrderDetail,
    };
}