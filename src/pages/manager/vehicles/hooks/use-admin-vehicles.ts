import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export interface VehicleListItem {
    id: number;
    driverId: number;
    driverName: string;
    driverPhone: string;
    driverAvatar?: string;
    vehicleType: "MOTORBIKE" | "VAN" | "TRUCK" | "CONTAINER";
    licensePlate: string;
    brand?: string;
    color?: string;
    maxWeightKg?: number;
    isDefault: boolean; // Xe active chính của tài xế
    isVerified: boolean; // Trạng thái duyệt (true: đã duyệt, false: chờ duyệt)
    vehicleImageUrl?: string;
    createdAt: string;
}

const MOCK_VEHICLES_LIST: VehicleListItem[] = [
    {
        id: 1,
        driverId: 2,
        driverName: "Phạm Hoàng Long",
        driverPhone: "0912345678",
        driverAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
        vehicleType: "MOTORBIKE",
        licensePlate: "59-G1 123.45",
        brand: "Honda AirBlade",
        color: "Đen",
        maxWeightKg: 50,
        isDefault: true,
        isVerified: true,
        vehicleImageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=300&h=200&fit=crop",
        createdAt: "2026-10-05",
    },
    {
        id: 2,
        driverId: 2,
        driverName: "Phạm Hoàng Long",
        driverPhone: "0912345678",
        driverAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
        vehicleType: "VAN",
        licensePlate: "59-D2 999.11",
        brand: "Thaco Towner",
        color: "Trắng",
        maxWeightKg: 950,
        isDefault: false,
        isVerified: true,
        vehicleImageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=300&h=200&fit=crop",
        createdAt: "2026-10-10",
    },
    {
        id: 3,
        driverId: 4,
        driverName: "Vũ Minh Tuấn",
        driverPhone: "0987654321",
        driverAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
        vehicleType: "TRUCK",
        licensePlate: "59-C2 678.90",
        brand: "Isuzu QKR",
        color: "Xanh",
        maxWeightKg: 1900,
        isDefault: true,
        isVerified: true,
        vehicleImageUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=300&h=200&fit=crop",
        createdAt: "2026-10-15",
    },
    {
        id: 4,
        driverId: 8,
        driverName: "Đỗ Văn Nam",
        driverPhone: "0908887766",
        driverAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
        vehicleType: "MOTORBIKE",
        licensePlate: "29-A1 444.88",
        brand: "Honda Wave Alpha",
        color: "Đỏ",
        maxWeightKg: 40,
        isDefault: true,
        isVerified: false, // Đang chờ duyệt
        vehicleImageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=300&h=200&fit=crop",
        createdAt: "2026-11-03",
    },
];

export function useAdminVehicles() {
    const navigate = useNavigate();

    const { data: vehicles = MOCK_VEHICLES_LIST, isLoading } = useQuery({
        queryKey: ["admin_vehicles_list"],
        queryFn: async () => {
            await new Promise((r) => setTimeout(r, 300));
            return MOCK_VEHICLES_LIST;
        },
    });

    const goToVehicleDetail = (id: number) => navigate(`/manager/vehicles/${id}`);

    return {
        vehicles,
        isLoading,
        goToVehicleDetail,
    };
}