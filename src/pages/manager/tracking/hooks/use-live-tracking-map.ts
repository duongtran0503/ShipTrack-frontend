import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export interface LiveDriverMarker {
    id: number;
    name: string;
    phone: string;
    avatar?: string;
    licensePlate: string;
    vehicleType: string;
    lat: number;
    lng: number;
    status: "ONLINE" | "DELIVERING";
    currentOrderCode?: string;
}

export interface LiveOrderMarker {
    id: string;
    trackingCode: string;
    pickupAddress: string;
    deliveryAddress: string;
    pickupLat: number;
    pickupLng: number;
    deliveryLat: number;
    deliveryLng: number;
    status: string;
    assignedDriverName?: string;
}

const MOCK_DRIVERS: LiveDriverMarker[] = [
    {
        id: 2,
        name: "Phạm Hoàng Long",
        phone: "0912345678",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
        licensePlate: "59-G1 123.45",
        vehicleType: "MOTORBIKE",
        lat: 10.7626,
        lng: 106.6820,
        status: "DELIVERING",
        currentOrderCode: "TRK-B91C12",
    },
    {
        id: 4,
        name: "Vũ Minh Tuấn",
        phone: "0987654321",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
        licensePlate: "59-C2 678.90",
        vehicleType: "TRUCK",
        lat: 10.7768,
        lng: 106.7008,
        status: "ONLINE",
    },
    {
        id: 6,
        name: "Nguyễn Văn Hùng",
        phone: "0909123456",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
        licensePlate: "59-P1 888.22",
        vehicleType: "MOTORBIKE",
        lat: 10.8230,
        lng: 106.6296,
        status: "DELIVERING",
        currentOrderCode: "TRK-E99A12",
    },
];

const MOCK_ORDERS: LiveOrderMarker[] = [
    {
        id: "102",
        trackingCode: "TRK-B91C12",
        pickupAddress: "135 Nam Kỳ Khởi Nghĩa, Q.1",
        deliveryAddress: "456 Lê Văn Việt, Thủ Đức",
        pickupLat: 10.7820,
        pickupLng: 106.6950,
        deliveryLat: 10.8450,
        deliveryLng: 106.7950,
        status: "DELIVERING",
        assignedDriverName: "Phạm Hoàng Long",
    },
    {
        id: "105",
        trackingCode: "TRK-E99A12",
        pickupAddress: "12 Hoàng Văn Thụ, Tân Bình",
        deliveryAddress: "88 Nguyễn Trãi, Q.5",
        pickupLat: 10.8010,
        pickupLng: 106.6520,
        deliveryLat: 10.7550,
        deliveryLng: 106.6800,
        status: "DELIVERING",
        assignedDriverName: "Nguyễn Văn Hùng",
    },
];

export function useLiveTrackingMap() {
    const [drivers, setDrivers] = useState<LiveDriverMarker[]>(MOCK_DRIVERS);
    const [orders] = useState<LiveOrderMarker[]>(MOCK_ORDERS);

    const [filterDriverStatus, setFilterDriverStatus] = useState<"ALL" | "ONLINE" | "DELIVERING">("ALL");
    const [showOrdersOnly, setShowOrdersOnly] = useState<boolean>(false);
    const [selectedEntity, setSelectedEntity] = useState<{ type: "DRIVER" | "ORDER"; data: any } | null>(null);

    const { isLoading } = useQuery({
        queryKey: ["live_tracking_data"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return { drivers: MOCK_DRIVERS, orders: MOCK_ORDERS };
        },
    });

    // Giả lập SignalR stream cập nhật vị trí tài xế liên tục trên bản đồ
    useEffect(() => {
        const interval = setInterval(() => {
            setDrivers((prev) =>
                prev.map((d) => {
                    if (d.status === "DELIVERING") {
                        return {
                            ...d,
                            lat: d.lat + (Math.random() - 0.5) * 0.001,
                            lng: d.lng + (Math.random() - 0.5) * 0.001,
                        };
                    }
                    return d;
                })
            );
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const filteredDrivers = drivers.filter((d) => {
        if (filterDriverStatus === "ONLINE") return d.status === "ONLINE";
        if (filterDriverStatus === "DELIVERING") return d.status === "DELIVERING";
        return true;
    });

    return {
        drivers: filteredDrivers,
        orders,
        isLoading,
        filterDriverStatus,
        setFilterDriverStatus,
        showOrdersOnly,
        setShowOrdersOnly,
        selectedEntity,
        setSelectedEntity,
    };
}